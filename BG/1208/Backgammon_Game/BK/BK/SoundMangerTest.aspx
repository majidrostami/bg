<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SoundMangerTest.aspx.cs" Inherits="BK.SoundMangerTest" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Untitled Page</title>
</head>
<body>
<!-- include SM2 library -->
<script type="text/javascript" src="/SoundManager2/script/soundmanager2.js"></script>

<!-- configure it for your use -->

    <form id="form1" runat="server">
    <div>
    <script type="text/javascript">
  var done = true;
  
  function playSound(mySound, idd){
    if(done){
    done = false;
    soundManager.url = '/SoundManager2/swf/'; // directory where SM2 .SWFs live
/*
 * Note that SoundManager will determine and append the appropriate .SWF file to the URL,
 * eg. /path/to/sm2-flash-files/soundmanager2.swf automatically.
 *
 * Bonus: Read up on HTML5 audio support, if you're feeling adventurous.
 * iPad/iPhone and devices without flash installed will always attempt to use it.
 *
 * Also, See the flashblock demo when you want to start getting fancy.
*/

// disable debug mode after development/testing..
// soundManager.debugMode = false;

// The basics: onready() callback

soundManager.onready(function(){

  // SM2 has loaded - now you can create and play sounds!

    mySound = soundManager.createSound({
    id: idd,
    url: mySound, 
    onfinish: function() {
      done = true;
    }
    // onload: myOnloadHandler,
    // other options here..
  });

  mySound.play();
   
});

// Optional: ontimeout() callback for handling start-up failure

soundManager.ontimeout(function(){

  // Hrmm, SM2 could not start. Flash blocker involved? Show an error, etc.?

});  
}
else{

}
}   

function Button1_onclick() {
    playSound('/SoundManager2/sounds/Joft.mp3', 'bSound'); 
}
function Button2_onclick() {
    playSound('/SoundManager2/sounds/mak.mp3', 'cSound');
}
playSound('/SoundManager2/sounds/coins.mp3', 'aSound');
    </script>       
        <input id="Button1" type="button" value="BASS" onclick="return Button1_onclick()" /><br />
        <br />
        <input id="Button2" type="button" value="MAK" onclick="return Button2_onclick()" /></div>
    </form>
</body>
</html>
