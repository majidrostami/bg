/********************************************
game object keeps track of game information
It is an object with the following propertis
score : indicating how many outlaws we have
        killed
lives : indicating how many brother we have 
        left		
difficulty : 
            indicates the level of difficulty
            of the game
seconds: number of seconds we have been playing			

gameOver: it is false if the lives is not zero
          
*******************************************/
function gameObj(d) {
	this.score = 0;
	this.lives = 3;
	this.difficulty = d;
	this.seconds = 0;
	this.counter = 0;
	this.gameOver = false;
}
/**************************************************
//character object tracks character properties
 left and top peroperties indicate the position
 and we also have properties for left and top offsets
 and left and up speeds we also have prperties
 like shooting, moving, reloading, bullets, dead 
 indicating the state of the character
 the type and id methods are used to identify them 
 in our code 

***************************************************/

function character(x, y) {
	this.left = x;
	this.top = y;
	this.leftOffset = 0;
	this.width = 0;
	this.topOffset = 0;
	this.height = 0;
	this.lastLeft = "0px";
	this.lastTop = "0px";
	this.moving = false;
	this.shooting = 0;
	this.reloading = 0;
	this.dead = 0;
	this.bullets = 6;
	this.dx = 0;
	this.dy = 0;
	this.src = "images/outlaw_move.gif";
	this.killtime = 40;
	this.type = -1;
	this.bullet = null;
	this.id = -1;
}

/********************************************
  bullet object tracks bullet properties
  left and top offets indicate the position
  width and height indicate the size
  id and type is used to identify the object
  in our code; the visible and src are used
  for the appearance

*********************************************/
function bullet() {
	this.left = 0;
	this.top = 0;
	this.leftOffset = 0;
	this.width = 17;
	this.topOffset = 0;
	this.height = 8;
	this.visible = "hidden";
	this.src = "";
	this.dir = 0;
	this.move = moveBullet;
	this.id = -4;
	this.type = -1;
	this.end = 0;
	this.name = "";
}


/*************************************************
like the bullet and the character it has all the
positioning and appearance and identification and  
speed properties like bullet and character
but it also has the state prperty indicating
how many bullets it has recieved the parameter
passed to it indicated the type of object to be
created
0 -------------> barrel
1 -------------> cactus
2 -------------> tomb Stone
3 -------------> tumble Weed
**************************************************/

function item(t) {
	this.left = 0;
	this.top = 0;
	this.width = 0;
	this.height = 0;
	this.leftOffset = 0;
	this.topOffset = 0;
	this.state = 3;
	this.type = t;
	this.remove = false;
	this.dx = 0;
	this.dy = 0;
	this.visible = "visible";
	this.id = -1;
	
	if (t==0) {
		this.src = "images/barrel_1.gif";
		this.leftOffset = 10;
		this.width = 68;
		this.topOffset = 0;
		this.height = 79;
	} else if (t==1) {
		this.src = "images/cactus_1.gif";
		this.leftOffset = 19;
		this.width = 57;
		this.topOffset = 0;
		this.height = 125;
	} else if (t==2) {
		this.src = "images/tombstone_3.gif";
		this.leftOffset = 1;
		this.width = 76;
		this.topOffset = 0;
		this.height = 84;
	} else if (t==3) {
		this.src = "images/tumbleweed_move.gif";
		this.leftOffset = 2;
		this.width = 75;
		this.topOffset = 0;
		this.height = 65;
		this.state = 1;
	}
	
	this.update = updateProperties;
}


