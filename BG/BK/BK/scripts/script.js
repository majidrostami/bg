
//**********************************************
// Global Variables
//game vars
var game;
var mainTimer;
var bottomPlayer;
var topPlayer;
var tableNumber;

function querySt(ji) {
hu = window.location.search.substring(1);
gy = hu.split("&");
for (i=0;i<gy.length;i++) {
ft = gy[i].split("=");
if (ft[0] == ji) {
return ft[1];
}
}
}

function leaving(){
    
    NotifyServerForLeave();
    
    
}
function StartBgGame(boardType) {


    window.onbeforeunload = closeIt;
    
    
    
    
    document.getElementById("btnStartGame").style.visibility = "hidden";
    document.getElementById("forceleave").style.visibility = "hidden";
    tableNumber = querySt("tn");
    //alert(tableNumber);
    game = new gameObject();
    for (i2 = 0; i2 < 28; i2++) {
        game.bpieces[i2] = 0;
        game.tpieces[i2] = 0;

    }

    game.bpieces[6] = 5;
    game.bpieces[8] = 3;
    game.bpieces[13] = 5;
    game.bpieces[24] = 2;

    game.tpieces[19] = 5;
    game.tpieces[17] = 3;
    game.tpieces[12] = 5;
    game.tpieces[1] = 2;

    player1 = new player1Object();
    player1.turnRoll = 0;
    
    player2 = new player2Object();
    player2.turnRoll = 0;
    placePieces(boardType, game);
    (document.getElementById("endTurnButton")).disabled = true;
    
    game.started = false;
   document.getElementById("currentTurn").innerHTML = "Game Not started";
   
    periodicUpdate();
}

function findBrowser() {
    var browser = navigator.appName;
    var b_version = navigator.appVersion;

    if (browser.indexOf("Internet Explorer") != -1) {
        return "IE";
    }
    else {
        return "NS"
    }
}

function player1Object() {
    this.firstName = "";
    this.lastName = "Player One";
    this.username = "";
    this.score = 0;
    this.pips = 167;
    this.turnRoll = 0;
    this.isOwner = false;
    this.started = false;
    
    
}

function player2Object() {

    this.firstName = "";
    this.lastName = "Player Two";
    this.username = "";
    this.score = 0;
    this.pips = 167;
    this.turnRoll = 0;
    this.isOwner = false;
    this.started = false;
    
}


function bottomPice() {
    this.color = "blue";
    this.src = "../images/pieces/bluetrans.gif";
    this.top = 0;
    this.left = 0;

}


function stratTheGame(){
   // alert("starting the game for this player LLLLLLL");
    player1.started = true;
    if (player2.started == true){
        game.started = true;
    }  
    
    notifyServerForGameStart();
}




function iaAlreadyCandidate(area) {

}


function doesItKill(area) {
    if (area == -1) {
        return false;
    }

    if (game.turn == "top") {
        if (game.bpieces[area] == 1) {
            return true;
        }
        else {
            return false;
        }
    }

    else {
        if (game.tpieces[area] == 1) {
            return true;
        }
        else {
            return false;
        }

    }

}


