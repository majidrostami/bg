using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.Sql;
using System.Data.SqlClient;
using System.Data;


namespace BK
{
    public class DBInterface
    {

        public static bool IsUserFamily(string email)
        {
            string storedProcedure = "getFamilyMember";
            List<Param> myParam = new List<Param>();
            myParam.Add(new Param("@email", email, SqlDbType.VarChar, 100));
            try
            {
                //Take returned date and return the needed values
                DataSet returnData = accessDB(storedProcedure, myParam);

                if (returnData.Tables[0].Rows.Count != 0)
                {
                    return true;
                }
            }

            catch
            {

            }

            return false;
        }
        
        
        
        
        
        public static User Authorize(string eMail, out string Password, out string seed)
        {
            /// initalize storeprocedure and create new object to param List
            string storedProcedure = "getCredentilas";
            List<Param> myParam = new List<Param>();
            myParam.Add(new Param("@loginId", eMail, SqlDbType.VarChar, 100));
            try
            {
                //Take returned date and return the needed values
                DataSet returnData = accessDB(storedProcedure, myParam);
                if (returnData.Tables[0].Rows.Count != 0)
                {
                    User newUser = new User(eMail);
                    seed = returnData.Tables[0].Rows[0].ItemArray[1].ToString();
                    Password = returnData.Tables[0].Rows[0].ItemArray[0].ToString();
                    string priviledge = returnData.Tables[0].Rows[0].ItemArray[3].ToString();
                    if (priviledge.Equals("user"))
                    {

                        newUser.FirstName = returnData.Tables[0].Rows[0].ItemArray[4].ToString();
                        newUser.LastName = returnData.Tables[0].Rows[0].ItemArray[5].ToString();
                        try
                        {
                            newUser.Gender = bool.Parse(returnData.Tables[0].Rows[0].ItemArray[6].ToString());
                            if (returnData.Tables[0].Rows[0].ItemArray[7] != null)
                            {
                                newUser.DOB1 = DateTime.Parse(returnData.Tables[0].Rows[0].ItemArray[7].ToString());
                            }
                        }
                        catch
                        {

                        }
                        try
                        {
                            if (returnData.Tables[0].Rows[0].ItemArray[8] != null)
                            {
                                newUser.DOJ1 = DateTime.Parse(returnData.Tables[0].Rows[0].ItemArray[8].ToString());
                            }
                        }
                        catch
                        {

                        }


                       
                        newUser.Status = returnData.Tables[0].Rows[0].ItemArray[9].ToString();
                        newUser.Role = "user";

                        newUser.IsFamily = IsUserFamily(eMail);



                        return newUser;
                    }

                    else if (priviledge.Equals("admin"))
                    {
                        newUser.Role = "admin";
                        return newUser;
                    }

                    
                    // return null for unknown priviledge
                    return null;

                }
                else
                {
                    System.Diagnostics.Debug.WriteLine("Failed Login attempt");
                    seed = "";
                    Password = "";
                    //not authenticated return null
                    return null;
                }
            }
            catch
            {
                System.Diagnostics.Debug.WriteLine("Failed login attempt an exception occured");
                seed = "";
                Password = "";
                // data base error return null
                return null;
            }
        }