/****************************************
Method for the item object to change the
appearance of the object in case of collision
we update the picture height and the top off
prperties for each item based on its type   
and its state
*****************************************/
function updateProperties() {
	if (this.type==0) {
		if (this.state == 2) {
			this.src = "images/barrel_2.gif";
			this.topOffset = 24;
			this.height = 67;
		} else if (this.state == 1) {
			this.src = "images/barrel_3.gif";
			this.topOffset = 40;
			this.height = 42;
		} else if (this.state == 0) {
			this.src = "images/barrel_4.gif";
		}
	} else if (this.type==1) {
		if (this.state == 2) {
			this.src = "images/cactus_2.gif";
			this.topOffset = 28;
			this.height = 98;
		} else if (this.state == 1) {
			this.src = "images/cactus_3.gif";
			this.topOffset = 55;
			this.height = 71;
		} else if (this.state == 0) {
			this.src = "images/cactus_4.gif";
		}
	} else if (this.type==2) {
		if (this.state == 2) {
			this.src = "images/tombstone_4.gif";
			this.topOffset = 24;
			this.height = 61;
		} else if (this.state == 1) {
			this.src = "images/tombstone_5.gif";
			this.topOffset = 44;
			this.height = 39;
		} else if (this.state == 0) {
			this.src = "images/tombstone_6.gif";
		}
	} else if (this.type==3) {
		if (this.state == 0) {
			this.src = "images/tumbleweed_3.gif";
		}
	}
}

//**********************************************
// Global Variables
//game vars
var game, user, outlaw;
var mainTimer;
var highPlayer = new Array(3);
	highPlayer[0] = "NA";
	highPlayer[1] = "NA";
	highPlayer[2] = "NA";
var highScore = new Array(3);
	highScore[0] = 0;
	highScore[1] = 0;
	highScore[2] = 0;
	
// to hold all of the objects in it	
var objArray = new Array(0);

//preload tumbleweed image
var tw= new Image;
tw.src = "images/tumbleweed_move.gif";



//init function initializes the game for playing
/***********************************************
WE are basically creating both players and the
intial objects to be displayed on the scene 
we intialize the content of score and the time we
put the items inside the objArray we set the methods
of document object like onKeydone and on mouse move

***********************************************/
function init(d) {
	//remove opening screen
	var screen = document.getElementById("screen");
	screen.style.display = "none";
	
	//display playing area
	var playingArea = document.getElementById("playingArea");
	playingArea.style.display = "block";
	
	userBullet = new bullet();
	userBullet.dir = 30;
	userBullet.type = -3;
	userBullet.end = 990;
	userBullet.src = "../images/bullet_2.gif";
	userBullet.name = "Lbullet";
	
	outlawBullet = new bullet();
	outlawBullet.dir = -30;
	outlawBullet.type = -2;
	outlawBullet.end = -17;
	outlawBullet.src = "../images/bullet.gif";
	outlawBullet.name = "Rbullet";
		
	//initialize game, characters, and bullets
	game = new gameObj(d);
	user = new character(0, 20);
	user.leftOffset = 16;
	user.width = 72;
	user.topOffset = 0; 
	user.height = 130;
	user.type = -3;
	user.bullet = userBullet;
	
	outlaw = new character(595, 0);
	outlaw.leftOffset = 43;
	outlaw.width =	71;
	outlaw.topOffset = 0;
	outlaw.height = 130;
	outlaw.dy = -4;
	outlaw.type = -2;
	outlaw.bullet = outlawBullet;
	
	//hide bullet
	var lBullet = document.getElementById("Lbullet");
	lBullet.style.visibility = "hidden";
	
	var rBullet = document.getElementById("Rbullet");
	rBullet.style.visibility = "hidden";
	
	//show top bullets
	var tBullet;
	for (var i=1; i<7; i++) {
		tBullet = document.getElementById("b"+i);
		tBullet.style.visibility = "visible";
	}
	
	//create random objects
	for (var i=0; i<3-d; i++) {
		objArray[i] = new item(Math.round(Math.random()*1));
		objArray[i].left = 198 + i*198+Math.round(Math.random()*50);
		objArray[i].top = Math.round(Math.random() * 2)*179 + Math.round(Math.random()*50);
		objArray[i].id = i;
		var img = document.createElement("img");
		img.src = objArray[i].src;
		img.id = i;
		document.getElementById("playingArea").appendChild(img);
	}

	//position good guy
	goodGuy.style.left = user.left - 16;
	goodGuy.style.top = user.top - 1;
	
	//position bad guy        
	badGuy.style.left = outlaw.left - 44;
	badGuy.style.top = outlaw.top - 1;
		
	//register key and mouse listeners
	document.onkeydown = keyListener;
	document.onclick = shoot;
	document.oncontextmenu = reload;
	document.getElementById("playingArea").onmousemove = moveCowboy;

	//start main game loop
	start();
}