function findCandidateAreas(area) {
    var c1 = -1;
    var c2 = -1;
    var c3 = -1;
    var c4 = -1;




    if (game.turn == "ud") {
        return;

    }

    else if (game.turn == "top") {
        if (game.tpieces[area] != 0) {
            if (area != 27) {
                if (game.die1 == game.die2) {

                    c1 = validateCandidate(area + game.playables[0], area);
                    c2 = validateCandidate(area + game.playables[1] + game.playables[0], area);
                    c3 = validateCandidate(area + game.playables[2] + game.playables[1] + game.playables[0], area);
                    c4 = validateCandidate(area + game.playables[3] + game.playables[2] + game.playables[1] + game.playables[0], area);
                   
                    if ((c1 != -1) || (c2 != -1) || (c3 != -1) || (c4 != -1)) {
                        game.areaSelected = area;
                    }
                    if (c1 == -1) {
                        c2 = -1;
                        c3 = -1;
                        c4 = -1;

                    }
                    if (doesItKill(c1) == true) {
                        c2 = -1;
                    }

                    if (c2 == -1) {
                        c3 = -1;
                        c4 = -1;

                    }

                    if (doesItKill(c2) == true) {
                        c3 = -1;
                    }

                    if (c3 == -1) {

                        c4 = -1;
                    }
                    if (doesItKill(c3) == true) {
                        c4 = -1;
                    }

                    
                    if (c1 != -1) {
                        cp1 = new candidatePosition();
                        cp1.areaNumber = c1;
                        cp1.playAble[0] = true;
                        cp1.playAble[1] = false;
                        cp1.playAble[2] = false;
                        cp1.playAble[3] = false;

                        game.candidatePositions[0] = cp1;

                    }
                    if (c1 != 25) {
                        if (c2 != -1) {
                            if (c2 != 25) {
                                cp2 = new candidatePosition();
                                cp2.areaNumber = c2;
                                cp2.playAble[0] = true;
                                cp2.playAble[1] = true;
                                cp2.playAble[2] = false;
                                cp2.playAble[3] = false;

                                game.candidatePositions[1] = cp2;
                            }
                        }
                        if (c3 != -1) {
                            if (c3 != 25) {
                                cp3 = new candidatePosition();
                                cp3.areaNumber = c3;
                                cp3.playAble[0] = true;
                                cp3.playAble[1] = true;
                                cp3.playAble[2] = true;
                                cp3.playAble[3] = false;

                                game.candidatePositions[2] = cp3;
                            }
                        }


                        if (c4 != -1) {
                            if (c4 != 25) {
                                cp4 = new candidatePosition();
                                cp4.areaNumber = c4;
                                cp4.playAble[0] = true;
                                cp4.playAble[1] = true;
                                cp4.playAble[2] = true;
                                cp4.playAble[3] = true;

                                game.candidatePositions[3] = cp4;
                            }
                        }
                    }

                    showMovableAreas();
                }

                if (game.die1 != game.die2) {
                    c1 = validateCandidate(area + game.playables[0], area);
                    c2 = validateCandidate(area + game.playables[1], area);
                    c3 = validateCandidate(area + game.playables[1] + game.playables[0], area);
                    if ((c1 == -1) && (c2 == -1)) {
                        c3 = -1;
                    }

                    if ((doesItKill(c1) == true) || (doesItKill(c2) == true)) {
                        c3 = -1;
                    }



                    if ((c1 != -1) || (c2 != -1)) {

                        game.areaSelected = area;

                    }


                    if (c1 != -1) {
                        cp1 = new candidatePosition();
                        cp1.areaNumber = c1;
                        cp1.playAble[0] = true;
                        cp1.playAble[1] = false;
                        cp1.playAble[2] = false;
                        cp1.playAble[3] = false;

                        game.candidatePositions[0] = cp1;

                    }

                    if (c2 != -1) {
                        cp2 = new candidatePosition();
                        cp2.areaNumber = c2;
                        cp2.playAble[0] = false;
                        cp2.playAble[1] = true;
                        cp2.playAble[2] = false;
                        cp2.playAble[3] = false;

                        game.candidatePositions[1] = cp2;

                    }
                    if ((c1 != 25) && (c2 != 25)) {
                        if (c3 != -1) {
                            if (c3 != 25) {
                                cp3 = new candidatePosition();
                                cp3.areaNumber = c3;
                                cp3.playAble[0] = true;
                                cp3.playAble[1] = true;
                                cp3.playAble[2] = false;
                                cp3.playAble[3] = false;

                                game.candidatePositions[2] = cp3;
                            }
                        }
                    }

                    showMovableAreas();
                }

                else {
                    return;
                }
            }
        }

        if (area == 27) {
           
            if (game.tpieces[area] != 0) {
                
                if (game.die1 == game.die2) {

                    c1 = validateCandidate(game.playables[0], area);

                    if (c1 != -1) {
                        cp1 = new candidatePosition();
                        cp1.areaNumber = c1;
                        cp1.playAble[0] = true;
                        cp1.playAble[1] = false;
                        cp1.playAble[2] = false;
                        cp1.playAble[3] = false;

                        game.candidatePositions[0] = cp1;
                        game.areaSelected = area;

                    }
                    
                    showMovableAreas();
                }
                else {
                   
                    c1 = validateCandidate(game.playables[0], area);
                    c2 = validateCandidate(game.playables[1], area);
                    
                    if (c1 != -1) {
                        cp1 = new candidatePosition();
                        cp1.areaNumber = c1;
                        cp1.playAble[0] = true;
                        cp1.playAble[1] = false;
                        cp1.playAble[2] = false;
                        cp1.playAble[3] = false;

                        game.candidatePositions[0] = cp1;
                        game.areaSelected = area;

                    }

                    if (c2 != -1) {
                        cp2 = new candidatePosition();
                        cp2.areaNumber = c2;
                        cp2.playAble[0] = false;
                        cp2.playAble[1] = true;
                        cp2.playAble[2] = false;
                        cp2.playAble[3] = false;

                        game.candidatePositions[1] = cp2;
                        game.areaSelected = area;
                    }
                    showMovableAreas();

                }

            }
        }
    }
    else if (game.turn == "buttom") {
        if (game.bpieces[area] != 0) {

            if (area != 26) {

                if (game.die1 == game.die2) {

                    c1 = validateCandidate(area - game.playables[0], area);
                    c2 = validateCandidate(area - game.playables[1] - game.playables[0], area);
                    c3 = validateCandidate(area - game.playables[2] - game.playables[1] - game.playables[0], area);
                    c4 = validateCandidate(area - game.playables[3] - game.playables[2] - game.playables[1] - game.playables[0], area);
                   
                    if (c1 == -1) {
                        c2 = -1;
                        c3 = -1;
                        c4 = -1;

                    }
                    if (doesItKill(c1) == true) {
                        c2 = -1;
                    }


                    if (c2 == -1) {
                        c3 = -1;
                        c4 = -1;

                    }

                    if (doesItKill(c2) == true) {
                        c3 = -1;
                    }

                    if (c3 == -1) {

                        c4 = -1;
                    }

                    if (doesItKill(c3) == true) {
                        c4 = -1;
                    }
                    if ((c1 != -1) || (c2 != -1) || (c3 != -1) || (c4 != -1)) {

                        game.areaSelected = area;

                    }
                    
                    if (c1 != -1) {
                        cp1 = new candidatePosition();
                        cp1.areaNumber = c1;
                        cp1.playAble[0] = true;
                        cp1.playAble[1] = false;
                        cp1.playAble[2] = false;
                        cp1.playAble[3] = false;

                        game.candidatePositions[0] = cp1;

                    }
                    if (c1 != 0) {

                        if (c2 != -1) {
                            if (c2 != 0) {
                                cp2 = new candidatePosition();
                                cp2.areaNumber = c2;
                                cp2.playAble[0] = true;
                                cp2.playAble[1] = true;
                                cp2.playAble[2] = false;
                                cp2.playAble[3] = false;

                                game.candidatePositions[1] = cp2;

                            }
                        }
                        if (c3 != -1) {
                            if (c3 != 0) {
                                cp3 = new candidatePosition();
                                cp3.areaNumber = c3;
                                cp3.playAble[0] = true;
                                cp3.playAble[1] = true;
                                cp3.playAble[2] = true;
                                cp3.playAble[3] = false;

                                game.candidatePositions[2] = cp3;

                            }
                        }


                        if (c4 != -1) {
                            if (c4 != 0) {
                                cp4 = new candidatePosition();
                                cp4.areaNumber = c4;
                                cp4.playAble[0] = true;
                                cp4.playAble[1] = true;
                                cp4.playAble[2] = true;
                                cp4.playAble[3] = true;

                                game.candidatePositions[3] = cp4;

                            }
                        }
                    }

                    showMovableAreas();
                }

                if (game.die1 != game.die2) {
                    c1 = validateCandidate(area - game.playables[0], area);
                    c2 = validateCandidate(area - game.playables[1], area);
                    c3 = validateCandidate(area - game.playables[1] - game.playables[0], area);
                    if ((c1 == -1) && (c2 == -1)) {
                        c3 = -1;
                    }

                    if ((c1 != -1) || (c2 != -1)) {

                        game.areaSelected = area;

                    }
                    if ((doesItKill(c1) == true) || (doesItKill(c2) == true)) {
                        c3 = -1;
                    }

                    if (c1 != -1) {
                        cp1 = new candidatePosition();
                        cp1.areaNumber = c1;
                        cp1.playAble[0] = true;
                        cp1.playAble[1] = false;
                        cp1.playAble[2] = false;
                        cp1.playAble[3] = false;

                        game.candidatePositions[0] = cp1;

                    }

                    if (c2 != -1) {
                        cp2 = new candidatePosition();
                        cp2.areaNumber = c2;
                        cp2.playAble[0] = false;
                        cp2.playAble[1] = true;
                        cp2.playAble[2] = false;
                        cp2.playAble[3] = false;

                        game.candidatePositions[1] = cp2;

                    }
                    if ((c1 != 0) && (c2 != 0)) {
                        if (c3 != -1) {
                            if (c3 != 0) {
                                cp3 = new candidatePosition();
                                cp3.areaNumber = c3;
                                cp3.playAble[0] = true;
                                cp3.playAble[1] = true;
                                cp3.playAble[2] = false;
                                cp3.playAble[3] = false;

                                game.candidatePositions[2] = cp3;
                            }
                        }
                    }
                    
                    showMovableAreas();
                }

            }

        }

        if (area == 26) {

            if (game.bpieces[area] != 0) {
               
                if (game.die1 == game.die2) {

                    c1 = validateCandidate(25 - game.playables[0], area);

                    if (c1 != -1) {
                        cp1 = new candidatePosition();
                        cp1.areaNumber = c1;
                        cp1.playAble[0] = true;
                        cp1.playAble[1] = false;
                        cp1.playAble[2] = false;
                        cp1.playAble[3] = false;

                        game.candidatePositions[0] = cp1;
                        game.areaSelected = area;

                    }
                    
                    showMovableAreas();
                }
                else {
                   
                    c1 = validateCandidate(25 - game.playables[0], area);
                    c2 = validateCandidate(25 - game.playables[1], area);
                   
                    if (c1 != -1) {
                        cp1 = new candidatePosition();
                        cp1.areaNumber = c1;
                        cp1.playAble[0] = true;
                        cp1.playAble[1] = false;
                        cp1.playAble[2] = false;
                        cp1.playAble[3] = false;

                        game.candidatePositions[0] = cp1;
                        game.areaSelected = area;

                    }

                    if (c2 != -1) {
                        cp2 = new candidatePosition();
                        cp2.areaNumber = c2;
                        cp2.playAble[0] = false;
                        cp2.playAble[1] = true;
                        cp2.playAble[2] = false;
                        cp2.playAble[3] = false;

                        game.candidatePositions[1] = cp2;
                        game.areaSelected = area;
                    }
                    showMovableAreas();

                }

            }
        }
        else {
            return;
        }
    }
}

function showMovableAreas() {
    var ooo = "";
    var par = document.getElementById("playingArea");
    arrows = new Array(4);
    for (sma = 0; sma < 4; sma++) {
        currentObj = game.candidatePositions[sma];
        if (currentObj != null) {

            area = currentObj.areaNumber;
            arrows[sma] = document.createElement("img");
            if (area > 12) {
                arrows[sma].src = "../images/pieces/aub.gif"
            }
            else {
                arrows[sma].src = "../images/pieces/adb.gif"
            }
            arrows[sma].style.visibility = "visible";
            arrows[sma].style.left = game.boardObject.findArrowX(area);
            arrows[sma].style.top = game.boardObject.findArrowY(area);
            arrows[sma].style.width = 40;
            arrows[sma].style.height = 40;
            arrows[sma].id = "arrow" + sma;
            par.appendChild(arrows[sma]);
         
        }
    }
}

function playAbleHavingDeads() {
    var possibleMove = -1;
    var retVal = false;

    if (game.turn == "top") {
        if (game.die1 == game.die2) {
            possibleMove = validateCandidate(game.playables[0], 27);
            if (possibleMove != -1) {
                retVal = true;
            }
            
        }
        else {
            possibleMove = validateCandidate(game.playables[0], 27);
            if (possibleMove != -1) {
                retVal = true;
            }
            possibleMove = validateCandidate(game.playables[1], 27);
            if (possibleMove != -1) {
                retVal = true;
            }
           
        }


    }

    if (game.turn == "buttom") {
        if (game.die1 == game.die2) {
            possibleMove = validateCandidate(25 - game.playables[0], 26);
            if (possibleMove != -1) {
                retVal = true;
            }
        }
        else {
            possibleMove = validateCandidate(25 - game.playables[0], 26);
            if (possibleMove != -1) {
                retVal = true;
            }
            possibleMove = validateCandidate(25 - game.playables[1], 26);
            if (possibleMove != -1) {
                retVal = true;
            }
           
        }
    }
    
    return retVal;
}




