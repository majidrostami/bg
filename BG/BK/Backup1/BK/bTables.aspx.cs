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
    public partial class test : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            if (Session["userInfo"] == null){
                Response.Redirect("default.aspx");
            }
            if (ScriptManager1.IsInAsyncPostBack)
            {
                
                DataTable tableList = (DataTable)ViewState["tablesList"];
                List<Table> tableListInMemory = (List<Table>)Application["bgTables"];
                for (int i = 0; i < tableList.Rows.Count; i++)
                {
                    tableList.Rows[i]["fPlayer"] = (tableListInMemory[i].PlayerOne);
                    tableList.Rows[i]["sPlayer"] = (tableListInMemory[i].PlayerTwo);
                }
                ViewState["tablesList"] = tableList;
                gvTableList.DataSource = tableList;
                gvTableList.DataBind();

            }
            else
            {
                
                DataTable tableList = new DataTable();
                tableList.Columns.Add("tNumber");
                tableList.Columns.Add("fPlayer");
                tableList.Columns.Add("sPlayer");
                tableList.Columns.Add("nurl");
                for (int i = 1; i <= 10; i++)
                {
                    tableList.Rows.Add();
                    tableList.Rows[tableList.Rows.Count - 1]["tNumber"] = i + "";
                    tableList.Rows[tableList.Rows.Count - 1]["fPlayer"] = "p1";
                    tableList.Rows[tableList.Rows.Count - 1]["sPlayer"] = "p2";
                    tableList.Rows[tableList.Rows.Count - 1]["nurl"] = "javascript:callWebService(" + (i-1).ToString()  + ");";

                }

                ViewState["tablesList"] = tableList;
                gvTableList.DataSource = tableList;

                gvTableList.DataBind();
            }


          
        }

        protected void UpdatePanel1_Load(object sender, EventArgs e)
        {

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

        protected void gvTableList_SelectedIndexChanged(object sender, EventArgs e)
        {

        }

       
    }
}