/*****************************************************
just to show the Help Menu and change the visibilty
property

*******************************************************/
function showHelp() {	
	var helpinfo = document.getElementById("helpinfo");
	helpinfo.style.visibility = "visible";
}


/*****************************************************
just to hide the Help Menu and change the visibilty
property

*******************************************************/
function resetHelp() {
	var helpinfo = document.getElementById("helpinfo");
	helpinfo.style.visibility = "hidden";
}

//move couwboy responds to mouse move
/*****************************************************
moveCowboy moves the cowboy character based on the
mouse movement and the key pressed we make sure that
we don't pass the limits and we scroll up and down
*******************************************************/
function moveCowboy(e) {
	if (user.dead == 0) {
		var x, y;
		if (!e) {
			//for IE
			e = window.event;
			x = e.x;
			y = e.y;
		} else {
			x = e.layerX;
			y = e.layerY;
		}

		//get good guy
		var goodGuy = document.getElementById("goodGuy");
		
		//update  new position but save old in case new position is not allowed
		var oldLeft = user.left;
		var xPos = x + document.body.scrollLeft - 24;
		user.left = xPos;
		
		//move horizontally if within allowable area
		var hit = collision(user);
		if ( !(x < 332 &&  hit == -1) ) {
			user.left = oldLeft;
		}

		//update  new position but save old in case new position is not allowed
		var oldTop = user.top;
		var yPos = y + document.body.scrollTop - 91;
		user.top = yPos;
		
		//move vertically if within allowable area
		var hit = collision(user);
		if ( !(y < 490 && collision(user) == -1) ) {
			user.top = oldTop;
		}
	}
}
/***************************************************
//keyListener functions responds to keyboard input
up arrow ,down arrow, left and right moves the charter 
space shoots and r does the reload
***************************************************/

function keyListener(e) {
	if(!e){
		//for IE
		e = window.event;
	}

	if (user.dead == 0) {
		var oldLeft = user.left;
		var oldTop = user.top;
		
		//move character left if within allowable range
		if(e.keyCode==37 && user.left > -15){
			user.left -= 4;
		}

		//move character up if within allowable range
		if (e.keyCode == 38 && user.top > 0)  {
			user.top -= 4;	
		}	
			
		//move character right if within allowable range
		if(e.keyCode==39 && user.left < 301) {
			user.left += 4;
		}
		
		//move character down if within allowable range
		if (e.keyCode == 40 && user.top < 396) {
			user.top += 4;	   
		}
		
		if (collision(user) != -1) {
			user.left = oldLeft;
			user.top = oldTop;
		}

		//shoot on spacebar hit
		if (e.keyCode == 32) {
			shoot(user, 123, 43);
		}
		
		//reload on r hit
		if (e.keyCode == 82) {
			reload(user);
		}
	}
}

/***********************************************************************************
//shoot function position bullet at end of gun barrell and initializes move sequence
 the parameters passed to it are the obj could be the user or outlaw we make sure
 that the cracter is not dead or it is not relaoding before the shooting
 

************************************************************************************/
function shoot(obj, x, y) {
	if (!obj) {
		obj = user;
		x = 123;
		y = 43;
	}
	
	//shoot only if user has bullets, is not reloading, and not currently shooting
	if (obj.shooting == 0 && obj.bullets > 0 && obj.reloading == 0 && obj.dead == 0) {
		obj.shooting = 1;
		
		//decrement shots
		obj.bullets -= 1;
		
		if (obj.type == -3) {
			updateBullets(0);
		}
		
		//position bullet and fire!
		obj.bullet.visible = "visible";
		obj.bullet.left = obj.left + x;
		obj.bullet.top = obj.top + y;
		obj.bullet.move();
	}
}

