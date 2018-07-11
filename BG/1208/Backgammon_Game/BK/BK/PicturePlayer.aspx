<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PicturePlayer.aspx.cs" Inherits="BK.PicturePlayer" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc1" %>

<%@ Register TagPrefix="CP" TagName="headerUc" Src="userControls/ucHeader.ascx" %>
<%@ Register TagPrefix="CP" TagName="footerUc" Src="userControls/ucFooter.ascx" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">

   
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <title>Ajax Backgammon</title>
    <meta name="keywords" content="" />
    <meta name="description" content="" />
    <link href="css/default.css" rel="stylesheet" type="text/css" />
</head>
<body style="text-align: center">
    <form id="form1" runat="server">
        
         <div id="wrapper">
        <!-- start header -->
        <CP:headerUc ID="HeaderUc1"  runat="server" />
        
        <!-- end header -->
        <div id="page" style="padding-left:auto;background-color:#E5E5E5" >
            <!-- start conten t -->
            <%--<div id="content">
                <!-- majid rostami  -->
                <br />--%>
                
        <h2 style="text-align: center">Site&#39;s Pictures</h2>
        
        <asp:ScriptManager ID="ScriptManager1" runat="server" />
        <div style="text-align: center">
        
        
       

            &nbsp; &nbsp;<br />
            <br />
            <div style="width:400;height:400">
            <asp:Image ID="Image1" runat="server" Height="300" Style="border: 1px solid black;width:auto" ImageUrl="/familyPics/scan0001.jpg" AlternateText="Blue Hills image" /><br />
            </div>
            <br />
            
            <asp:Label ID="lblImageDescription" runat="server" /><br />
            <br />
    
    
            <asp:Button ID="Btn_Previous" runat="server" Text="Previous" />
            <asp:Button ID="Btn_Next" runat="server" Text="Next" Width="64px" /><br />
            <br />
            <asp:Button ID="Btn_Play" runat="server" Text="Play" /><br />
            
    
            <cc1:SlideShowExtender ID="SlideShowExtender1"
              AutoPlay="true" ImageDescriptionLabelID="lblImageDescription"
               Loop="true" NextButtonID="Btn_Next" PlayButtonID="Btn_Play" 
                PlayButtonText="Play" PreviousButtonID="Btn_Previous" 
                SlideShowServicePath="photoService.asmx"
                 SlideShowServiceMethod="getPics" StopButtonText="Stop"
                  TargetControlID="Image1" runat="server">
            </cc1:SlideShowExtender>       
            </div>
</div>
</div>
<CP:footerUc ID="FooterUc1"  runat="server" />    
    </form>
</body>
</html>


