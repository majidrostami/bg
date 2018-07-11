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
    public partial class bgTables : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (ScriptManager1.IsInAsyncPostBack)
            {
                DataTable tableList = (DataTable)ViewState["tablesList"];
                for (int i = 0; i < tableList.Rows.Count; i++)
                {
                    
                   
                    tableList.Rows[i]["fPlayer"] = System.DateTime.Now.ToString();
                    tableList.Rows[i]["sPlayer"] = System.DateTime.Now.ToString();
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
                for (int i = 1; i <= 10; i++)
                {
                    tableList.Rows.Add();
                    tableList.Rows[tableList.Rows.Count - 1]["tNumber"] = i + "";
                    tableList.Rows[tableList.Rows.Count - 1]["fPlayer"] = "p1";
                    tableList.Rows[tableList.Rows.Count - 1]["sPlayer"] = "p2";    
                }

                ViewState["tablesList"] = tableList;
                gvTableList.DataSource = tableList;
                
                gvTableList.DataBind();

               }
        }

           
    
    }
}
