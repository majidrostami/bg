using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BK
{
    public partial class Site1 : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            if (Session["userInfo"] != null)
            {
                Panel1.Visible = false;
                Panel2.Visible = true;
                lblWelcome.Text = "Welcome " + ((BK.User)Session["userInfo"]).FirstName;

            }
            else
            {
                Panel1.Visible = true;
                Panel2.Visible = false;
            }
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            string username = emailBox.Text;
            string password = passwordBox.Text;
            Label1.Text = "";
            List<string> errors =  Login.validateLogin(username, password);
            if (errors.Count != 0)
            {
                for (int ii = 0; ii < errors.Count; ii++)
                {
                    Label1.Text = Label1.Text + errors.ElementAt(ii) + "<br/>";
                } 
            }

            else
            {
                User authUser = Login.login(username, password);
                if (authUser != null)
                {
                    Session.Add("userInfo", authUser);

                    string popupScript = "<script language='javascript'>" + "window.location = 'default.aspx'" + "</script>";

                    Page.RegisterStartupScript("script", popupScript);
                }

                else
                {
                    Label1.Text = "invalid username and password!";
                }

            }
                
        }

        protected void btnLogout_Click(object sender, EventArgs e)
        {
            try
            {
                bool logOutRes = BK.Login.LogOut();

                if (logOutRes)
                {
                    string popupScript = "<script language='javascript'>" + "window.location = 'default.aspx'" + "</script>";

                    Page.RegisterStartupScript("script", popupScript);
                }
            }
            catch (Exception exc)
            {

            }
        }
    }
}