function isAllPlayable() {
    
    var iap;
    var possibleMove = -1;
    if (game.turn == "ud") {
        return true;
    }

    for (iap = 1; iap < 25; iap++) {
        if (game.turn == "top") {
            if (game.tpieces[27] != 0) {
                return playAbleHavingDeads();
            }

            if (game.die1 == game.die2) {

                if (game.tpieces[iap] != 0) {
                    possibleMove = validateCandidate(iap + game.playables[0], iap);
                    if (possibleMove != -1) {
                        return true;
                    }
                }
            }

            if (game.die1 != game.die2) {
                if (game.tpieces[iap] != 0) {
                    possibleMove = validateCandidate(iap + game.playables[0], iap);
                    if (possibleMove != -1) {
                        return true;
                    }
                    possibleMove = validateCandidate(iap + game.playables[1], iap);
                    if (possibleMove != -1) {
                        return true;
                    }

                }
            }

        }
        else {

            if (game.bpieces[26] != 0) {
                
                return playAbleHavingDeads();
            }

            if (game.die1 == game.die2) {

                if (game.bpieces[iap] != 0) {
                    possibleMove = validateCandidate(iap - game.playables[0], iap);
                    if (possibleMove != -1) {
                        return true;
                    }
                }
            }

            if (game.die1 != game.die2) {
                if (game.bpieces[iap] != 0) {
                    possibleMove = validateCandidate(iap - game.playables[0], iap);
                    if (possibleMove != -1) {
                        return true;
                    }
                    possibleMove = validateCandidate(iap - game.playables[1], iap);
                    if (possibleMove != -1) {
                        return true;
                    }

                }
            }

        }
    }

    return false;
}


function validateCandidate(area, origin) {
    if (area == origin) {
        return -1;
    }

    if (game.turn == "top") {
       
        if (game.tpieces[27] != 0) {

            if (origin != 27) {
               
                return -1;
            }
            else {

                if (area == 0) {
                    return -1;
                }
                if (area > 6) {
                    return -1;
                }

                if (game.bpieces[area] >= 2) {
                    return -1;
                }
                else {
                    
                    return area;
                }


            }

        }
        if (game.bpieces[area] >= 2) {
            return -1;
        }
        if (area > 24) {
            return canItbeTaken(area, origin);
        }
        return area;

    }
    else {
        
        if (game.bpieces[26] != 0) {

            if (origin != 26) {
                
                return -1;
            }

            else {
                
                if (area < 19) {
                    return -1
                }
                if (area > 24) {
                    return -1;
                }
                if (game.tpieces[area] >= 2) {
                    return -1;
                }
                else {
                    return area;
                }

            }


        }
        if (game.tpieces[area] >= 2) {
            return -1;
        }
        if (area < 1) {
            return canItbeTaken(area, origin);
        }
        return area;
    }
}


function canItbeTaken(area, origin) {
    if (game.turn == "top") {
        if (area == 25) {
            var tsum1 = 0;
            for (an = 19; an < 26; an++) {
                tsum1 = tsum1 + game.tpieces[an];
            }
            if (tsum1 == 15) {
                return 25;
            }
            else {
                return -1;
            }

        }

        else if (area > 25) {
            var tsum2 = 0;
            for (an = origin; an < 26; an++) {
                tsum2 = tsum2 + game.tpieces[an];
            }
            if ((tsum2 == 15) && (origin > 18)) {
                return 25;
            }
            else {
                return -1;
            }

        }

    }
    else {
        var tsum3 = 0;
        if (area == 0) {


            for (an = 6; an > -1; an--) {
                tsum3 = tsum3 + game.bpieces[an];
            }
            
            if (tsum3 == 15) {
                
                return 0;
            }
            else {
             
                return -1;
            }
        }
        else if (area < 0) {
           

            tsum3 = 0;

            for (an = origin; an > -1; an--) {
                tsum3 = tsum3 + game.bpieces[an];
            }
            if ((tsum3 == 15) && (origin < 7)) {
                
                return 0;
            }
            else {
                
                return -1;
            }

        }

    }

}



function areaClick(areaNumber) {
     

    if (game.areaSelected == -1) {
        findCandidateAreas(areaNumber);
    }
    else {
        if (areaNumber == game.areaSelected) {
            unselectArea();
        }
        else {
            movePieces(areaNumber);
        }
    }
}


function unselectArea() {
    clearBoard();
    for (pCounter = 0; pCounter < 4; pCounter++) {
        game.candidatePositions[pCounter] = null;
    }
    game.areaSelected = -1;
    placePieces();

}

function movePieces(area) {
    validClick = false;

    for (mps = 0; mps < 4; mps++) {
        candPos = game.candidatePositions[mps];

        if (candPos != null) {
            
            if (candPos.areaNumber == area) {
                validClick = true;
                targetPos = candPos;
            }
        }
    }

    if (validClick == false) {
        return;
    }
    if (game.turn == "top") {
        clearBoard();
        //....

        game.tpieces[game.areaSelected] = game.tpieces[game.areaSelected] - 1;
        game.tpieces[area] = game.tpieces[area] + 1;
        if (game.bpieces[area] == 1) {
            game.bpieces[area] = 0;
            // I am not sure about 25
            game.bpieces[26] = game.bpieces[26] + 1;

        }
        game.areaSelected = -1;



        placePieces();
    }
    else {
        
        clearBoard();
        game.bpieces[game.areaSelected] = game.bpieces[game.areaSelected] - 1;
        game.bpieces[area] = game.bpieces[area] + 1;
        if (game.tpieces[area] == 1) {
            game.tpieces[area] = 0;

            game.tpieces[27] = game.tpieces[27] + 1;
        }
        game.areaSelected = -1;
        placePieces();
    }
    var playCounter = 0;
    for (playCounter = 0; playCounter < 4; playCounter++) {
        if (targetPos.playAble[playCounter] == true) {

            game.playables[playCounter] = 0;

        }
        game.candidatePositions[playCounter] = null;
    }
    sortPlayAbles();



}


function sortPlayAbles() {
    game.playables.sort();
    game.playables.reverse();
    if (game.playables[0] == 0) {
        (document.getElementById("endTurnButton")).disabled = false;
        
    }
    else if (isAllPlayable() == false) {
        (document.getElementById("endTurnButton")).disabled = false;
        

    }

}


function endTurn() {
    (document.getElementById("endTurnButton")).disabled = true;
    if (game.turn == "top") {

        // commented 2/23/2010        
        //game.turn = "buttom";
    }
    else {
        
        
        recordGamePlay();
        //(document.getElementById("rollButton")).disabled = false;
                
    }
    //
    
 

}

function periodicUpdate() {
    setInterval(ajaxServerCallForUpdate, 4000);
}

function getPlayersInfo(){
getPlayersInfoFromServer()
    
}

function getPlayer1Info(){
    if (player1.username == ""){
    
    }
}

function ajaxServerCallForUpdate() {
    
    if (game.started == false){
         getPlayersInfo();
    }
    
    else if (game.turn == "top") {
        
        getData();
    }
    
    else if (game.turn == "ud"){
    
        // here we need to get the rurn role info from the other player            
        getOtherPlayerRoleInfo(); 
    }
    

}

function getOtherPlayerRoleInfo(){
    var url = 'http://localhost:55631/bghandler.asmx/getOtherPlayerRoleInfo';
    var request = makePOSTRequestForOtherPlayerRoleInfo(url, "");    

}
function makePOSTRequestForOtherPlayerRoleInfo(url, parameters){
    http_request = false;
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            // set type accordingly to anticipated content type
             http_request.overrideMimeType('text/xml');
            //http_request.overrideMimeType('text/html');
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("not good at all..");
            }
        }
    }
    if (!http_request) {
        alert('Cannot create XMLHTTP instance');
        return false;
    }

    http_request.onreadystatechange = processOtherPlayerRoleInfo;
    http_request.open('POST', url, true);
    //http_request.setRequestHeader("Content-Type", "application/json");

    http_request.send(parameters);

}





function processOtherPlayerRoleInfo(){

processSingleDieInfo();

   
////    
////     if (http_request.readyState == 4) {

////        if (http_request.status == 200) {
////        
////           
////            var result = http_request.responseXML
////           
////           
////        
////        
////            res1 = result.getElementsByTagName("string");
////            

////            res2 = res1[0].firstChild.nodeValue;
////           
////           
////          if ((res2 != "0") && (res2 != "-1")) {
////          
////                 
////                document.getElementById("die2").src = "../images/blackdice/" + res2 + ".GIF";
////                document.getElementById("die2").style.visibility = "visible";
////                
////                 
////                player2.turnRoll = parseInt(res2);
////                
////                //alert ("" +  player1.turnRoll);
////                if ((player1.turnRoll != 0) && (player1.turnRoll != -1)) {
////                   //alert("here man " + player1.turnRoll + ";" + player2.turnRoll + game.turn);    
////                  
////                    if (player1.turnRoll > player2.turnRoll) {
////                        // latest point
////                  //      alert("1st");
////                        game.turn = "buttom";
////                        document.getElementById("currentTurn").innerHTML = "Buttom Player";
////                    } 
////                    if (player1.turnRoll < player2.turnRoll){
////                    //    alert("2nd");
////                        game.turn = "top";
////                        
////                        document.getElementById("currentTurn").innerHTML = "Top Player";
////                    }
////                    
////                    if (player1.turnRoll == player2.turnRoll){
////                   
////                    }
////                }
////                else{
////                    document.getElementById("die1").style.visibility = "hidden";
////                }                
////                
////             }           
////           
////         }
////     }    

        

}