//reload function resets bullet count
/**********************************************
This is used for the user to increase the number
of bullets we should pass to it the outlaw or the
user
********************************************/
function reload(obj) {
	if (!obj) {
		obj = user;
	}
	
	//make sure user is currently not reloading and is out of bullets
	if (obj.reloading == 0 && obj.bullets == 0) {
		obj.reloading = 1;
	}
	
	//to cancel context menu 
	return false;
}
/**********************************************************
//start function is the main loop that keeps the game going
in this function we change the inner HTML for the score and time
we are constatly calling render characters, renderItems,moveTW
and move AI one clock tick is about 25 milli seconds

************************************************************/
function start() {
	//display characters on screen
	renderCharacters();
	
	//display objects on screen
	renderItems();
	
	//move tumble weed
	moveTW();
	
	//move AI character
	moveAI();
	
	//keep track of milliseconds
	game.counter += 1;
	
	//every second update clock and call creatTW
	if (game.counter % 40 == 0) {
		createTW();
		updateClock();
	}
	
	if (user.bullet.left < 990 && user.shooting != 0) {
		user.bullet.move();
	} else {
		//terminate bullet
		user.shooting = 0;
		user.bullet.visible = "hidden";
	}
	
	if (outlaw.bullet.left > 0 && outlaw.shooting != 0) {
		outlaw.bullet.move();
	} else {
		outlaw.shooting = 0;
		outlaw.bullet.visible = "hidden";
	}
	
	//ensure game isn't over yet
	if(game.gameOver == false){
		//still in play - keep the loop going
		mainTimer = setTimeout('start()', 25);
	} else {
		gameOver();
	}
}

/*****************************************************************
The quit function sets the gameOver to true and blocks the screen
We hade the palying area ultimately


******************************************************************/

function quit() {
	if (game) {
		game.gameOver = true;
		
		//remove opening screen
		var screen = document.getElementById("screen");
		screen.style.display = "block";
		
		//display playing area
		var playingArea = document.getElementById("playingArea");
		playingArea.style.display = "none";
	}
}



/*****************************************************************
we basically just terminate the game and update the high scores
we are also callin the clear scene function to get rid of unwanted
items in the field

******************************************************************/

function gameOver(){
	//end the game by clearing the timer, modifying the score label
	clearTimeout(timer);
	
	
	if (game.score > highScore[0]) {
		updateScores(0);
	} else if (game.score > highScore[1]) {
		updateScores(1);
	} else if (game.score > highScore[2]) {
		updateScores(2);
	}
	
	clearScene();
	
} 


/********************************************************
remove all the children of the playingArea and
sets the objArray to a new array to clear everything

**********************************************************/
function clearScene(){
      var i;
	  
	  for ( i = 0; i < objArray.length; i++){
		  var img = document.getElementById(i);
		  document.getElementById("playingArea").removeChild(img);
		  
	  }
	  
	  objArray = new Array(0);
	
}


