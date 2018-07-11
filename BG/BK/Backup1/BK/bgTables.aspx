<%@ Page Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="bgTables.aspx.cs" Inherits="BK.bgTables" Title="Untitled Page" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <cc1:ToolkitScriptManager ID="ScriptManager1" runat="server">
    </cc1:ToolkitScriptManager>
    
    <script language="javascript" type="text/javascript">
    
//    periodicUpdate();
//    function periodicUpdate() {
//    
//        setInterval(gvUpdate, 10000);
//    }
//    
    function Button4_onclick(){
        
        //var prm = Sys.WebForms.PageRequestManager.getInstance();
        //prm._doPostBack('Button1','');
    //alert('hey')
    
    
    
    var prm = Sys.WebForms.PageRequestManager.getInstance();
prm._doPostBack('Button1', '');
        
    }
     
    </script>
    
    <script language="javascript" type="text/javascript">
    
    
    
    </script>
    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        
        
        <ContentTemplate>
        <asp:GridView ID="gvTableList" runat="server" AutoGenerateColumns="False" 
                CellPadding="4" ForeColor="#333333" GridLines="None" >
        
            <RowStyle BackColor="#E3EAEB" />
        
        <Columns>
            <asp:BoundField HeaderText="Table Number" DataField="tNumber" />
            <asp:BoundField HeaderText="First Player" DataField="fPlayer" />
            <asp:BoundField HeaderText="Second Player" DataField="sPlayer" />
                        
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
        <asp:Button ID="Button1" runat="server" Text="Button" />
        </ContentTemplate>
    </asp:UpdatePanel>
    <input id="Button4" style="width: 618px" type="button" value="Use Dave Ward's UpdatePanel Method" language="javascript" onclick="return Button4_onclick()" />
        <br />
</asp:Content>
