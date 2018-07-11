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

namespace BK
{
    public class Emailer
    {

        private static object myLocObject = new object();
        
        public static void SendMail(string sHost, int nPort, string sUserName, string sPassword, string sFromName, string sFromEmail,
        string sToName, string sToEmail, string sHeader, string sMessage, bool fSSL)
        {

            lock (myLocObject)
            {
                if (sToName.Length == 0)
                    sToName = sToEmail;
                if (sFromName.Length == 0)
                    sFromName = sFromEmail;

                System.Web.Mail.MailMessage Mail = new System.Web.Mail.MailMessage();
                Mail.Fields["http://schemas.microsoft.com/cdo/configuration/smtpserver"] = sHost;
                Mail.Fields["http://schemas.microsoft.com/cdo/configuration/sendusing"] = 2;

                Mail.Fields["http://schemas.microsoft.com/cdo/configuration/smtpserverport"] = nPort.ToString();
                if (fSSL)
                    Mail.Fields["http://schemas.microsoft.com/cdo/configuration/smtpusessl"] = "true";

                if (sUserName.Length == 0)
                {
                    //Ingen auth 
                }
                else
                {
                    Mail.Fields["http://schemas.microsoft.com/cdo/configuration/smtpauthenticate"] = 1;
                    Mail.Fields["http://schemas.microsoft.com/cdo/configuration/sendusername"] = sUserName;
                    Mail.Fields["http://schemas.microsoft.com/cdo/configuration/sendpassword"] = sPassword;
                }
                if (fSSL)
                {
                    Mail.Fields["http://schemas.microsoft.com/cdo/configuration/smtpusessl"] = "true";

                }
                Mail.To = sToEmail;
                Mail.From = sFromEmail;
                Mail.Subject = sHeader;
                Mail.Body = sMessage;
                Mail.BodyFormat = System.Web.Mail.MailFormat.Html;

                System.Web.Mail.SmtpMail.SmtpServer = sHost;
                System.Web.Mail.SmtpMail.Send(Mail);
            }
        } 
 
    }
}