//moves the AI character
/************************************************************
this function is responsible for the movement of the outlaw
for each leval of difficulty we do differnt things for difficulty
0  we just move up and down and always shoot 
for difficulty 2 we follow the user and shout when outlaw can
kill the user
for difficulty 2 we also follow the user but if we find that
 lower portion of the body is coverd we hide there and shoot when
we see the other guy . oulaw moves ver fast and it is hard to kill
**************************************************************/
function moveAI() {
	if (game.difficulty == 0) {
		
		if (outlaw.dead == 1){
			
		    outlaw.dy = 0;	
			
		}
		else if (outlaw.top < 2 && outlaw.dy <= 0) {
			outlaw.dy = 4
		} 
		else if (outlaw.top > 391 && outlaw.dy >= 0) {
			outlaw.dy = -4;
		}
		
		var hit = collision(outlaw);
		if (hit != -1) {
			outlaw.dy = -outlaw.dy;
		}
		
		outlaw.top += outlaw.dy;
		
		shoot(outlaw, 12, 43);
		
		if (outlaw.bullets == 0) {
			reload(outlaw);
		}
	} else if (game.difficulty == 1) {
		if (outlaw.dead == 1) {
			outlaw.dy = 0;
		} else if ( Math.abs(outlaw.top - user.top) <= 40) {
			if (user.dead == 0) {
				shoot(outlaw, 12, 43);
			}
			outlaw.dy = 0;
		} else if (outlaw.top <= user.top ) {
			outlaw.dy = 6
		} else if (outlaw.top > user.top) {
			outlaw.dy = -6;
		}
		
		if (outlaw.bullets == 0) {
			reload(outlaw);
		}
		outlaw.top += outlaw.dy;
	}
	
	 else if(game.difficulty == 2){
		
		//badChild = documen
	
				
		document.getElementById("sound1").src = "2.mp3";	
	        //document.getElementById("playingArea").removeChild(sss);		
		//env.removeChild(sss); 
		 if ( outlaw.dead == 1) {
			outlaw.dy = 0;
		} 
		else if (isHiding(outlaw) != -1){
			
		    outlaw.dy = 0;
			if ( Math.abs(outlaw.top - user.top) <= 40) {
			    if (user.dead == 0) {
				    shoot(outlaw, 12, 43);
			    }
			}
			
		}
		
		else if ( Math.abs(outlaw.top - user.top) <= 40) {
			if (user.dead == 0) {
				shoot(outlaw, 12, 43);
			}
			outlaw.dy = 0;
		} else if (outlaw.top <= user.top ) {
			outlaw.dy = 8;
		} else if (outlaw.top > user.top) {
			outlaw.dy = -8;
		}
		
		if (outlaw.bullets == 0) {
			reload(outlaw);
		}
		outlaw.top += outlaw.dy;
		 
	 }
		
}

/*******************************************************
we go through a loop for every object on the scene and 
check if it is a good shelter for the outlaw is it is
we just we return the ID of the AI  other wise if there is 
no good shelter we just return -1
********************************************************/


function isHiding(obj)
{
	var i;
	for (i = 0; i < objArray.length; i++){
		if (obj.left > objArray[i].left + objArray[i].leftOffset ){
			if (obj.top + obj.topOffset + (obj.height * 0.45 )> objArray[i].top + objArray[i].topOffset && 
				(obj.top + obj.topOffset + (obj.height * 0.45)< objArray[i].top + objArray[i].topOffset + objArray[i].height)
				
				&& obj.top + obj.topOffset + (obj.height)> objArray[i].top + objArray[i].topOffset && 
				(obj.top + obj.topOffset + (obj.height)< objArray[i].top + objArray[i].topOffset + objArray[i].height))
			
			  if (objArray[i].left > user.left){ 
			     return i;
			  }
			
		}
	}
	
	return -1;
}
/****************************************************
This function creates a new tombStone on the scene
on the position of the object passed to it and puts it
in one array then it returns the index of that object in the 
array
******************************************************/
function newTomb(obj) {
	var extraTomb = objArray.length;		
	objArray[extraTomb] = new item(2);
	objArray[extraTomb].left = obj.left;
	objArray[extraTomb].top = obj.top;
	objArray[extraTomb].id = extraTomb;
	return extraTomb;
}

/************************************************************
//creates a new tumbleweed object and places it on the screen
every second we have 1/4 chance to create it or not
every created tumble weed will be appended to the playing area
tag
**************************************************************/
function createTW() {

	if (Math.round(Math.random()*4) != 1) {
		var at = objArray.length;
		objArray[at] = new item(3);
		objArray[at].left = Math.round(Math.random()*200)+395;
		objArray[at].id = at;
		if (Math.round(Math.random()*1) == 0) {
			objArray[at].top = -75;
			objArray[at].dy = 5;
			objArray[at].dx = Math.round(Math.random()*6)-3;
		} else {
			objArray[at].top = 612;
			objArray[at].dy = -5;
			objArray[at].dx = Math.round(Math.random()*6)-3;
		}
		objArray[at].state = 1;
		objArray[at].visible = "visible";
		
		var img = document.createElement("img");
		img.src = objArray[at].src;
		img.id = at;
		img.style.visibility = "hidden";
		document.getElementById("playingArea").appendChild(img);
	}
}

