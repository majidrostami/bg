<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FamilyPage.aspx.cs" Inherits="BK.FamilyPage" %>
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
                
        <h2 style="text-align: center">Majid&#39;s Pictures</h2>
        
        <asp:ScriptManager ID="ScriptManager1" runat="server" />
        <div style="text-align: center">
        
        
        <script runat="Server" type="text/C#">
        [System.Web.Services.WebMethod]
        [System.Web.Script.Services.ScriptMethod]
        public static AjaxControlToolkit.Slide[] GetSlides()
        {
            AjaxControlToolkit.Slide[] slides = new AjaxControlToolkit.Slide[13];

            slides[0] = new AjaxControlToolkit.Slide("familyPics/scan0001.jpg", "", "Majid 1");
            slides[1] = new AjaxControlToolkit.Slide("familyPics/scan0002.jpg", "Sunset", "Majid 2");
            slides[2] = new AjaxControlToolkit.Slide("familyPics/scan0003.jpg", "Winter", "Majid 3...");
            slides[3] = new AjaxControlToolkit.Slide("familyPics/scan0004", "lilies.jpg", "Majid 4");
            slides[4] = new AjaxControlToolkit.Slide("familyPics/scan0005.jpg", "Sedona", "Majid 5 ");
            slides[5] = new AjaxControlToolkit.Slide("familyPics/scan0006.jpg", "Sedona", "Majid 6");
            slides[6] = new AjaxControlToolkit.Slide("familyPics/scan0007.jpg", "Sedona", "Majid 7");
            slides[7] = new AjaxControlToolkit.Slide("familyPics/scan0008.jpg", "Sedona", "Majid 8");
            slides[8] = new AjaxControlToolkit.Slide("familyPics/scan0009.jpg", "Sedona", "Majid 9");
            slides[10] = new AjaxControlToolkit.Slide("familyPics/scan0010.jpg", "Sedona", "Majid 10");
            slides[11] = new AjaxControlToolkit.Slide("familyPics/scan0011.jpg", "Sedona", "Majid 11");
            slides[12] = new AjaxControlToolkit.Slide("familyPics/scan0012.jpg", "Sedona", "Majid 12");
            
            return (slides);
        }
    </script>

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
                 SlideShowServiceMethod="GetSlides" StopButtonText="Stop"
                  TargetControlID="Image1" runat="server">
            </cc1:SlideShowExtender>       
            </div>
</div>
</div>
<CP:footerUc ID="FooterUc1"  runat="server" />    
    </form>
</body>
</html>