function notifyServer(difference) {
  
  //alert (difference);
      var url = 'http://localhost:55631/bms.aspx?mov=' + difference;
    var request = makePOSTRequestToNotifyServer(url, "");    
       
}


function makePOSTRequestToNotifyServer(url, parameters)
{
      http_request = false;
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            // set type accordingly to anticipated content type
             http_request.overrideMimeType('text/xml');
            //http_request.overrideMimeType('text/html');
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("not good at all..");
            }
        }
    }
    if (!http_request) {
        alert('Cannot create XMLHTTP instance');
        return false;
    }

    http_request.onreadystatechange = processNotifyMessage;
    http_request.open('POST', url, true);
    //http_request.setRequestHeader("Content-Type", "application/json");

    http_request.send(parameters);
}


function processNotifyMessage()
{
        // alert("I got here boy");
   if (http_request.readyState == 4) {

        if (http_request.status == 200) {
        
            game.turn = "top";
            document.getElementById("currentTurn").innerHTML = "Top Player";
         } 
    }

}



function persianBoard() {

    var pdiam = 40;
    var xpositions = new Array(28);



    xpositions[6] = 400;
    xpositions[5] = 446;
    xpositions[4] = 492;
    xpositions[3] = 535;
    xpositions[2] = 579;
    xpositions[1] = 625;

    xpositions[0] = 672;

    xpositions[7] = 290;
    xpositions[8] = 245;
    xpositions[9] = 200;
    xpositions[10] = 157;
    xpositions[11] = 112;
    xpositions[12] = 67;



    xpositions[13] = 78;
    xpositions[14] = 123;
    xpositions[15] = 166;
    xpositions[16] = 209;
    xpositions[17] = 250;
    xpositions[18] = 293;

    xpositions[26] = 343;
    xpositions[27] = 343;

    xpositions[19] = 397;
    xpositions[20] = 442;
    xpositions[21] = 484;
    xpositions[22] = 527;
    xpositions[23] = 570;
    xpositions[24] = 614;

    xpositions[25] = 666;

    var ypositions = new Array(28);
    ypositions[6] = 570;
    ypositions[5] = 570;
    ypositions[4] = 570;
    ypositions[3] = 570;
    ypositions[2] = 570;
    ypositions[1] = 570;
    ypositions[0] = 570;

    ypositions[7] = 570;
    ypositions[8] = 570;
    ypositions[9] = 570;
    ypositions[10] = 570;
    ypositions[11] = 570;
    ypositions[12] = 570;

    ypositions[13] = 40;
    ypositions[14] = 40;
    ypositions[15] = 40;
    ypositions[16] = 40;
    ypositions[17] = 40;
    ypositions[18] = 40;

    ypositions[19] = 40;
    ypositions[20] = 40;
    ypositions[21] = 40;
    ypositions[22] = 40;
    ypositions[23] = 40;
    ypositions[24] = 40;
    ypositions[25] = 40;

    ypositions[27] = 40;
    ypositions[26] = 570;
    if (findBrowser() == "IE") {
        for (j2 = 0; j2 < 28; j2++) {
            ypositions[j2] = ypositions[j2] - 10;
            xpositions[j2] = xpositions[j2] - 10;
        }
        xpositions[0] = xpositions[0] - 5;
    }
    this.xpos = xpositions;
    this.ypos = ypositions;
    this.pieceDiameter = pdiam;

    this.bottomPieceSource = "../images/pieces/bluetrans.gif";

    this.topPieceSource = "../images/pieces/redtans2.gif";
    var margins = new Array(28);
    var widths = new Array(28);

    widths[0] = "43";
    margins[0] = "325px 0px 0px 655px";

    widths[1] = "44";
    margins[1] = "325px 0px 0px 611px";

    widths[2] = "44";
    margins[2] = "325px 0px 0px 565px";

    widths[3] = "43";
    margins[3] = "325px 0px 0px 521px";

    widths[4] = "43";
    margins[4] = "325px 0px 0px 477px";

    widths[5] = "43";
    margins[5] = "325px 0px 0px 433px";
    ///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

    widths[6] = "43";
    margins[6] = "325px 0px 0px 389px";

    widths[7] = "43";
    margins[7] = "325px 0px 0px 279px";

    widths[8] = "44";
    margins[8] = "325px 0px 0px 233px";

    widths[9] = "43";
    margins[9] = "325px 0px 0px 190px";

    widths[10] = "43";
    margins[10] = "325px 0px 0px 146px";

    widths[11] = "43";
    margins[11] = "325px 0px 0px 102px";

    widths[12] = "43";
    margins[12] = "325px 0px 0px 59px";


    ///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
    widths[13] = "43";
    margins[13] = "25px 0px 0px 63px";

    widths[14] = "43";
    margins[14] = "25px 0px 0px 108px";

    widths[15] = "42";
    margins[15] = "25px 0px 0px 152px";

    widths[16] = "41";
    margins[16] = "25px 0px 0px 195px";

    widths[17] = "42";
    margins[17] = "25px 0px 0px 237px";

    widths[18] = "42";
    margins[18] = "25px 0px 0px 280px";

    ///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

    widths[19] = "42";
    margins[19] = "25px 0px 0px 384px";

    widths[20] = "42";
    margins[20] = "25px 0px 0px 427px";

    widths[21] = "42";
    margins[21] = "25px 0px 0px 470px";

    widths[22] = "42";
    margins[22] = "25px 0px 0px 513px";

    widths[23] = "44";
    margins[23] = "25px 0px 0px 556px";

    widths[24] = "42";
    margins[24] = "25px 0px 0px 599px";

    ///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

    widths[25] = "42";
    margins[25] = "25px 0px 0px 655px";

    widths[26] = "42";
    margins[26] = "325px 0px 0px 331px";

    widths[27] = "42";
    margins[27] = "25px 0px 0px 330px";



    this.areaMargins = margins;
    this.areaWidths = widths;


    this.calculateTopPosition = function(xIndex, yIndex) {
        if ((xIndex > 12) && (xIndex != 26)) {
            if (yIndex < 6) {
                return this.ypos[xIndex] + (this.pieceDiameter * yIndex);
            }
            else if ((yIndex < 11)) {
                return this.ypos[xIndex] + (this.pieceDiameter * (yIndex - 5)) - 20;
            }
            else {
                return this.ypos[xIndex] + (this.pieceDiameter * (yIndex - 10)) - 10;
            }
        }
        else {
            if (yIndex < 6) {
                return this.ypos[xIndex] - (this.pieceDiameter * yIndex);
            }
            else if ((yIndex < 11)) {
                return this.ypos[xIndex] - (this.pieceDiameter * (yIndex - 5)) + 20;
            }
            else {
                return this.ypos[xIndex] - (this.pieceDiameter * (yIndex - 10)) + 10;
            }
        }
    };

    this.findArrowX = function(xIndex) {
        return this.xpos[xIndex];
    };

    this.findArrowY = function(xIndex) {
        yi1 = game.bpieces[xIndex];
        yi2 = game.tpieces[xIndex];
        if (yi1 >= yi2) {
            if (yi1 > 5) {
                yi = 5;
            }
            else {
                yi = yi1;
            }
        }

        else {
            if (yi2 >= yi1) {
                if (yi2 > 5) {
                    yi = 5;
                }
                else {
                    yi = yi2;
                }

            }
        }
        if (xIndex < 13) {
            return this.calculateTopPosition(xIndex, yi) - 10;
        }
        else {
            return this.calculateTopPosition(xIndex, yi) + 10

        }
    };
}



function selectButtomPiece() {

 

}

function displayButtomPlayerPips(){
    

}
function displayTopPlayerPips(){
    

}



