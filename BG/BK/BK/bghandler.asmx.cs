using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace BK
{

    /// <summary>
    /// Summary description for bghandler
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class bghandler : System.Web.Services.WebService
    {
        
        [WebMethod (EnableSession=true)]
        public string HelloWorld()
        {
            return "Hello World..#####" + DateTime.Now + ((BK.User)Session["userInfo"]).EMail;
        }


        [WebMethod(EnableSession = true)]
        public string getOtherPlayerPlay()
        {
            try
            {
                if (Session["sittingTable"] == null)
                {
                    return "";
                }

                if (Session["sittingTable"].ToString() == "")
                {
                    return "";
                }


                string userName = ((BK.User)Session["userInfo"]).EMail;
                string tnum = Session["sittingTable"].ToString();
                int tn = int.Parse(tnum);
                Table thisTable = ((List<Table>)(Application["bgTables"]))[tn];
                if (thisTable.PlayerOne == userName)
                {
                    if (thisTable.Turn == 2)
                    {
                        if ((System.DateTime.Now - thisTable.LastMoveTime).TotalMinutes > Table.MAXIMUM_LEGAL_WAIT_FOR_PLAY)
                        {
                            if ((System.DateTime.Now - thisTable.LastMoveTime).TotalMinutes > Table.MAXIMUM_WAIT_FOR_PLAY)
                            {
                                thisTable.evictPlayer(thisTable.PlayerTwo);                                
                                return Table.BOOT_RESPONSE;
                            }

                            else
                            {
                                return Table.BOOT_OPTION_RESPONSE;
                            }
                        }



                        if (thisTable.P2Rolled == true)
                        {
                            
                            return thisTable.Die1 + "_" + thisTable.Die2;
                        }
                        else
                        {
                            return "";
                        }
                    }

                    if (thisTable.Turn == 1)
                    {
                        if (thisTable.LastMove != "")
                        {
                            return "*_" + thisTable.LastMove;
                        }
                        else
                        {
                            return "";
                        }
                    }





                }
                else if (thisTable.PlayerTwo == userName)
                {

                    if (thisTable.Turn == 1)
                    {
                        if ((System.DateTime.Now - thisTable.LastMoveTime).TotalMinutes > Table.MAXIMUM_LEGAL_WAIT_FOR_PLAY)
                        {
                            if ((System.DateTime.Now - thisTable.LastMoveTime).TotalMinutes > Table.MAXIMUM_WAIT_FOR_PLAY)
                            {
                                thisTable.evictPlayer(thisTable.PlayerOne);
                                return Table.BOOT_RESPONSE;
                            }

                            else
                            {
                                return Table.BOOT_OPTION_RESPONSE;
                            }
                        }


                        if (thisTable.P1Rolled == true)
                        {
                            return thisTable.Die1 + "_" + thisTable.Die2;
                        }
                        else
                        {
                            return "";
                        }
                    }

                    if (thisTable.Turn == 2)
                    {
                        if (thisTable.LastMove != "")
                        {
                            return "*_" + thisTable.LastMove;
                        }
                        else
                        {
                            return "";
                        }
                    }



                }
                else
                {
                    Session["sittingTable"] = null;
                    return Table.EVICTED_RESPONSE;
                }
            }
            catch
            {
            }
            return "";



        }







        [WebMethod(EnableSession = true)]
        public string getPlayersInfo()
        {
            try
            {
                int tn = int.Parse(Session["sittingTable"].ToString());
                //int tn = ((BK.User)Session["userInfo"]).BGTableNumber;
                string pname = ((BK.User)Session["userInfo"]).EMail;
                Table thisTable = ((List<Table>)(Application["bgTables"]))[tn];
                string p1 = thisTable.PlayerOne;
                string p2 = thisTable.PlayerTwo;
                string pnum = "1";
                if (p1.Equals(pname))
                {
                    pnum = "1";
                }
                else                      
                {
                    if (p2.Equals(pname))
                    {
                        pnum = "2";
                    }
                    else
                    {
                        Session["sittingTable"] = null;
                        return "user_booted";
                    }
                }
                //return "p1=" + p1 + ";p2=" + p2 + ";?pn=" + pnum; 
               
                    return "p1=" + p1 + ";p2=" + p2 + ";?pn=" + pnum + ";p1s=" + thisTable.P1Started + ";p2s=" + thisTable.P2Started;
               
            }
            catch (Exception ex)
            {

            }
            return "";
        }

        /// <summary>
        /// 
        /// </summary>
        [WebMethod(EnableSession = true)]
        public string getOtherPlayerRoleInfo()
        {
            try
            {
                if (Session["sittingTable"] == null)
                {
                    return "";
                }

                if (Session["sittingTable"].ToString() == "")
                {
                    return "";
                }


                string userName = ((BK.User)Session["userInfo"]).EMail;
                string tnum = Session["sittingTable"].ToString();
                int tn = int.Parse(tnum);
                Table thisTable = ((List<Table>)(Application["bgTables"]))[tn];
                if (thisTable.PlayerOne == userName)
                {
                    if (thisTable.P2TurnRole == 0 || thisTable.P2TurnRole == -1)
                    {
                        if ((System.DateTime.Now - thisTable.GameStartTime).TotalMinutes > Table.MAXIMUM_WAIT_FOR_PLAY)
                        {
                            thisTable.evictPlayer(thisTable.PlayerTwo);
                            return Table.BOOT_RESPONSE;
                        }

                        else if ((System.DateTime.Now - thisTable.GameStartTime).TotalMinutes > Table.MAXIMUM_LEGAL_WAIT_FOR_PLAY)
                        {
                            if (thisTable.P1TurnRole != 0 && thisTable.P1TurnRole != -1)
                            {
                                return Table.BOOT_OPTION_RESPONSE;
                            }
                        }

                        
                        
                    }
                    //return "" + thisTable.P2TurnRole;
                    return "" + thisTable.P1TurnRole + ";" + thisTable.P2TurnRole;

                }
                else if (thisTable.PlayerTwo == userName)
                {
                    if (thisTable.P1TurnRole == 0 || thisTable.P1TurnRole == -1)
                    {
                        if ((System.DateTime.Now - thisTable.GameStartTime).TotalMinutes > Table.MAXIMUM_WAIT_FOR_PLAY)
                        {
                            thisTable.evictPlayer(thisTable.PlayerOne);
                            return Table.BOOT_RESPONSE;
                        }

                        else if ((System.DateTime.Now - thisTable.GameStartTime).TotalMinutes > Table.MAXIMUM_LEGAL_WAIT_FOR_PLAY)
                        {
                            if (thisTable.P2TurnRole != 0 && thisTable.P2TurnRole != -1)
                            {
                                return Table.BOOT_OPTION_RESPONSE;
                            }
                        }

                        

                    }

                    //return "" + thisTable.P1TurnRole;
                    return "" + thisTable.P2TurnRole + ";" + thisTable.P1TurnRole;
                }
                else
                {
                    Session["sittingTable"] = null;
                    return Table.EVICTED_RESPONSE;
                }
            }
            catch
            {
            }
            return "";
        }


        /// <summary>
        /// 
        /// </summary>
        [WebMethod(EnableSession = true)]
        public void gameStart()
        {
            try
            {
                if (Session["sittingTable"] == null )
                {
                    return;
                }

                if (Session["sittingTable"].ToString() == "")
                {
                    return;
                }


                string userName = ((BK.User)Session["userInfo"]).EMail;
                string tnum = Session["sittingTable"].ToString();
                int tn = int.Parse(tnum);
                Table thisTable = ((List<Table>)(Application["bgTables"]))[tn];
                if (thisTable.PlayerOne == userName)
                {
                    thisTable.P1Started = true;
                }
                else if (thisTable.PlayerTwo == userName)
                {
                    thisTable.P2Started = true;
                }
                else
                {
                    return;
                }

                if ((thisTable.P2Started == true) && (thisTable.P1Started == true))
                {

                    thisTable.GameStarted = true;
                    thisTable.GameStartTime = System.DateTime.Now;
                    thisTable.placeAllPieces();
                }
                
            }

            catch (Exception ex)
            {


            }

        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>

        [WebMethod(EnableSession = true)]
        public string getRolInfo()
        {
            return "";
        }






        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="tabeleNumber"></param>
        [WebMethod(EnableSession = true)]
        public string getDoubleDice()
        {
            string retVal = "";
            Table thisTable = null;
            string userName = "";
            try
            {
                if (Session["sittingTable"] == null)
                {
                    return "";
                }

                if (Session["sittingTable"].ToString() == "")
                {
                    return "";
                }

                Random random = new Random();
                userName = ((BK.User)Session["userInfo"]).EMail;
                string tnum = Session["sittingTable"].ToString();
                int tn = int.Parse(tnum);
                thisTable = ((List<Table>)(Application["bgTables"]))[tn];

                int playernumber = 0;
                if (thisTable.PlayerOne == userName)
                {
                    playernumber = 1;
                    if (thisTable.Turn != 1)
                    {
                        return "";
                    }

                    if (thisTable.P1Rolled)
                    {
                        return "";
                    }

                    
                    
                    int d1 = random.Next(1, 7);
                    int d2 = random.Next(1, 7);

                    thisTable.Die1 = d1;
                    thisTable.Die2 = d2;
                    thisTable.P1Rolled = true;
                    retVal = "" + d1 + ";" + d2;
                    thisTable.LastUpdateTime = System.DateTime.Now;

                    if (thisTable.PlayerOne == userName)
                    {
                        thisTable.P1LastUpdateTime = System.DateTime.Now;
                    }
                    else if (thisTable.PlayerTwo == userName)
                    {
                        thisTable.P2LastUpdateTime = System.DateTime.Now;
                    }

                    return retVal;
                }

                else if (thisTable.PlayerTwo == userName)
                {
                    if (thisTable.Turn != 2)
                    {
                        return "";
                    }

                    if (thisTable.P2Rolled)
                    {
                        return "";
                    }
                    playernumber = 2;
                    int d1 = random.Next(1, 7);
                    int d2 = random.Next(1, 7);

                    thisTable.Die1 = d1;
                    thisTable.Die2 = d2;
                    thisTable.P2Rolled = true;
                    retVal = "" + d1 + ";" + d2;
                    thisTable.LastUpdateTime = System.DateTime.Now;
                    if (thisTable.PlayerOne == userName)
                    {
                        thisTable.P1LastUpdateTime = System.DateTime.Now;
                    }
                    else if (thisTable.PlayerTwo == userName)
                    {
                        thisTable.P2LastUpdateTime = System.DateTime.Now;
                    }

                    return retVal;

                }

                if (playernumber == 0)
                {
                    return "";
                }



            }

            catch
            {

                return "";
            }
            if (retVal != "")
            {
                if (thisTable != null)
                {
                    thisTable.LastUpdateTime = System.DateTime.Now;

                    if (thisTable.PlayerOne == userName)
                    {
                        thisTable.P1LastUpdateTime = System.DateTime.Now;
                    }
                    else if (thisTable.PlayerTwo == userName)
                    {
                        thisTable.P2LastUpdateTime = System.DateTime.Now;
                    }
                }
            }
            return retVal;
        }






        /// <summary>
        /// 
        /// </summary>
        /// <param name="tabeleNumber"></param>
        [WebMethod(EnableSession = true)]
        public string getSingleDie()
        {

            string retVal = "";
            Table thisTable = null;
            string userName = "";
            try
            {
                if (Session["sittingTable"] == null)
                {
                    return "";
                }

                if (Session["sittingTable"].ToString() == "")
                {
                    return "";
                }
               

                userName = ((BK.User)Session["userInfo"]).EMail;
                string tnum = Session["sittingTable"].ToString();
                int tn = int.Parse(tnum);
                thisTable = ((List<Table>)(Application["bgTables"]))[tn];

                if (thisTable.Turn != 0)
                {
                    return "";
                }

                Random random = new Random();
                
                
                int d1 = random.Next(1, 7);
                retVal = "" + d1;
                
                





                if (thisTable.PlayerOne == userName)
                {
                    if (thisTable.P1TurnRole != 0 && thisTable.P1TurnRole != -1)
                    {
                        return "";
                    }


                    
                    retVal = "" + d1 + ";" + thisTable.P2TurnRole;
                    while (d1 == thisTable.P2TurnRole)
                    {
                        d1 = random.Next(1, 7);
                        retVal = "" + d1 + ";" + thisTable.P2TurnRole;
                    }
                    thisTable.P1TurnRole = d1;
                }
                else if (thisTable.PlayerTwo == userName)
                {
                    if (thisTable.P2TurnRole != 0 && thisTable.P2TurnRole != -1)
                    {
                        return "";
                    }

                    retVal = "" + d1 + ";" + thisTable.P1TurnRole;
                    while (d1 == thisTable.P1TurnRole)
                    {
                        d1 = random.Next(1, 7);
                        retVal = "" + d1 + ";" + thisTable.P1TurnRole;
                    }

                    thisTable.P2TurnRole = d1;
                }
                else
                {
                    return "";
                }

                if (thisTable.P1TurnRole > 0 && thisTable.P2TurnRole > 0)
                {
                    if (thisTable.P1TurnRole < 7 && thisTable.P2TurnRole < 7)
                    {
                        //lock (Application)
                        {
                            if (thisTable.P1TurnRole < thisTable.P2TurnRole)
                            {
                                thisTable.Turn = 2;
                                thisTable.P1Rolled = false;
                                thisTable.P2Rolled = false;
                                thisTable.LastMoveTime = System.DateTime.Now;

                            }
                            else if (thisTable.P1TurnRole > thisTable.P2TurnRole)
                            {
                                thisTable.Turn = 1;
                                thisTable.P1Rolled = false;
                                thisTable.P2Rolled = false;
                                thisTable.LastMoveTime = System.DateTime.Now;
                            }
                            else
                            {
                                thisTable.Turn = 0;
                                thisTable.P1TurnRole = -1;
                                thisTable.P2TurnRole = -1;
                            }
                        }

                    }
                }


            }
            catch
            {


            }

            finally
            {


            }

            if (retVal != "")
            {
                if (thisTable != null)
                {
                    thisTable.LastUpdateTime = System.DateTime.Now;

                    if (thisTable.PlayerOne == userName)
                    {
                        thisTable.P1LastUpdateTime = System.DateTime.Now;
                    }
                    else if (thisTable.PlayerTwo == userName)
                    {
                        thisTable.P2LastUpdateTime = System.DateTime.Now;
                    }



                }
            }

            return retVal;


        }







        /// <summary>
        /// 
        /// </summary>
        /// <param name="tabeleNumber"></param>
        [WebMethod(EnableSession = true)]
        public string getDice()
        {
            return "";
        }



/// <summary>
        /// 
        /// </summary>
        /// <param name="tabeleNumber"></param>

        [WebMethod(EnableSession = true)]
        public void leaveTable()
        {
            try
            {
                if (Session["sittingTable"] == null)
                {
                    return;
                }

                if (Session["sittingTable"].ToString() == "")
                {
                    return;
                }


                string userName = ((BK.User)Session["userInfo"]).EMail;
                string tnum = Session["sittingTable"].ToString();
                int tn = int.Parse(tnum);
                Table thisTable = ((List<Table>)(Application["bgTables"]))[tn];
                if (thisTable.PlayerOne == userName)
                {

                    if (thisTable.GameStarted)
                    {
                        thisTable.initializeTable();
                        thisTable.PlayerOne = thisTable.PlayerTwo;
                        thisTable.PlayerTwo = "None";
                        Session["sittingTable"] = null;
                        // Todo
                        // here we must also handle the point deductions 
                    }
                    else
                    {
                        thisTable.initializeTable();
                        thisTable.PlayerOne = thisTable.PlayerTwo;
                        thisTable.PlayerTwo = "None";
                        Session["sittingTable"] = null;

                    }
                }
                else if (thisTable.PlayerTwo == userName)
                {
                    if (thisTable.GameStarted)
                    {
                        thisTable.initializeTable();
                        thisTable.PlayerTwo = "None";
                        //Todo:
                        //here we must handle the point deduction

                        Session["sittingTable"] = null;
                    }
                    else
                    {
                        thisTable.initializeTable();
                        thisTable.PlayerTwo = "None";
                        Session["sittingTable"] = null;
                    }


                }

                else
                {
                    return;
                }


            }


            catch (Exception ex)
            {

            }


        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="tabeleNumber"></param>
        
        [WebMethod(EnableSession = true)]
        public void sitOnTable(int tabeleNumber)
        {
            try
            {
                lock (Application)
                {
                    if (Session["sittingTable"] != null)
                    {
                        return;
                    }

                    
                    string userName = ((BK.User)Session["userInfo"]).EMail;
                    Table thisTable = ((List<Table>)(Application["bgTables"]))[tabeleNumber];

                    if (thisTable.PlayerOne.Equals(userName) || thisTable.PlayerTwo.Equals(userName))
                    {
                        return;
                    }
                    else
                    {
                        if ((thisTable.PlayerOne.Equals("None")))
                        {
                            thisTable.PlayerOne = userName;
                            thisTable.P1Started = false;
                            thisTable.P2Started = false;
                            thisTable.P1TurnRole = -1;
                            thisTable.P2TurnRole = -1;
                            
                            ((List<Table>)(Application["bgTables"]))[tabeleNumber] = thisTable;

                        }
                        else if ((thisTable.PlayerTwo.Equals("None")))
                        {
                            thisTable.PlayerTwo = userName;
                            thisTable.P2Started = false;
                            thisTable.P1Started = false;
                            thisTable.P1TurnRole = -1;
                            thisTable.P2TurnRole = -1;
                            
                            ((List<Table>)(Application["bgTables"]))[tabeleNumber] = thisTable;

                        }


                        Session["sittingTable"] = tabeleNumber.ToString();

                    }
                }
            }

            catch
            {

            }
        }

        [WebMethod(EnableSession = true)]
        public void forceLeave()
        {
            try
            {
                if (Session["sittingTable"] == null)
                {
                    return;
                }

                if (Session["sittingTable"].ToString() == "")
                {
                    return;
                }


                string userName = ((BK.User)Session["userInfo"]).EMail;
                string tnum = Session["sittingTable"].ToString();
                int tn = int.Parse(tnum);
                Table thisTable = ((List<Table>)(Application["bgTables"]))[tn];
                if (thisTable.PlayerOne == userName)
                {
                    if (thisTable.GameStarted == false)
                    {
                        thisTable.evictPlayer(thisTable.PlayerTwo);
                    }
                    else
                    {
                        if (thisTable.Turn == 0)
                        {
                            if ((thisTable.P2TurnRole == 0) || (thisTable.P2TurnRole == -1))
                            {
                                if ((System.DateTime.Now - thisTable.GameStartTime).TotalMinutes > Table.MAXIMUM_LEGAL_WAIT_FOR_PLAY)
                                {
                                    thisTable.evictPlayer(thisTable.PlayerTwo);
                                }
                            }
                        }
                        else if (thisTable.Turn == 2)
                        {
                            if ((System.DateTime.Now - thisTable.LastMoveTime).TotalMinutes > Table.MAXIMUM_LEGAL_WAIT_FOR_PLAY)
                            {
                                thisTable.evictPlayer(thisTable.PlayerTwo);
                            }
                        }
                        else if (thisTable.Turn == 1)
                        {
                            return;
                        }

                    }


                }
                else if (thisTable.PlayerTwo == userName)
                {
                    if (thisTable.GameStarted == false)
                    {
                        return;
                    }
                    else
                    {
                        if (thisTable.Turn == 0)
                        {
                            if ((thisTable.P1TurnRole == 0) || (thisTable.P1TurnRole == -1))
                            {
                                if ((System.DateTime.Now - thisTable.GameStartTime).TotalMinutes > Table.MAXIMUM_LEGAL_WAIT_FOR_PLAY)
                                {
                                    thisTable.evictPlayer(thisTable.PlayerOne);
                                }
                            }

                        }
                        else if (thisTable.Turn == 1)
                        {
                            if ((System.DateTime.Now - thisTable.LastMoveTime).TotalMinutes > Table.MAXIMUM_LEGAL_WAIT_FOR_PLAY)
                            {
                                thisTable.evictPlayer(thisTable.PlayerOne);
                            }
                        }
                        else if (thisTable.Turn == 2)
                        {
                            return;
                        }
                    }
                }
                else
                {
                    return;
                }
            }
            catch
            {
            }
        }

    }
}
