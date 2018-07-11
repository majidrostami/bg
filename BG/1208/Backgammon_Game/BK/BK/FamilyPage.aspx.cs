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

namespace BK
{
    public partial class FamilyPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string popupScript = "<script language='javascript'>" + "window.location = 'default.aspx'" + "</script>";
            if (Session["userInfo"] != null)
            {
                BK.User thisUser = ((BK.User)Session["userInfo"]);

                if (thisUser.IsFamily)
                {

                }

                else
                {
                    Page.RegisterStartupScript("script", popupScript);
                }

            }

            else
            {
                Page.RegisterStartupScript("script", popupScript);
            }



        }
    }
}
