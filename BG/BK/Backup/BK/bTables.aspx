<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="bTables.aspx.cs" Inherits="BK.test" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc1" %>
<%@ Register TagPrefix="CP" TagName="headerUc" Src="userControls/ucHeader.ascx" %>
<%@ Register TagPrefix="CP" TagName="footerUc" Src="userControls/ucFooter.ascx" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">

    <script language="javascript" type="text/javascript">

periodicUpdate();
    function periodicUpdate() {
    
        setInterval(Button4_onclick, 3500);
    }




function Button3_onclick() {

var prm = Sys.WebForms.PageRequestManager.getInstance();
prm._doPostBack('Button1', '');

}






function Button4_onclick() {

var prm = Sys.WebForms.PageRequestManager.getInstance();
prm._doPostBack('UpdatePanel1', '');

}

function callWebService(p1){
    
    BK.bghandler.sitOnTable(p1,null);
    window.open("bg.html?tn=" + p1, "Backgammon", "height=640,width=900,toolbars=no,menubar=no,location=no");
  
}


// -->
    </script>

    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <title>Ajax Ba</title>
    <meta name="keywords" content="" />
    <meta name="description" content="" />
    <link href="css/default.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form2" runat="server">
    <%--<cc1:ToolkitScriptManager ID="ScriptManager1" runat="server">
      <Services>
         <asp:ServiceReference  Path="bghandler.asmx" />
      </Services>
    </cc1:ToolkitScriptManager>--%>
    <asp:ScriptManager ID="ScriptManager1" runat="server">
        <Services>
         <asp:ServiceReference  Path="bghandler.asmx" />
      </Services>
    </asp:ScriptManager>
    <div id="wrapper">
        <!-- start header -->
        <CP:headerUc ID="HeaderUc1"  runat="server" />
        
        <!-- end header -->
        <div id="page" style="padding-left:auto;background-color:#E5E5E5" >
            <!-- start conten t -->
            <%--<div id="content">
                <!-- majid rostami  -->
                <br />--%>
                    
                    <asp:UpdatePanel ID="UpdatePanel1" runat="server" OnLoad="UpdatePanel1_Load"  >
                        <ContentTemplate>
                            <br />
                            <br />
                            <asp:GridView ID="gvTableList" runat="server" AutoGenerateColumns="False" CellPadding="4"
                                ForeColor="#333333" GridLines="None" width = "100%"
                                >
                                <RowStyle BackColor="#E3EAEB" />
                                <Columns>
                                    <asp:BoundField HeaderText="Table Number" DataField="tNumber" />
                                    <asp:BoundField HeaderText="First Player" DataField="fPlayer" />
                                    <asp:BoundField HeaderText="Second Player" DataField="sPlayer" />
                                    <asp:TemplateField>
                                        <ItemTemplate>
                                            <asp:Label ID="lblArticleID" runat="server" Text='<% #bind("fPlayer") %>'></asp:Label>
                                        </ItemTemplate>
                                        
                                        <ItemTemplate>
                                            <asp:HyperLink ID="HyperLink1" NavigateUrl='<% #bind("nurl") %>' runat="server">
                                                <asp:label ID="TextBox1" Text='Sit' runat="server"></asp:label></asp:HyperLink>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <%--<asp:TemplateField HeaderText="Name" >
            <EditItemTemplate>
            <asp:TextBox ID="TextBox1" runat="server" Text='sdasdas'></asp:TextBox>        
            </EditItemTemplate>
            </asp:TemplateField>--%>
                                </Columns>
                                <FooterStyle BackColor="#1C5E55" Font-Bold="True" ForeColor="White" />
                                <PagerStyle BackColor="#666666" ForeColor="White" HorizontalAlign="Center" />
                                <EmptyDataTemplate>
                                    Table Number
                                </EmptyDataTemplate>
                                <SelectedRowStyle BackColor="#C5BBAF" Font-Bold="True" ForeColor="#333333" />
                                <HeaderStyle BackColor="#1C5E55" Font-Bold="True" ForeColor="White" />
                                <EditRowStyle BackColor="#7C6F57" />
                                <AlternatingRowStyle BackColor="White" />
                            </asp:GridView>
                            <asp:GridView ID="GridView1" runat="server" BackColor="White" BorderColor="White"
                                BorderStyle="Ridge" BorderWidth="2px" CellPadding="3" CellSpacing="1" GridLines="None"
                                AutoGenerateColumns="False">
                                <FooterStyle BackColor="#C6C3C6" ForeColor="Black" />
                                <RowStyle BackColor="#DEDFDE" ForeColor="Black" />
                                <PagerStyle BackColor="#C6C3C6" ForeColor="Black" HorizontalAlign="Right" />
                                <SelectedRowStyle BackColor="#9471DE" Font-Bold="True" ForeColor="White" />
                                <HeaderStyle BackColor="#4A3C8C" Font-Bold="True" ForeColor="#E7E7FF" />
                                <Columns>
                                    <asp:BoundField DataField="CategoryID" />
                                    <asp:BoundField DataField="Description" />
                                </Columns>
                            </asp:GridView>
                        </ContentTemplate>
                    </asp:UpdatePanel>
                </div>
                
            </div>
            <!-- start sidebar -->
            
            <!-- end sidebar -->
            <div style="clear: both;">
                &nbsp;</div>
       <%-- </div>--%>
        <!-- end page -->
   
       
    <CP:footerUc ID="FooterUc1"  runat="server" />  
    </form>
</body>
</html>