function classicBoard() {
    var pdiam = 43;
    margins = new Array(28);
    widths = new Array(28);

    widths[0] = "45";
    margins[0] = "341px 0px 0px 661px";

    widths[1] = "45";
    margins[1] = "341px 0px 0px 616px";

    widths[2] = "45";
    margins[2] = "341px 0px 0px 568px";

    widths[3] = "45";
    margins[3] = "341px 0px 0px 522px";

    widths[4] = "45";
    margins[4] = "341px 0px 0px 476px";

    widths[5] = "45";
    margins[5] = "341px 0px 0px 430px";
    ///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

    widths[6] = "45";
    margins[6] = "341px 0px 0px 382px";

    widths[7] = "45";
    margins[7] = "341px 0px 0px 280px";

    widths[8] = "45";
    margins[8] = "341px 0px 0px 234px";

    widths[9] = "45";
    margins[9] = "341px 0px 0px 188px";

    widths[10] = "45";
    margins[10] = "341px 0px 0px 142px";

    widths[11] = "45";
    margins[11] = "341px 0px 0px 96px";

    widths[12] = "48";
    margins[12] = "341px 0px 0px 47px";


    ///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
    widths[13] = "46";
    margins[13] = "35px 0px 0px 44px";

    widths[14] = "45";
    margins[14] = "35px 0px 0px 91px";

    widths[15] = "45";
    margins[15] = "35px 0px 0px 137px";

    widths[16] = "45";
    margins[16] = "35px 0px 0px 185px";

    widths[17] = "45";
    margins[17] = "35px 0px 0px 231px";

    widths[18] = "45";
    margins[18] = "35px 0px 0px 277px";

    ///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

    widths[19] = "45";
    margins[19] = "35px 0px 0px 380px";

    widths[20] = "45";
    margins[20] = "35px 0px 0px 426px";

    widths[21] = "45";
    margins[21] = "35px 0px 0px 472px";

    widths[22] = "45";
    margins[22] = "35px 0px 0px 518px";

    widths[23] = "45";
    margins[23] = "35px 0px 0px 564px";

    widths[24] = "45";
    margins[24] = "35px 0px 0px 610px";

    ///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

    widths[25] = "45";
    margins[25] = "35px 0px 0px 656px";

    widths[26] = "45";
    margins[26] = "341px 0px 0px 333px";

    widths[27] = "45";
    margins[27] = "35px 0px 0px 331px";

    this.areaMargins = margins;
    this.areaWidths = widths;

    var xpositions = new Array(28);
    xpositions[6] = 394;
    xpositions[5] = 443;
    xpositions[4] = 489;
    xpositions[3] = 535;
    xpositions[2] = 580;
    xpositions[1] = 628;
    xpositions[0] = 675;

    xpositions[7] = 294;
    xpositions[8] = 246;
    xpositions[9] = 200;
    xpositions[10] = 155;
    xpositions[11] = 109;
    xpositions[12] = 60;



    xpositions[13] = 58;
    xpositions[14] = 106;
    xpositions[15] = 153;
    xpositions[16] = 198;
    xpositions[17] = 244;
    xpositions[18] = 292;


    xpositions[19] = 393;
    xpositions[20] = 439;
    xpositions[21] = 485;
    xpositions[22] = 530;
    xpositions[23] = 576;
    xpositions[24] = 623;
    xpositions[25] = 669;
    xpositions[26] = 394 - 46 - 3;
    xpositions[27] = 394 - 46 - 4;

    var ypositions = new Array(28);
    ypositions[6] = 578;
    ypositions[5] = 578;
    ypositions[4] = 578;
    ypositions[3] = 578;
    ypositions[2] = 578;
    ypositions[1] = 578;
    ypositions[0] = 578;
    ypositions[26] = 578;

    ypositions[7] = 578;
    ypositions[8] = 578;
    ypositions[9] = 578;
    ypositions[10] = 578;
    ypositions[11] = 578;
    ypositions[12] = 578;

    ypositions[13] = 50;
    ypositions[14] = 50;
    ypositions[15] = 50;
    ypositions[16] = 50;
    ypositions[17] = 50;
    ypositions[18] = 50;

    ypositions[19] = 50;
    ypositions[20] = 50;
    ypositions[21] = 50;
    ypositions[22] = 50;
    ypositions[23] = 50;
    ypositions[24] = 50;
    ypositions[25] = 50;
    ypositions[27] = 50;
    if (findBrowser() == "IE") {
        for (j2 = 1; j2 < 25; j2++) {
            ypositions[j2] = ypositions[j2] - 10;
            xpositions[j2] = xpositions[j2] - 10;
        }

    }


    this.xpos = xpositions;
    this.ypos = ypositions;
    this.pieceDiameter = pdiam;

    this.bottomPieceSource = "../images/pieces/bluetrans.gif";

    this.topPieceSource = "../images/pieces/redtans2.gif";


    this.calculateTopPosition = function(xIndex, yIndex) {
        if ((xIndex > 12) && (xIndex != 26)) {
            if (yIndex < 6) {
                return this.ypos[xIndex] + (this.pieceDiameter * yIndex);
            }
            else if ((yIndex < 11)) {
                return this.ypos[xIndex] + (this.pieceDiameter * (yIndex - 5)) - 20;
            }
            else {
                return this.ypos[xIndex] + (this.pieceDiameter * (yIndex - 10)) - 10;
            }
        }
        else {
            if (yIndex < 6) {
                return this.ypos[xIndex] - (this.pieceDiameter * yIndex);
            }
            else if ((yIndex < 11)) {
                return this.ypos[xIndex] - (this.pieceDiameter * (yIndex - 5)) + 20;
            }
            else {
                return this.ypos[xIndex] - (this.pieceDiameter * (yIndex - 10)) + 10;
            }
        }


    };


    this.findArrowX = function(xIndex) {
        return this.xpos[xIndex] + 5;
    };

    this.findArrowY = function(xIndex) {
        if (xIndex < 13) {
            return this.calculateTopPosition(xIndex, 6) - 10;
        }
        else {
            return this.calculateTopPosition(xIndex, 6) + 10

        }
    };
}

function candidatePosition() {
    this.areaNumber = -1;
    this.playAble = new Array(4);
    this.playAble[0] = false;
    this.playAble[1] = false;
    this.playAble[2] = false;
    this.playAble[3] = false;

}

function gameObject() {
    this.seconds = 0;
    this.gameOver = false;
    this.currentBoard = "Persian";
    this.boardObject = new persianBoard();
    this.bpieces = new Array(28);
    this.tpieces = new Array(28);
    this.candidatePositions = new Array(4);
    this.undobpieces = new Array(28);
    this.undotpieces = new Array(28);
    this.started = false;

    this.turn = "ud";
    this.die1 = 0;
    this.die2 = 0;
    this.playables = new Array(4);
    this.playables[0] = 0;
    this.playables[1] = 0;
    this.playables[2] = 0;
    this.playables[3] = 0;

    this.undoplayables = new Array(4);
    this.undoplayables[0] = 0;
    this.undoplayables[1] = 0;
    this.undoplayables[2] = 0;
    this.undoplayables[3] = 0;

    this.areaSelected = -1;
    this.currentBrowser = findBrowser();

    this.records = new ArrayList();

}





function clearBoard() {

    var pNumber = 1;
    

    for (pNumber = 1; pNumber < 28; pNumber++) {
        var topPiece = document.getElementById("tp" + pNumber);
        var bottomPiece = document.getElementById("bp" + pNumber);

        if (topPiece != null) {

            topPiece.style.visibility = "hidden";
            document.getElementById("playingArea").removeChild(topPiece);

        }

        if (bottomPiece != null) {

            document.getElementById("playingArea").removeChild(bottomPiece);

        }
    }

    var anum = 0;
    for (anum = 0; anum < 4; anum++) {
        var arrow = document.getElementById("arrow" + anum);
        if (arrow != null) {
            document.getElementById("playingArea").removeChild(arrow);
        }
    }


}





function placePieces() {


    var clearIt = false;
    var bp1 = new bottomPice();
    clearBoard();
    if (game.currentBoard == "Persian") {
        var thisBoard = new persianBoard();
    }
    else {
        var thisBoard = new classicBoard();
        clearIt = true;
    }

    var bpips = 0;
    var tpips = 0;
    var bimg = new Array(16);
    var timg = new Array(16);
    var i = 6;
    var j = 1;
    var BPN = 1;
    var TPN = 1;

    par = document.getElementById("playingArea");
    for (i = 0; i < 28; i++) {
        if ( i == 26){
            bpips = bpips + (game.bpieces[i] * 25);
        }
        else{
            if ( (i != 27) && (i != 25) ){
                bpips = bpips + (i * game.bpieces[i]);
            }
        }
        
        if (i == 27){
            tpips = tpips + (game.tpieces[i] * 25);
        }
        else{
            if ( (i != 26) && (i != 25) ){
                tpips = tpips + ( (25 - i) * game.tpieces[i]);
            }
        
        }
        
        
        for (j = 0; j < game.bpieces[i]; j++) {

            bimg[BPN] = document.createElement("img");
            bimg[BPN].src = thisBoard.bottomPieceSource;
            bimg[BPN].id = "bp" + BPN;
            bimg[BPN].position = i;
            bimg[BPN].style.visibility = "visible";
            bimg[BPN].style.top = thisBoard.calculateTopPosition(i, j)
            bimg[BPN].style.left = thisBoard.xpos[i];
            bimg[BPN].style.width = thisBoard.pieceDiameter;
            bimg[BPN].style.height = thisBoard.pieceDiameter;
            bimg[BPN].onclick = function() {

                areaClick(this.position);
            }
            par.appendChild(bimg[BPN]);
            BPN = BPN + 1;
        }


        for (j = 0; j < game.tpieces[i]; j++) {

            timg[TPN] = document.createElement("img");
            timg[TPN].src = thisBoard.topPieceSource;
            timg[TPN].position = i;
            timg[TPN].id = "tp" + TPN;
            timg[TPN].style.visibility = "visible";
            timg[TPN].style.top = thisBoard.calculateTopPosition(i, j)
            timg[TPN].style.left = thisBoard.xpos[i];
            timg[TPN].style.width = thisBoard.pieceDiameter;
            timg[TPN].style.height = thisBoard.pieceDiameter;
            timg[TPN].onclick = function() {
                areaClick(this.position);
            }
            par.appendChild(timg[TPN]);
            TPN = TPN + 1;
        }
    }
    
    document.getElementById("buttomPlayerPips").innerHTML = "Pips: " + bpips;
    document.getElementById("topPlayerPips").innerHTML = "Pips: " + tpips;
    
}