//function that moves all tumbleweeds on screen
/****************************************************************
the top property always changes but the left property
cahnges randomlr creating a random movement on the screen
we basically go through the array and identify the tumbleweeds
******************************************************************/
function moveTW() {
	for(var i=0; i<objArray.length; i++) {
		if(objArray[i].type == 3) {
			objArray[i].top += objArray[i].dy;
			objArray[i].left += objArray[i].dx;

			var hit = collision(objArray[i])
			if (hit != -1 || (objArray[i].top < -75 || objArray[i].top > 612)) {
				objArray[i].state = 0;
				objArray[i].update();
			}
		}
	}
}


/*****************************************************************
it is responsible for the movement of the bullets on the screen
the left property is increamented by the the dir
*****************************************************************/

//moves bullet until it hits something or goes off playing area
function moveBullet() {
	var theBullet = document.getElementById(this.name);

	//move bullet
	this.left += this.dir;
	
	//check collision
	var hit = collision(this);
	if ( hit == -3 || hit == -2) {
		this.left = this.end;
	} else if (hit != -1) {
		objArray[hit].state -= 1;
		objArray[hit].update();
		this.left = this.end;
	}
	
	//display it on screen
	if (theBullet != null){
	    theBullet.style.visibility = this.visible;
	    theBullet.style.top = this.top;
	    theBullet.style.left = this.left;
	    theBullet.src = this.src;
	}
}

//renderCharacters function disaply the correct sprite on screen depending on current character action
/*******************************************************************************************************
This is responsible for creating the appropriate picture for the characters based on their
movement if we kill acharachter we replace it with the right ID and stay in this position for 
1 second the idetifires are shooting moving and reloading and dead
********************************************************************************************************/
function renderCharacters() {
	//get good guy
	var goodGuy = document.getElementById("goodGuy");
	var badGuy = document.getElementById("badGuy");
	
	//if he is shooting, display shooting sequence
	if (user.shooting != 0 && user.shooting != 4) {
		if (user.shooting == 3) {
			user.shooting = 4;
		}
		if (user.shooting == 2) {
			user.moving = false;
			goodGuy.src ="../images/cowboy_shoot2.gif";
			user.shooting = 3;
		}
		if (user.shooting == 1) {
			user.moving = false;
			goodGuy.src = "../images/cowboy_shoot1.gif";
			user.shooting = 2;
		}
		
	//if reloading, display reloading sprite
	} else if (user.reloading != 0) {
		if (user.reloading == 100) {
			user.reloading = 0;
		} else {
			user.moving = false;
			goodGuy.src = "../images/cowboy_reload.gif";
			user.reloading += 1;
		}
		
		if (user.reloading <= 75 && user.reloading % 15 == 0) {
			user.bullets += 1;
			updateBullets(1);
		}
		
	//if dead display dead sprite
	} else if (user.dead == true) {
		user.killtime--;	
		
		if(user.killtime==39) {
			goodGuy.src = "../images/cowboy_dead.gif";
		}
		if (user.killtime==20) {
			goodGuy.src = "../images/tombstone_1.gif";
		} else if (user.killtime==10) {
			goodGuy.src = "../images/tombstone_2.gif";
		}
		
	//display either moving or still sprite
	} else {		
		if (user.moving == false) {
			user.moving = true;
			goodGuy.src= "../images/cowboy_move.gif";
		}
		
		if (user.left == user.lastLeft && user.top == user.lastTop) {
			user.moving = false;
			goodGuy.src = "../images/cowboy_still.gif";
		}
	}
	
	if (user.killtime == 0) {
		var id = newTomb(user);
		
		user = new character(0, 20);
		user.leftOffset = 16;
		user.width = 72;
		user.topOffset = 0; 
		user.height = 130;
		user.type = -3;
		user.bullet = userBullet;
	
		var img = document.createElement("img");
		img.id = id;
		document.getElementById("playingArea").appendChild(img);
	}
	
	//display character on screen
	if (game.counter % 10 == 0) {
		user.lastLeft = user.left;
		user.lastTop = user.top;
	}
	
	goodGuy.style.left = user.left + 'px';
	goodGuy.style.top = user.top + 'px';
	

	if (outlaw.shooting != 0 && outlaw.shooting != 4) {
		if (outlaw.shooting == 3) {
			outlaw.shooting = 4;
		}
		if (outlaw.shooting == 2) {
			badGuy.src = "../images/outlaw_shoot2.gif";
			outlaw.shooting = 3;
		}
		if (outlaw.shooting == 1) {
			badGuy.src = "../images/outlaw_shoot1.gif";
			outlaw.shooting = 2;
		}
	} else if (outlaw.reloading != 0) {
		if (outlaw.reloading == 40) {
			outlaw.bullets = 6;
			outlaw.reloading = 0;
		} else {
			badGuy.src = "../images/outlaw_reload.gif";
			outlaw.reloading += 1;
		}
	} else if ( outlaw.dead == 1) {
		outlaw.killtime--;
		if (outlaw.killtime==20)
			outlaw.src = "../images/tombstone_1.gif";
		if (outlaw.killtime==10)
			outlaw.src = "../images/tombstone_2.gif";
	} else {
		badGuy.src = "../images/outlaw_move.gif";
	}
	
	if (outlaw.killtime == 0) {
		var id = newTomb(outlaw);
		
		var newLeft = outlaw.left + 65;
		var newTop = outlaw.top;
		
		if (newLeft > 915) {
			newTop += 130;
			newLeft -= 75;
			
			if (newTop > 380) {
				newTop = 0;
				newLeft = 595;
			}
		}

		//Change the offsets later
		outlaw = new character(newLeft, newTop);
	    outlaw.leftOffset = 43;
	    outlaw.width =	71;
	    outlaw.topOffset = 0;
	    outlaw.height = 130;
		outlaw.dy = -4;
		outlaw.type = -2;
		outlaw.bullet = outlawBullet;
		
		var img = document.createElement("img");
		img.id = id;
		document.getElementById("playingArea").appendChild(img);
		game.score++;
	}
	
	badGuy.style.left = outlaw.left + 'px';
	badGuy.style.top = outlaw.top + 'px';
	
	if (outlaw.dead == 1) {
		badGuy.src = outlaw.src;
	}
}

