<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Registeration.aspx.cs" Inherits="BK.Registeration" %>
<%@ Register assembly="AjaxControlToolkit" namespace="AjaxControlToolkit" tagprefix="cc1" %>


<%@ Register TagPrefix="CP" TagName="headerUc" Src="userControls/ucHeader.ascx" %>
<%@ Register TagPrefix="CP" TagName="footerUc" Src="userControls/ucFooter.ascx" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">

   
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <title>Ajax Ba</title>
    <meta name="keywords" content="" />
    <meta name="description" content="" />
    <link href="css/default.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form2" runat="server">
    
    <div id="wrapper">
        <!-- start header -->
        <CP:headerUc ID="HeaderUc1"  runat="server" />
        
        <!-- end header -->
        <div id="page" style="padding-left:auto;background-color:#E5E5E5" >
            <!-- start conten t -->
            <%--<div id="content">
                <!-- majid rostami  -->
                <br />--%>
                
                    <table style="width:100%;">
            <tr>
                <td>
                    <asp:Label ID="Label1" runat="server" Text="Email Address*" ForeColor="Black"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtEmail" runat="server" Width="216px"></asp:TextBox>
                </td>
                
            </tr>
            
            
            <tr>
                <td>
                    <asp:Label ID="Label2" runat="server" Text="Password*" ForeColor="Black"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtPassword" runat="server" TextMode="Password" Width="155px"></asp:TextBox>
                </td>
                
            </tr>
            
            
            
            <tr>
                <td>
                    <asp:Label ID="Label3" runat="server" Text="Confirm Password*" 
                        ForeColor="Black"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtPassword2" runat="server" TextMode="Password" Width="155px"></asp:TextBox>
                </td>
                
            </tr>
           
           <tr>
           <td><asp:Label ID="Label4" runat="server" Text="First Name*" ForeColor="Black"></asp:Label></td>
           <td><asp:TextBox ID="txtFirstName" runat="server" TextMode="SingleLine" 
                   Width="155px"></asp:TextBox></td>
           </tr>
           
           <tr>
           <td><asp:Label ID="Label5" runat="server" Text="Last Name*" ForeColor="Black"></asp:Label></td>
           <td><asp:TextBox ID="txtLastName" runat="server" TextMode="SingleLine" 
                   Width="155px"></asp:TextBox></td>
           </tr>
           <tr>
           <td style="color:Black">
           Gender
           </td>
           <td style="color:Black"><asp:RadioButtonList ID="RadioButtonList1" runat="server" RepeatDirection="Horizontal">
            <asp:ListItem Value="1" Selected="True">Male</asp:ListItem>
            <asp:ListItem Value="0">Female</asp:ListItem>
        </asp:RadioButtonList></td>
        
        <asp:ScriptManager ID="ScriptManager2" runat="server">
        </asp:ScriptManager>
        </td>   
            </tr>
            
            <tr>
           <td><asp:Label ID="Label6" runat="server" Text="Date of Birth" ForeColor="Black"></asp:Label></td>
           <td><asp:TextBox ID="txtDob" runat="server" TextMode="SingleLine" Width="155px"></asp:TextBox>
               <cc1:CalendarExtender ID="txtDob_CalendarExtender" runat="server" 
                   TargetControlID="txtDob" >
               </cc1:CalendarExtender>
               <asp:Label ID="Label7" runat="server" Text="(MM/DD/YYYY)" ForeColor="Black"></asp:Label>
                </td>
           </tr>
            <tr><td>
                </td>
                    
                  <td><asp:Button ID="Button1" runat="server" Text="Register" 
                    onclick="Button1_Click" Width="155px" />
                </td>  </tr>
                <asp:Label ID="LblErrMsg" runat="server" ForeColor="#CC3300"></asp:Label>
        </table>
             
                
            </div>
            <!-- start sidebar -->
            
            <!-- end sidebar -->
            <div style="clear: both;">
                &nbsp;</div>
       <%-- </div>--%>
        <!-- end page -->
    </div>
    <CP:footerUc  runat="server" />   
    </form>
</body>
</html>