function init() {
    var bgWindow = window.open("bg.html", "Backgammon", "height=640,width=900");


    //StartBgGame("Persian");

}






function bgOptions() {
    
    var bgOptionsWindow = window.open("bgOptions.html", "Backgammon Options", "height=300,width=200");



}


function bgOptionsChange() {
    //var board = (document.forms[0].boardType[0].checked) ?
    //"Persian" : "Classic";
    //var tttt = (document.getElementById("boardType")).value
    if ((document.getElementById("boardType")).value != "default") {
        
        changeBGBackground(document.getElementById("boardType").value);
    }
}


function changeBGBackground(choice) {
    pa = document.getElementById("playingArea");
    if (choice == "Persian") {

        pa.style.backgroundImage = "url(../images/bk5v2.gif)";
        game.currentBoard = "Persian";
        game.boardObject = new persianBoard();
        redefineImageAreas();
        placePieces();

    }

    else {
        pa.style.backgroundImage = "url(../images/bk3v2.gif)";
        game.currentBoard = "classic";
        game.boardObject = new classicBoard();
        redefineImageAreas();
        placePieces();
    }

}

function redefineImageAreas() {

    for (ij = 0; ij < 10; ij++) {
        document.getElementById("area0" + ij).style.margin = game.boardObject.areaMargins[ij];
        document.getElementById("area0" + ij).style.width = game.boardObject.areaWidths[ij];
    }

    for (ij = 10; ij < 28; ij++) {
        document.getElementById("area" + ij).style.margin = game.boardObject.areaMargins[ij];
        document.getElementById("area" + ij).style.width = game.boardObject.areaWidths[ij];
    }


}

function isItPlayable() {
    

}



function NotifyServerForLeave(){
    
    var url = 'http://localhost:55631/bghandler.asmx/leaveTable';
    var request = makePOSTRequestToLeave(url, "");    

}

function makePOSTRequestToLeave(url, parameters) {
    http_request = false;
    //alert("gaave nar 8 ");
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            // set type accordingly to anticipated content type
             http_request.overrideMimeType('text/xml');
            //http_request.overrideMimeType('text/html');
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("not good at all..");
            }
        }
    }
    if (!http_request) {
        alert('Cannot create XMLHTTP instance');
        return false;
    }

    http_request.onreadystatechange = processLeave;
    http_request.open('POST', url, true);
    //http_request.setRequestHeader("Content-Type", "application/json");

    http_request.send(parameters);
}


function processLeave(){

   
}



function getSingleDieFromServer(){

    var url = 'http://localhost:55631/bghandler.asmx/getSingleDie';
    var request = makePOSTRequestForSingleDieInfo(url, "");

}



function makePOSTRequestForSingleDieInfo(url, parameters) {
    http_request = false;
    //alert("gaave nar 8 ");
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            // set type accordingly to anticipated content type
             http_request.overrideMimeType('text/xml');
            //http_request.overrideMimeType('text/html');
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("not good at all..");
            }
        }
    }
    if (!http_request) {
        alert('Cannot create XMLHTTP instance');
        return false;
    }

    http_request.onreadystatechange = processSingleDieInfo;
    http_request.open('POST', url, true);
    //http_request.setRequestHeader("Content-Type", "application/json");

    http_request.send(parameters);
}
function closeIt()

{
 
  
 // alert (BrowserDetect.browser);
 // if (BrowserDetect.browser == "Firefox")
 if (1 == 1)
 {
    
    NotifyServerForLeave();
    if (game.started == true){
        alert("You have left an unfinished game, some points will b deducted from you account. ");
    }
    return;
  }
    
   
  return "Are you sure you want to quit?";
  
  
}





function processSingleDieInfo(){
    
    if (http_request.readyState == 4) {

        if (http_request.status == 200) {
        
        //   alert("here");
           // result = http_request.documentElement.childNodes[0].firstChild.tagName
            var result = http_request.responseXML
           
            // document.getElementById('databox').innerHTML = result;
        
        
            res1 = result.getElementsByTagName("string");
           // alert(res1);

            if (res1 != null && res1[0] != null && res1[0].firstChild != null) {
                res2 = res1[0].firstChild.nodeValue;
            }

            else {
                res2 = "";
            }
            
            if (res2 == ""){
                return;
            }
            
              if ( res2 == "boot_option") {
                
                if (document.getElementById("forceleave").style.visibility == "hidden"){
                    document.getElementById("forceleave").style.visibility = "visible";
                    alert ("Other Player has delayed for too long.If you want to boot him click on Force Leave Link");
                }
             }
             else if (res2 == "user_booted"){
                game.started = false;
                alert ("OTHER PLAYER HAS BEEN BOOTED.");
             
             }
             else if (res2 == "you_are_evicted"){
                game.started = false;
                alert("YOU HAVE BEEN BOOTED.");
                window.close();
             }
            
            
            else{
             
            // document.getElementById('databox').innerHTML = result;
            //alert(res2);
             var MyDiceInfoArray = res2.split(";")    
            
        var d1 = MyDiceInfoArray[0];
        var d2 = MyDiceInfoArray[1];
        
        if ((d1 != "0") && (d1 != "-1")){
            document.getElementById("die1").src = "../images/blackdice/" + d1 + ".GIF";
            document.getElementById("die1").style.visibility = "visible"; 
            player1.turnRoll = parseInt(d1);       
        }
        if ((d2 != "0") && (d2 != "-1")){
            document.getElementById("die2").src = "../images/blackdice/" + d2 + ".GIF";        
            document.getElementById("die2").style.visibility = "visible"; 
            player2.turnRoll = parseInt(d2);
            document.getElementById("forceleave").style.visibility = "hidden";
        }
        
        //document.getElementById("die2").src = "../images/blackdice/" + d2 + ".GIF";
        
        //    document.getElementById("die1").src = "../images/blackdice/" + res2 + ".GIF";
            
            
            /////
            //alert("at this point !!");            
          if ((player2.turnRoll != 0) && (player2.turnRoll != -1)) {
            if ((player1.turnRoll != 0) && (player1.turnRoll != -1)) {
          
                    
                    //document.getElementById("die2").style.visibility = "visible";
                    if ((player1.turnRoll) > (player2.turnRoll)) {
                        // latest point2
                        document.getElementById("currentTurn").innerHTML = "Buttom Player";              
                        game.turn = "buttom";
                    } 
                    if ((player1.turnRoll) < (player2.turnRoll)){
                        document.getElementById("currentTurn").innerHTML = "Top Player";
                        game.turn = "top";
                    }
                    
                    if ((player1.turnRoll) == (player2.turnRoll)){
                        //game.turn = "ud";
                       // player1.turnRoll = 0;
                       // player2.turnRoll = 0;
                       // document.getElementById("die1").style.visibility = "visible";
                        //document.getElementById("die2").style.visibility = "visible";
                    }
                  }
                }
                else{
                  if ((player2.turnRoll == 0) || (player2.turnRoll == -1)) {
                    document.getElementById("die2").style.visibility = "hidden";
                  }
                   
                   if ((player1.turnRoll == 0) || (player1.turnRoll == -1)) {
                    document.getElementById("die1").style.visibility = "hidden";
                  } 
                    
                }
            
            
            
            
            /////
            
            
            }      
           
         }
     }    

}



function getDoubleDiceFromServer(){

    var url = 'http://localhost:55631/bghandler.asmx/getDoubleDice';
    var request = makePOSTRequestForDoubleDice(url, "");

}




function makePOSTRequestForDoubleDice(url, parameters) {
    http_request = false;
    //alert("gaave nar 8 ");
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            // set type accordingly to anticipated content type
             http_request.overrideMimeType('text/xml');
            //http_request.overrideMimeType('text/html');
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("not good at all..");
            }
        }
    }
    if (!http_request) {
        alert('Cannot create XMLHTTP instance');
        return false;
    }

    http_request.onreadystatechange = processDoubleDice;
    http_request.open('POST', url, true);
    //http_request.setRequestHeader("Content-Type", "application/json");

    http_request.send(parameters);
}