//renderItems function disaply the correct sprite on screen depending on current item stat
/******************************************************************************************
this function is responsible fo actually drawing the objects on the screen 
depending on the state and remove and type identifiers


/*******************************************************************************************/
function renderItems() {
	var remove = -1;
	
	for (var i=0; i<objArray.length; i++) {	
		var obj = document.getElementById(i);
		obj.style.left = objArray[i].left;
		obj.style.top = objArray[i].top;
		obj.style.visibility = objArray[i].visible;
		
		
		obj.src = objArray[i].src;
		
		if (objArray[i].remove == true) {
			remove = i;
		}
		
		if (objArray[i].state == 0) {
			objArray[i].remove = true;
		}
	}
	
	if (remove != -1) {
		var originalSize = objArray.length;
		
		var img = document.getElementById(remove);
		document.getElementById("playingArea").removeChild(img);
		objArray.splice(remove, 1);
		
		for (var i=remove+1; i<originalSize; i++) {
			var img = document.getElementById(i);
			img.id = i-1;
		}
	}
}



/**********************************************************
update Scores is responsible for prompting the user and putting the 
user scores in the table.
we also write the cookies for the game

***************************************************************/
function updateScores(n) {
	for (var i=(2-n); i>0; i--) {
		highScore[i] = highScore[i-1];
		highPlayer[i] = highPlayer[i-1];
	}

	highScore[0] = game.score;
	highPlayer[0] = prompt("Congratulations! You made it to the scoreboard. Please enter you initials.", "");
	
	writeCookie();
	readCookie();
}

//updateBullets updates the bullets at the top that display the number of bullets left before reloading
/**********************************************************************
This is just for the showing the right number of bullets on the screen
we set the visibility property of the objects

***********************************************************************/
function updateBullets(t) {
	if (t == 0) {
		var bulletID = 6 - user.bullets;
		var bullet = document.getElementById("b"+bulletID);
		bullet.style.visibility = "hidden";
	} else {
		var bulletID = 7 - user.bullets;
		var bullet = document.getElementById("b"+bulletID);
		bullet.style.visibility = "visible";
	}
}

