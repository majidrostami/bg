using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Xml.Linq;

namespace BK
{
    public partial class PictureSelection : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            if (Session["userInfo"] != null)
            {
                BK.User thisUser = ((BK.User)Session["userInfo"]);
                if (thisUser.IsFamily)
                {
                    btnFamilyPics.Visible = true;
                }
                else
                {
                    btnFamilyPics.Visible = false;
                }
            }
            else
            {
                btnFamilyPics.Visible = false;
            }
        }

        protected void LinkButton1_Click(object sender, EventArgs e)
        {
            string popupScript = "<script language='javascript'>" + "window.location = 'FamilyPage.aspx'" + "</script>";
            Page.RegisterStartupScript("script", popupScript);
        }

        protected void btnInterestingPics_Click(object sender, EventArgs e)
        {
            string popupScript = "<script language='javascript'>" + "window.location = 'PicturePlayer.aspx'" + "</script>";
            Page.RegisterStartupScript("script", popupScript);
            setSelectedCategory("Interesting");
        }
        private void setSelectedCategory(String category)
        {
            if (Session["selectedPicCategory"] == null)
            {
                Session.Add("selectedPicCategory", category);
            }
            else
            {
                Session["selectedPicCategory"] = category;
            }
        }
        protected void btnOpticIllusionPics_Click(object sender, EventArgs e)
        {
            string popupScript = "<script language='javascript'>" + "window.location = 'PicturePlayer.aspx'" + "</script>";
            Page.RegisterStartupScript("script", popupScript);
            setSelectedCategory("Optic");
        }

        protected void LinkButton1_Click1(object sender, EventArgs e)
        {
            string popupScript = "<script language='javascript'>" + "window.location = 'PicturePlayer.aspx'" + "</script>";
            Page.RegisterStartupScript("script", popupScript);
            setSelectedCategory("2011Trip");
        }
    }
}