function processDoubleDice(){
    



    if (http_request.readyState == 4) {

        if (http_request.status == 200) {
        
        //   alert("here");
           // result = http_request.documentElement.childNodes[0].firstChild.tagName
            var result = http_request.responseXML
           
            // document.getElementById('databox').innerHTML = result;
        
        
            res1 = result.getElementsByTagName("string");
           // alert(res1);

            if (res1 != null && res1[0] != null && res1[0].firstChild != null) {
                res2 = res1[0].firstChild.nodeValue;
            }

            else {
                res2 = "";
            }
            
            if (res2 == ""){
                return;
            }
            // document.getElementById('databox').innerHTML = result;
            
           
            var MyDiceInfoArray = res2.split(";")    
            
        var d1 = MyDiceInfoArray[0];
        var d2 = MyDiceInfoArray[1];
        document.getElementById("die1").src = "../images/blackdice/" + d1 + ".GIF";
        document.getElementById("die2").src = "../images/blackdice/" + d2 + ".GIF";
        game.die1 = d1;
        game.die2 = d2;

        for (j3 = 0; j3 < 28; j3++) {
            game.undobpieces[j3] = game.bpieces[j3];
            game.undotpieces[j3] = game.tpieces[j3];
        }

        if (d1 == d2) {
            game.playables[0] = d1;
            game.playables[1] = d1;
            game.playables[2] = d1;
            game.playables[3] = d1;
        }
        else {
            game.playables[0] = d1;
            game.playables[1] = d2;
            game.playables[2] = 0;
            game.playables[3] = 0;
        }
        for (j5 = 0; j5 < 4; j5++) {
            game.undoplayables[j5] = game.playables[j5];
        }
        (document.getElementById("rollButton")).disabled = true;
        if (isAllPlayable() == false) {
            
            (document.getElementById("endTurnButton")).disabled = false;
        } 
            
            
            
            
            
            
            
            
            
            
            
           
            
            
                  
           
         }
     }    

}




function rollDice() {

    if (game.turn == "ud") {
      if (game.started == true){  
        if (player1.turnRoll == 0) {
              //var d1 = Math.floor((Math.random() * 6) + 1);
              //document.getElementById("die1").src = "../images/blackdice/" + d1 + ".GIF";
              //document.getElementById("die2").style.visibility = "hidden";
              //player1.turnRoll = d1;
              getSingleDieFromServer();
              
          }
        }
    
//        if ((player1.turnRoll == 0) && (player2.turnRoll == 0)) {
//            
//            var d1 = Math.floor((Math.random() * 6) + 1);
//            document.getElementById("die1").src = "../images/blackdice/" + d1 + ".GIF";
//            document.getElementById("die2").style.visibility = "hidden";
//            player1.turnRoll = d1;
//        }

//        else if ((player1.turnRoll != 0) && (player2.turnRoll == 0)) {
//            
//            var d2 = Math.floor((Math.random() * 6) + 1);
//            document.getElementById("die2").src = "../images/blackdice/" + d2 + ".GIF";
//            document.getElementById("die2").style.visibility = "visible";
//            player2.turnRoll = d2;
//            if (player2.turnRoll > player1.turnRoll) {
//                game.turn = "top";
//                alert("player2 won the turn ");
//            }
//            else if (player2.turnRoll < player1.turnRoll) {
//                game.turn = "buttom";
//                alert("player1 won the turn ");
//            }
//            else if (player2.turnRoll == player1.turnRoll) {
//                alert("nobody won.Tie!!");
//                player2.turnRoll = 0;
//                player1.turnRoll = 0;
//            }
//        }
    }
    else if(game.turn == "buttom") {
    
        
        
        // apparently logic should be chamged here     
        (document.getElementById("endTurnButton")).disabled = true;
        for (j4 = 0; j4 < 4; j4++) {
            game.candidatePositions[j4] = null;
        }
        
        
        getDoubleDiceFromServer();
//        var d1 = Math.floor((Math.random() * 6) + 1);
//        var d2 = Math.floor((Math.random() * 6) + 1);
//        document.getElementById("die1").src = "../images/blackdice/" + d1 + ".GIF";
//        document.getElementById("die2").src = "../images/blackdice/" + d2 + ".GIF";
//        game.die1 = d1;
//        game.die2 = d2;

//        for (j3 = 0; j3 < 28; j3++) {
//            game.undobpieces[j3] = game.bpieces[j3];
//            game.undotpieces[j3] = game.tpieces[j3];
//        }

//        if (d1 == d2) {
//            game.playables[0] = d1;
//            game.playables[1] = d1;
//            game.playables[2] = d1;
//            game.playables[3] = d1;
//        }
//        else {
//            game.playables[0] = d1;
//            game.playables[1] = d2;
//            game.playables[2] = 0;
//            game.playables[3] = 0;
//        }
//        for (j5 = 0; j5 < 4; j5++) {
//           game.undoplayables[j5] = game.playables[j5];
//        }
//        (document.getElementById("rollButton")).disabled = true;
//        if (isAllPlayable() == false) {
//            
//            (document.getElementById("endTurnButton")).disabled = false;
//        }
    }
}
 
function undoTurn() {
  if (game.turn == "buttom"){
    for (j4 = 0; j4 < 4; j4++) {
        game.candidatePositions[j4] = null;
    }
    for (j5 = 0; j5 < 4; j5++) {
        game.playables[j5] = game.undoplayables[j5];
    }

    for (j3 = 0; j3 < 28; j3++) {
        game.bpieces[j3] = game.undobpieces[j3];
        game.tpieces[j3] = game.undotpieces[j3];
    }
    game.areaSelected = -1;
    clearBoard();
    placePieces();
    (document.getElementById("endTurnButton")).disabled = true;

    if (isAllPlayable() == false) {
        (document.getElementById("endTurnButton")).disabled = false;
    }
  }
}


function recordGamePlay() {
    
    var difference =  game.die1 + "_" + game.die2 ;
    for (rgp = 0; rgp < 28; rgp++) {
        if (game.tpieces[rgp] != game.undotpieces[rgp]) {
            difference =   difference + "_" + "t_" + rgp + "_" +
            game.tpieces[rgp] ;
        }
        if (game.bpieces[rgp] != game.undobpieces[rgp]) {
            difference =   difference + "_" + "b_" + rgp + "_" +
            game.bpieces[rgp] ;
        }
    }
    difference = difference;
    (game.records).add(difference);

    if (game.turn == "buttom") {
        notifyServer(difference);
    }

//    translateGamePlay(difference);
    
}

function translateGamePlay(thisPlay) {
    var dicePart = thisPlay.substring(0, thisPlay.indexOf(")") + 1);
    var playPart = thisPlay.substring(thisPlay.indexOf(")") + 1, thisPlay.length);
    //tokenizing playpart
    var playToken = "";
    var token = "";
    var working = "";
  
    while (playPart.length != 0) {
        working = playPart;
        
        token = working.substring(0, working.indexOf(";"));
        playPart = playPart.substring(playPart.indexOf(";") + 1, playPart.length);
        translateMove(token);
    }
}


function translateMove(token) {
    //alert("token is " + token);
    var movement = "";
    var movementLocation = "";

    var finalNumber = "";
    if (token.charAt(0) == 't') {
        movement = token.substring(2, token.length);
        movementLocation = movement.substring(0, movement.indexOf(":"))
        finalNumber = movement.substring(movement.indexOf(":"), movement.length);
        
    }
    else if (token.charAt(0) == 'b') {

        movement = token.substring(2, token.length);
        movementLocation = movement.substring(0, movement.indexOf(":"))
        finalNumber = movement.substring(movement.indexOf(":"), movement.length);
        
    }

}

////////////////////////////////////////////////////////////////////////




function makePOSTRequestForPlayersInfo(url, parameters) {
    http_request = false;
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            // set type accordingly to anticipated content type
             http_request.overrideMimeType('text/xml');
            //http_request.overrideMimeType('text/html');
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("not good at all..");
            }
        }
    }
    if (!http_request) {
        alert('Cannot create XMLHTTP instance');
        return false;
    }

    http_request.onreadystatechange = processPlayersInfo;
    http_request.open('POST', url, true);
    //http_request.setRequestHeader("Content-Type", "application/json");

    http_request.send(parameters);
}


function makePOSTRequestForOtherPlayerPlay(url, parameters) {
    http_request = false;
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            // set type accordingly to anticipated content type
             http_request.overrideMimeType('text/xml');
            //http_request.overrideMimeType('text/html');
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("not good at all..");
            }
        }
    }
    if (!http_request) {
        alert('Cannot create XMLHTTP instance');
        return false;
    }
    // gaaave nar
    http_request.onreadystatechange = processOtherPlayerPlay;
    http_request.open('POST', url, true);
    //http_request.setRequestHeader("Content-Type", "application/json");

    http_request.send(parameters);
}







function makePOSTRequest(url, parameters) {
    http_request = false;
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            // set type accordingly to anticipated content type
             http_request.overrideMimeType('text/xml');
            //http_request.overrideMimeType('text/html');
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("not good at all..");
            }
        }
    }
    if (!http_request) {
        alert('Cannot create XMLHTTP instance');
        return false;
    }

    http_request.onreadystatechange = confirmResponse;
    http_request.open('POST', url, true);
    //http_request.setRequestHeader("Content-Type", "application/json");

    http_request.send(parameters);
}