        public static DataSet accessDB(string storedProcedure, List<Param> myParam)
        {
            SqlConnection connection = null;
            try
            {
                /// creating connection, command and dataset
                connection = new SqlConnection("Data Source=MAJID-MAINPC\\SQLEXPRESS;Initial Catalog=bg;Integrated Security=True");
                connection.Open();
                SqlCommand myCommand = new SqlCommand(storedProcedure);
                DataSet returnData = new DataSet();
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Connection = connection;

                /// adding parameter depending on the number of parameter in the param list object.
                for (int i = 0; i < myParam.Count; i++)
                {
                    if (myParam.ElementAt(i).paramType == SqlDbType.Bit)
                    {
                        myCommand.Parameters.Add(new SqlParameter
                            (myParam.ElementAt(i).paramName, myParam.ElementAt(i).paramType)).Value
                            = bool.Parse(myParam.ElementAt(i).paramValue);
                    }
                    else if (myParam.ElementAt(i).paramType == SqlDbType.DateTime)
                    {
                        myCommand.Parameters.Add(new SqlParameter
                            (myParam.ElementAt(i).paramName, myParam.ElementAt(i).paramType)).Value
                            = DateTime.Parse(myParam.ElementAt(i).paramValue);
                    }
                    else if (myParam.ElementAt(i).paramType == SqlDbType.Int)
                    {
                        myCommand.Parameters.Add(new SqlParameter
                            (myParam.ElementAt(i).paramName, myParam.ElementAt(i).paramType)).Value
                            = int.Parse(myParam.ElementAt(i).paramValue);
                    }
                    else
                    {
                        myCommand.Parameters.Add(new SqlParameter
                        (myParam.ElementAt(i).paramName, myParam.ElementAt(i).paramType,
                        myParam.ElementAt(i).paramLength)).Value
                        = myParam.ElementAt(i).paramValue;
                    }
                }


                ///filling the Dataset
                SqlDataAdapter authAdapter = new SqlDataAdapter(myCommand);
                authAdapter.Fill(returnData);

                return returnData;

            }
            catch (Exception ex)
            {
                throw (ex);
            }
            finally
            {
                if (connection != null)
                {
                    connection.Close();
                    connection.Dispose();
                }

            }
        }


        /// <summary>
        /// It is used to register users
        /// </summary>
        /// <param name="user"></param>
        /// <param name="encryptedPassword"></param>
        /// <param name="seed"></param>
        /// <returns></returns>


