<%@ Page Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="PictureSelection.aspx.cs" Inherits="BK.PictureSelection" Title="Untitled Page" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server"> 

    <asp:LinkButton ID="btnFamilyPics" runat="server" Font-Size="X-Large" 
        Height="60px" onclick="LinkButton1_Click" Width="233px">Family Pictures</asp:LinkButton>
    <br />
    
    
    
    <asp:LinkButton ID="btnInterestingPics" runat="server" Font-Size="X-Large" 
        Height="60px" Width="233px" onclick="btnInterestingPics_Click">Interesting 
    Pictures</asp:LinkButton>
    <br />
    
    
     <asp:LinkButton ID="btnOpticIllusionPics" runat="server" Font-Size="X-Large" 
        Height="60px" Width="233px" onclick="btnOpticIllusionPics_Click" >Optic 
    Illusion Pics</asp:LinkButton>
    <br />
    <asp:LinkButton ID="LinkButton1" runat="server" Font-Size="X-Large" 
        onclick="LinkButton1_Click1">2011 Trip</asp:LinkButton>
    <br />
    
    
</asp:Content>