function notifyServerForGameStart(){
    var url = 'http://localhost:55631/bghandler.asmx/gameStart';
    var request = makePOSTRequest(url, "");

}

function getData() {
    
    var url = 'http://localhost:55631/bghandler.asmx/getOtherPlayerPlay';
    var request = makePOSTRequestForOtherPlayerPlay(url, "");        
}


function getPlayersInfoFromServer(){
    var url = 'http://localhost:55631/bghandler.asmx/getPlayersInfo';
    var request = makePOSTRequestForPlayersInfo(url, "");
}

function evictOtherPlayer(){
    var url = 'http://localhost:55631/bghandler.asmx/forceLeave';
    var request = makePOSTRequestToEvictPlayer(url, "");
}


function makePOSTRequestToEvictPlayer(url, parameters) {
    http_request = false;
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            // set type accordingly to anticipated content type
             http_request.overrideMimeType('text/xml');
            //http_request.overrideMimeType('text/html');
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("not good at all..");
            }
        }
    }
    if (!http_request) {
        alert('Cannot create XMLHTTP instance');
        return false;
    }

    http_request.onreadystatechange = processEvictPlayer;
    http_request.open('POST', url, true);
    //http_request.setRequestHeader("Content-Type", "application/json");

    http_request.send(parameters);
}


function processEvictPlayer(){
    if (http_request.readyState == 4) {

        if (http_request.status == 200) {
            alert ("Other player has been booted successfully.");
            StartBgGame(game.currentBoard);

        }
    }

}


function processPlayersInfo(playersInfo){


if (http_request.readyState == 4) {

        if (http_request.status == 200) {
        
           // result = http_request.documentElement.childNodes[0].firstChild.tagName
            var result = http_request.responseXML
            // document.getElementById('databox').innerHTML = result;
        
        
            res1 = result.getElementsByTagName("string");

            if (res1 != null && res1[0] != null && res1[0].firstChild != null) {
                res2 = res1[0].firstChild.nodeValue;
            }

            else {
                res2 = "";
            }
            
                      
            // the processing of results goes here 
           
            if (res2 == "user_booted"){
            
                alert("You have been booted!");
                
                window.close();
                return;
            }            
            
            var MyPlayerInfoArray = res2.split(";");
            
            var p1 = MyPlayerInfoArray[0].substring(3,MyPlayerInfoArray[0].length)
            var p2 = MyPlayerInfoArray[1].substring(3,MyPlayerInfoArray[1].length)
            var pnnn = MyPlayerInfoArray[2].substring(4,MyPlayerInfoArray[2].length)
            var p1Started = MyPlayerInfoArray[3].substring(4,MyPlayerInfoArray[3].length)
            var p2Started = MyPlayerInfoArray[4].substring(4,MyPlayerInfoArray[4].length)
            
            //alert(p1Started + " " + p2Started);
            var bothStarted = false;
            if ((p1Started == "True") && (p2Started == "True"))
            {
               // alert("initializing");
                bothStarted = true;
                game.started = true;
                document.getElementById("currentTurn").innerHTML = "Undetermined";
                document.getElementById("forceleave").style.visibility = "hidden";
            }
            
            
            
            if (pnnn == "1"){
                document.getElementById("pl1").innerHTML = p1                            
                document.getElementById("pl2").innerHTML = p2
                if (game.started == false){
                   document.getElementById("forceleave").style.visibility = "visible";
                }
            }
            else{
                document.getElementById("pl1").innerHTML = p2                            
                document.getElementById("pl2").innerHTML = p1
                document.getElementById("forceleave").style.visibility = "hidden";                
            }
            
            //
            
            //  var p2 = res2.substring(res2.indexOf(";")+ 4,res2.indexOf(";?"));
            
            // var thispp =  res2.substring(res2.indexOf(";?")+ 5 ,res2.length);
            // alert(" gaave nare 5 p2 " + p2 + " ;p1=" + p1 + " this=" + thispp);
            //       
            if ((p1 != "None") && (p2 != "None")) {
               if (bothStarted == false){  
                 document.getElementById("btnStartGame").style.visibility="visible";     
               }
               else{
                 document.getElementById("btnStartGame").style.visibility="hidden";
               }
               
            } 
            else{
                document.getElementById("btnStartGame").style.visibility="hidden";
            }
            
        } else {
            alert('There was a problem with the request.');
        }
    }
}



function processOtherPlayerPlay(){

     if (http_request.readyState == 4) {
        if (http_request.status == 200) {
           // result = http_request.documentElement.childNodes[0].firstChild.tagName
                       
            var result = http_request.responseXML
            // document.getElementById('databox').innerHTML = result;
            
            
            res1 = result.getElementsByTagName("string");
            if (res1 != null && res1[0] != null && res1[0].firstChild != null) {
                res2 = res1[0].firstChild.nodeValue;
            }

            else {
                res2 = "";
            }
            
            
            // the processing of results goes here 
            
           // alert("***!" + res2);                         
         
         if (res2 != ""){   
            if ( res2 == "boot_option") {
                
                if (document.getElementById("forceleave").style.visibility == "hidden"){
                    document.getElementById("forceleave").style.visibility = "visible";
                    alert ("Other Player has delayed for too long.If you want to boot him click on Force Leave Link");
                }
                
                
                
            }
            
            else if ( res2 == "user_booted") {
                alert ("Other player has been booted.");
                game.started = false;
                StartBgGame(game.currentBoard);
                
            }
            
            else if (res2 == "you_are_evicted"){
                alert ("You have been evicted.");
                window.close();
            
            }
            
            else if (res2.charAt(0) == '*'){
                placePiecesOnMessage(res2);
            }
            else{
                placeDiceOnMessage(res2);
            }
            }
   
        } else {
            alert('There was a problem with the request.');
        }
    }

}


function placePiecesOnMessage(message){
    
    document.getElementById("forceleave").style.visibility = "hidden";
    var OPMArray = message.split("_");
    document.getElementById("die1").src = "../images/blackdice/" + OPMArray[1] + ".GIF";      
    document.getElementById("die2").src = "../images/blackdice/" + OPMArray[2] + ".GIF"; 
    
    for (jj4 = 3; jj4 < OPMArray.length; jj4++) {
         
         if (OPMArray[jj4] == "b"){
            game.bpieces[parseInt(OPMArray[jj4 + 1])] = parseInt(OPMArray[jj4 + 2]);
         }
         
         if (OPMArray[jj4] == "t"){
            game.tpieces[parseInt(OPMArray[jj4 + 1])] = parseInt(OPMArray[jj4 + 2]);
         }
         
    }
    
    placePieces();
    for (j3 = 0; j3 < 28; j3++) {
            game.undobpieces[j3] = game.bpieces[j3];
            game.undotpieces[j3] = game.tpieces[j3];
    }
    game.turn = "buttom";
    document.getElementById("currentTurn").innerHTML = "Buttom Player";
    (document.getElementById("rollButton")).disabled = false;
    
}

function placeDiceOnMessage(message){
     var OPMArray = message.split("_");     
     document.getElementById("die1").src = "../images/blackdice/" + OPMArray[0] + ".GIF";   
     document.getElementById("die2").src = "../images/blackdice/" + OPMArray[1] + ".GIF"; 
    
     
}






function confirmResponse() {

    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
           // result = http_request.documentElement.childNodes[0].firstChild.tagName
                       
            var result = http_request.responseXML
            // document.getElementById('databox').innerHTML = result;
            
            
            res1 = result.getElementsByTagName("string");
            
            if (res1 != null && res1[0] != null && res1[0].firstChild != null) {
                res2 = res1[0].firstChild.nodeValue;
            }

            else {
                res2 = "";
            }
            
            
            // the processing of results goes here 
            
            //alert(res2);                         
   
        } else {
            alert('There was a problem with the request.');
        }
    }
}

















////////////////////////////////////////////////////////////////////////////
function ArrayList() {
    this.array = new Array();
    this.add = function(obj) {
        this.array[this.array.length] = obj;
    }
    this.iterator = function() {
        return new Iterator(this)
    }
    this.length = function() {
        return this.array.length;
    }
    this.get = function(index) {
        return this.array[index];
    }
    this.addAll = function(obj) {
        if (obj instanceof Array) {
            for (var i = 0; i < obj.length; i++) {
                this.add(obj[i]);
            }
        } else if (obj instanceof ArrayList) {
            for (var i = 0; i < obj.length(); i++) {
                this.add(obj.get(i));
            }
        }
    }
}



function Iterator(arrayList) {
    this.arrayList;
    this.index = 0;
    this.hasNext = function() {
        return this.index < this.arrayList.length();
    }
    this.next = function() {
        return this.arrayList.get(index++);
    }
}


var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();