        public static bool RegisterUser(User user, string encryptedPassword, string seed)
        {
            // List of all parameters we need for our stored procedure 
            List<Param> Params = new List<Param>();
            // asigning the parameters one by one 
            Params.Add(new Param("@login_id", user.EMail, SqlDbType.NVarChar, 100));
            Params.Add(new Param("@password", encryptedPassword, SqlDbType.NVarChar, 150));

            Params.Add(new Param("@sid", seed, SqlDbType.NVarChar, 150));
            Params.Add(new Param("@first_name", user.FirstName, SqlDbType.NVarChar, 100));
            Params.Add(new Param("@last_name", user.LastName, SqlDbType.NVarChar, 100));
            Params.Add(new Param("@gender", user.Gender.ToString(), SqlDbType.Bit, 1));
            Params.Add(new Param("@dob", user.DOB1.ToString(), SqlDbType.DateTime, 1));
            Params.Add(new Param("@doj", System.DateTime.Now.ToString(), SqlDbType.DateTime, 1));
            //Params.Add(new Param("@disease_name", user.DiseaseInterest, SqlDbType.NVarChar, 150));
            // Updating the databse 
            //false returned if unsuccful 
            bool sucess = updateDB("createUser", Params);
            return sucess;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="player1"></param>
        /// <param name="player2"></param>
        /// <param name="winner"></param>
        /// <param name="abondoned"></param>
        /// <param name="p1Doubles"></param>
        /// <param name="p2Doubles"></param>
        /// <param name="p1Pips"></param>
        /// <param name="p2Pips"></param>
        /// <param name="pipsAtEnd"></param>
        /// <param name="startTime"></param>
        /// <param name="endTime"></param>
        /// <param name="rolls"></param>
        /// <returns></returns>
        public static bool RecordGamePlay(string player1, string player2, int winner , bool abondoned , 
            int p1Doubles, int p2Doubles , int p1Pips , int p2Pips, int pipsAtEnd,DateTime startTime , 
            DateTime endTime , int rolls )
        {
            List<Param> Params = new List<Param>();
            // asigning the parameters one by one 
            Params.Add(new Param("@player1", player1, SqlDbType.NVarChar, 100));
            Params.Add(new Param("@player2", player2, SqlDbType.NVarChar, 100));
            Params.Add(new Param("@winner", winner + "", SqlDbType.SmallInt));
            Params.Add(new Param("@abondoned", abondoned + "", SqlDbType.Bit, 1));
            Params.Add(new Param("@p1Doubles", p1Doubles + "", SqlDbType.Int));
            Params.Add(new Param("@p2Doubles", p2Doubles + "", SqlDbType.Int));
            Params.Add(new Param("@p1Pips", p1Pips + "", SqlDbType.Int));
            Params.Add(new Param("@p2Pips", p2Pips + "", SqlDbType.Int));
            Params.Add(new Param("@pipsAtEnd", pipsAtEnd + "", SqlDbType.Int));
            Params.Add(new Param("@nRolls", rolls + "", SqlDbType.Int));

            Params.Add(new Param("@startTime", startTime.ToString(), SqlDbType.DateTime));
            Params.Add(new Param("@endTime", endTime.ToString(), SqlDbType.DateTime));

            bool success = updateDB("insertGameRecord", Params);
            return success;
        }


        /// <summary>
        /// Inserts elements into the database
        /// </summary>
        /// <param name="storedProcedure"></param>
        /// <param name="myParam"></param>
        /// <returns>Dataset</returns>
        /// /// created 10/09/2009 by Guddu Mony and Majid Rostami
        public static bool updateDB(string storedProcedure, List<Param> myParam)
        {
            SqlConnection connection = null;
            try
            {
                /// creating connection, command and dataset
                connection = new SqlConnection("Data Source=MAJID-MAINPC\\SQLEXPRESS;Initial Catalog=bg;Integrated Security=True");
                //connection = new SqlConnection(ConfigurationSettings.AppSettings.Get("connection_string"));
                SqlCommand myCommand = new SqlCommand(storedProcedure);
                //DataSet returnData = new DataSet();
                myCommand.CommandType = CommandType.StoredProcedure;
                myCommand.Connection = connection;

                /// adding parameter depending on the number of parameter in the param list object
                for (int i = 0; i < myParam.Count; i++)
                {
                    if (myParam.ElementAt(i).paramType == SqlDbType.Bit)
                    {
                        myCommand.Parameters.Add(new SqlParameter
                            (myParam.ElementAt(i).paramName, myParam.ElementAt(i).paramType)).Value
                            = bool.Parse(myParam.ElementAt(i).paramValue);
                    }
                    else if (myParam.ElementAt(i).paramType == SqlDbType.DateTime)
                    {
                        myCommand.Parameters.Add(new SqlParameter
                            (myParam.ElementAt(i).paramName, myParam.ElementAt(i).paramType)).Value
                            = DateTime.Parse(myParam.ElementAt(i).paramValue);
                    }
                    else if (myParam.ElementAt(i).paramType == SqlDbType.Int)
                    {
                        myCommand.Parameters.Add(new SqlParameter
                            (myParam.ElementAt(i).paramName, myParam.ElementAt(i).paramType)).Value
                            = int.Parse(myParam.ElementAt(i).paramValue);
                    }
                    else if (myParam.ElementAt(i).paramType == SqlDbType.NVarChar && myParam.ElementAt(i).paramValue == null)
                    {
                        myCommand.Parameters.Add(new SqlParameter
                        (myParam.ElementAt(i).paramName, myParam.ElementAt(i).paramType)).Value
                        = myParam.ElementAt(i).paramValue;
                    }
                    else
                    {
                        myCommand.Parameters.Add(new SqlParameter
                        (myParam.ElementAt(i).paramName, myParam.ElementAt(i).paramType,
                        myParam.ElementAt(i).paramLength)).Value
                        = myParam.ElementAt(i).paramValue;
                    }
                }

                connection.Open();
                myCommand.ExecuteNonQuery();

                ///filling the Dataset
                //SqlDataAdapter authAdapter = new SqlDataAdapter(myCommand);
                //authAdapter.Fill(returnData);

                return true;

            }

            catch (SqlException ex)
            {
                System.Diagnostics.Debug.WriteLine("II" + ex);
                return false;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine("I" + ex);
                return false;
                //throw (ex);

            }
            finally
            {
                if (connection != null)
                {
                    connection.Close();
                    connection.Dispose();
                }

            }
        }
    }
}
