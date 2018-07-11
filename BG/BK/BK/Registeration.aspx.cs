using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using System.Collections.Generic;

namespace BK
{
    public partial class Registeration : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            LblErrMsg.Text = "";
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            LblErrMsg.Text = "";
            string email = txtEmail.Text;
            string firstName = txtFirstName.Text;
            string lastName = txtLastName.Text;
            string pass1 = txtPassword.Text;
            string pass2 = txtPassword2.Text;
            string genderVal = RadioButtonList1.SelectedValue;
            bool gender = true;
            string dob = txtDob.Text;
            if (genderVal.Equals("0"))
            {
                gender = false;
            }

            List<string> validationErrList = BK.RegistrationClass.ValidateRegisterForm(email, pass1, pass2, firstName, lastName, gender, dob);
            if (validationErrList.Count == 0)
            {
                bool regResult = false;
                try
                {
                    BK.RegistrationClass.RegisterNewUser(pass1, firstName, lastName, email, gender, DateTime.Parse(dob));
                    regResult = true;
                }
                catch
                {
                }

                if (regResult)
                {
                    try
                    {
                        
                        string subject = "Thanks for registering with bazikonim.com";
                        string body = "Your password is " + pass1;
                       
                        string popupScript = "<script language='javascript'>" + "window.location = 'default.aspx'" +"</script>";

                        Page.RegisterStartupScript("script", popupScript);
                       
                        BK.Emailer.SendMail("smtp.gmail.com", 465, "bazikonim@gmail.com", "p1ssw2rd", "Bazi konim", "bazikonim@gmail.com", firstName + " " + lastName, "rostami.majid@gmail.com", subject, body, true);
                    }
                    catch (Exception ex)
                    {
                        int dummy = 1;
                    }
                }

            }

            else
            {
                string errMsg = "";
                for (int i = 0; i < validationErrList.Count; i++)
                {
                   errMsg += "<br/>" + validationErrList.ElementAt(i);
                    
                }
                LblErrMsg.Text = errMsg;
            }
        }

    }
}
