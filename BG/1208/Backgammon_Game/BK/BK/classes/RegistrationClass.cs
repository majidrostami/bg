using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace BK
{
    public class RegistrationClass
    {


        /// <summary> 
        /// Attempt to register a new user. All fields except diseaseInterest are required. 
        /// The e-Mail address will be used as the username and must be unique in the system 
        /// Password is subject to strength validation (e.g. disallow "aaaa") 
        /// throws an exception upon failure to register 
        /// </summary> 
        /// <param name="password">Desired password of the user</param> 
        /// <param name="firstName">First name of the user</param> 
        /// <param name="lastName">Last name of the user</param> 
        /// <param name="eMail">User's eMail address. Used as the username</param> 
        /// <param name="gender">User's Gender</param> 
        /// <param name="DOB">Date of Birth</param> 
        /// <param name="diseaseInterest">The disease the user believes they have. May be blank</param> 
        public static void RegisterNewUser(String password, String firstName, String lastName, String eMail, bool gender, DateTime DOB)
        {
            //String error = ValidatePassword(password); 
            //if (!error.Equals("")) 
            //throw new Exception(error); 
            string seed = System.DateTime.Now.ToString();
            string encryptedPassword = Encoder.hmac(password, seed);

            User userToBeRegisterd = new User(eMail, firstName, lastName, gender, DOB, System.DateTime.Now);

            bool success = DBInterface.RegisterUser(userToBeRegisterd,encryptedPassword,seed);

            if (success == false)
            {
                throw (new Exception());
            }

            
        }


        public static List<string> ValidateRegisterForm(string email, string password,
         string confirmPassword, string firstName, string lastName, bool gender,
         string dob)
        {
            List<string> retVal = null;
            Regex objAlphaNumericPattern = new Regex(@"^[A-Za-z0-9]+");
            Regex dateTimePattern = new Regex(@"^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$");

            // we are using the error types of login form 
            retVal = Login.validateLogin(email, password);

            if (objAlphaNumericPattern.IsMatch(email))
            {
                if (UserExist(email))
                {
                    retVal.Add("Email you entered is already registered");
                }
            }

            // check to see the passwords match 
            if (password != null && confirmPassword != null)
            {
                if (!(password.Equals(confirmPassword)))
                {
                    retVal.Add("Passwords do not match");
                }
            }
            else
            {
                retVal.Add("Password fields can not be empty");
            }

            if (firstName != null)
            {
                if (!(objAlphaNumericPattern.IsMatch(firstName)))
                {
                    retVal.Add("First Name should be alphanumeric");
                }

                if (firstName.Length > 50)
                {
                    retVal.Add("First Name should be less than 50 characters");

                }
            }
            else
            {
                retVal.Add("Fist Name can not be empty");
            }

            if (lastName != null)
            {
                if (!(objAlphaNumericPattern.IsMatch(lastName)))
                {
                    retVal.Add("Last Name should be alphanumeric");
                }
                if (lastName.Length > 50)
                {
                    retVal.Add("Last Name should be less than 50 characters");
                }


            }
            else
            {
                retVal.Add("Last Name can not be empty");
            }

            if (dob != null)
            {

                try
                {
                    DateTime convertedDate = DateTime.Parse(dob);
                }
                catch
                {
                    retVal.Add("Date time is not correctly formatted");
                }
            }

            else
            {
                retVal.Add("Date cannot be empty");
            }



            return retVal;
        } 


 



            /// <summary> 
        ///  this function checks if user already exists in the database 
        /// </summary> 
        /// <param name="username"> the login_id of the user that needs to be checked</param> 
        /// <returns>true if user is lready exists. Flase if not </returns> 
        public static bool UserExist(string username) 
        { 
            string dumbyVar1 = ""; 
            string dumbyVar2 = ""; 
            if (DBInterface.Authorize(username,out dumbyVar1,out dumbyVar2) != null) 
            { 
                return true; 
            } 
            return false; 
        } 
    }
}