/******************************************************************
This function displays the number of lives left for the character


********************************************************************/

function updateLives() {
	document.getElementById("lives").innerHTML = game.lives;
}

//updates the clock on the top of the 

/********************************************************************
this function calcultes the right nujmber of minutes and seconds and 
displays thaT ON the screen

*********************************************************************/
function updateClock() {
	game.seconds += 1;
	
	var m = Math.floor(game.seconds / 60);
	var s = game.seconds % 60;

	var timer = document.getElementById("timer");
	if (s < 10) {
		s = "0" + s;
	}
	
	timer.innerHTML = m + ":" + s;
	sc.innerHTML = game.score;
}

/*******************************************************************************************************************
Writes the cookies for the game with the right expiration date
we format everything correctly


*********************************************************************************************************************/
function writeCookie() {
	var date=new Date();
	date.setTime(date.getTime()+(7*24*60*60*1000))
	document.cookie="highScores=" +highPlayer[0]+","+highScore[0]+","+highPlayer[1]+","+highScore[1]+","+
					highPlayer[2]+","+highScore[2]+"; expires="+date.toGMTString();;
}

/*********************************************************************************************************************

by using the split function we get find all records and set up our arrays
we set the inner html for our paragraph
************************************************************************************************************************/

function readCookie() {
	var values=document.cookie.split("=");
	
	if (values != "") {
		var scores=values[1].split(",");
		var p;
		
		for(var i=0; i<scores.length; i=i+2) {
			highPlayer[i]=scores[i];
			highScore[i]=scores[i+1];
			
			p = document.getElementById("p"+i);
			p.innerHTML = highPlayer[i] + ": " + highScore[i];
		}
		return null;
	}
}

//isColliding indicate where passed in object is colliding with any objects on the screen
/**********************************************************************************************************************

We go through the objArray and find if any item is colliding with the passing object 
if it is we return the id for the colliding object at the end we also check for 
the collision with outlaw and the user


***********************************************************************************************************************/
function collision(obj) {
	var current, i;

	for (i=0; i<objArray.length; i++) {
		current = objArray[i];
		if (current.id != obj.id) {
			if (isColliding(current, obj)) {
				return i;
			}
		}
	}
	
	if (obj.type != -2 && obj.id != -1 && isColliding(outlaw, obj)) {;
		if (obj.type == 3) 	{
			return -2;
		}
		return killOutLaw();
	}
	
	if (obj.type != -3 && obj.id != -1 && isColliding(user, obj)) {
		if (obj.type == 3) {
			return -3;
		}
		return killUser();
	}
	
	return -1;
}



/***********************************************************************************************
takes two objects and check if they are colliding based on the four corners of the objects
this is huge crucial if statement
*************************************************************************************************/

function isColliding(current, obj) { 
	if (((obj.left+obj.leftOffset+obj.width) > (current.left+current.leftOffset) && 
		(obj.left+obj.leftOffset) < (current.left+current.leftOffset+current.width))
		&& ((obj.top+obj.topOffset+obj.height) > (current.top+current.topOffset) && 
		(obj.top+obj.topOffset) < (current.top+current.topOffset+current.height))) {
		return true;
	}
	return false;
}



/*************************************************************************************
we set the image for the killed outlaw and set the speed to zero
we set the dead identifier to true

*************************************************************************************/
function killOutLaw() {
	if (outlaw.dead == 0) {
		outlaw.src = "../images/outlaw_dead.gif";
		outlaw.dx = 0;
		outlaw.dy = 0;
		outlaw.dead = 1;
		return -2;
	}
	return -1;
}




/*************************************************************************************
we set the image for the killed user and set the speed to zero
we set the dead identifier to true

*************************************************************************************/

function killUser() {
	if (game.lives == 0) {
		alert("GAME OVER!!");
		quit();
	} else {
		if (user.dead == 0) {
			user.dead = 1;
			game.lives -= 1;
			updateLives();
		}
	}
	return -3;
}
