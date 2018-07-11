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
    public class Login
    {
        public static List<string> validateLogin(string username, string password)
        {
            List<string> retVal =  new List<string>();
            Regex emailPattern = new Regex(@"\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*");
            Regex alphaNumericPattern = new Regex(@"^[A-Za-z0-9]+");

            if (username != null)
            {
                if (username.Length == 0)
                {
                    retVal.Add("Username can not be empty.");
                }

                else if (username.Length > 50)
                {
                    retVal.Add("Username should be less than 50 characters.");
                }

                else if(!emailPattern.IsMatch(username)){
                    retVal.Add("Username should be a valid email address.");
                }
            }
            else
            {
                retVal.Add("Username can not be empty.");
            }
            if (password != null)
            {
         
              if (password.Length == 0)
                {
                    retVal.Add("Password can not be empty.");
                }

                else if (password.Length > 50)
                {
                    retVal.Add("Password should be less than 50 characters.");
                }
              else if (password.Length < 6)
              {
                  retVal.Add("Password should be more than 6 characters.");
              }
              else if (!alphaNumericPattern.IsMatch(password))
              {
                  retVal.Add("Password must be alphanumeric.");
              }
            }
            else
            {
                retVal.Add("Password can not be empty.");
            }
            return retVal;
        }


        /// <summary>
        ///
        /// </summary>
        /// <returns></returns>
        public static bool LogOut()
        {
            try
            {
                // clearing the session
                System.Web.HttpContext.Current.Session.Remove("userInfo");

                try
                {
                    System.Web.HttpContext.Current.Session.Remove("sittingTable");
                }
                catch
                {
                }
                return true;
            }

            catch
            {
                return false;
            }
        }


        public static User login(string username, string password)
        {

            try
            {
                // Encode password before passing in to DB interface class
                //string encodedPassword = Encoder.sha256(password);
                User authUser;
                string seed = "";
                string encryptedPassword = "";
                // this is going to be null if user is not authorized
                authUser = DBInterface.Authorize(username, out encryptedPassword, out seed);
                if (authUser == null)
                {

                    return authUser;
                }
                // encryptin the password via hmac class
                string enteredEncryptedPassword = Encoder.hmac(password, seed);
                if (enteredEncryptedPassword.Equals(encryptedPassword))
                {
                    return authUser;
                }


                return null;
            }
            catch (Exception ex)
            {

                return null;
            }
        }


    }
}
