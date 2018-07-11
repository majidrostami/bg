using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;



namespace BK
{
    public class Table
    {

        // after waiting this amount time user will be booted 
        public const int MAXIMUM_WAIT_FOR_PLAY = 3;
        // other player would be able to boot the player after this time 
        public const int MAXIMUM_LEGAL_WAIT_FOR_PLAY = 2; 
        public const int MAXIMUM_IDLE_TIME =  30;
        public const string BOOT_OPTION_RESPONSE = "boot_option";
        public const string BOOT_RESPONSE = "user_booted";
        public const string EVICTED_RESPONSE = "you_are_evicted";

        //tod0: Calculation of Doubles
        private int p1Doubles;

        public int P1Doubles
        {
            get { return p1Doubles; }
            set { p1Doubles = value; }
        }
        private int p2Doubles;

        public int P2Doubles
        {
            get { return p2Doubles; }
            set { p2Doubles = value; }
        } 


        
        private DateTime lastUpdateTime;

        public DateTime LastUpdateTime
        {
            get { return lastUpdateTime; }
            set { lastUpdateTime = value; }
        }


        private DateTime p1LastUpdateTime;

        public DateTime P1LastUpdateTime
        {
            get { return p1LastUpdateTime; }
            set { p1LastUpdateTime = value; }
        }
        private DateTime p2LastUpdateTime;

        public DateTime P2LastUpdateTime
        {
            get { return p2LastUpdateTime; }
            set { p2LastUpdateTime = value; }
        }


        private string lastMove;

        private DateTime lastMoveTime;

        private DateTime p1LastMoveTime;

        public DateTime P1LastMoveTime
        {
            get { return p1LastMoveTime; }
            set { p1LastMoveTime = value; }
        }
        private DateTime p2LastMoveTime;

        public DateTime P2LastMoveTime
        {
            get { return p2LastMoveTime; }
            set { p2LastMoveTime = value; }
        }

       

        public DateTime LastMoveTime
        {
            get { return lastMoveTime; }
            set { lastMoveTime = value; }
        }


        public void initializeTable(){

            this.Die1 = 0;
            this.Die2 = 0;
            this.P1Started = false;
            this.P2Started = false;
            this.P1Rolled = false;
            this.P2Rolled = false;
            this.P2TurnRole = 0;
            this.P2TurnRole = 0;
            this.Turn = 0;
            this.GameStarted = false;
            this.LastMove = "";
            placeAllPieces();  

        }




        public string LastMove
        {
            get { return lastMove; }
            set { lastMove = value; }
        }

        public Table()
        {
            p1Pieces = new int[28];
            p2Pieces = new int[28];
        }
        
        
        private int[] p1Pieces;

        private int[] p2Pieces;


        public int getP1Pips()
        {
            int retVal = 0;
            for (int idx = 0; idx < 26; idx++)
            {
                retVal = retVal + (idx * this.p1Pieces[idx]);
            }
            retVal = retVal + (25 * this.p1Pieces[26]);
            return retVal;
        }



        public int getP2Pips()
        {
            int retVal = 0;
            for (int idx = 25; idx > 0; idx--)
            {
                retVal = retVal + ((25-idx) * this.p2Pieces[idx]);
            }
            retVal = retVal + (25 * this.p2Pieces[27]);
            return retVal;
        }



        public bool RecordGameScore(short winner)
        {
            int pipsAtEnd = 0;
            if (winner == 1) {
                pipsAtEnd = getP2Pips();
            }
           
            if ( winner == 2) {
                pipsAtEnd = getP1Pips();
            }
            return DBInterface.InsertGameRecord(this.PlayerOne,this.PlayerTwo,winner,false, P1Doubles,P2Doubles,pipsAtEnd,1,2,GameStartTime,System.DateTime.Now,0);
        }

        
        public void setP1Piece(int position, int number){
            try
            {
                if ((position < 29) && (position > -1))
                {
                    p1Pieces[position] = number;
                } 

            }
            catch
            {

            }

        }

        public bool isPlayer1Winner()
        {
            if (this != null && this.p1Pieces != null && this.p1Pieces[0] != null)
                return (this.p1Pieces[0] == 15);
            else
                return false;
        }

        public bool isPlayer2Winner()
        {
            if (this != null && this.p1Pieces != null && this.p1Pieces[25] != null)
                return (this.p2Pieces[25] == 15);
            else
                return false;
        }


        public void placeAllPieces()
        {

            for (int iii = 0; iii < 28; iii++)
            {
                this.setP1Piece(iii, 0);
                this.setP2Piece(iii, 0);
            }

            this.setP1Piece(6, 5);
            this.setP1Piece(8, 3);
            this.setP1Piece(13, 5);
            this.setP1Piece(24, 2);

            this.setP1Piece(19, 5);
            this.setP1Piece(17, 3);


            this.setP1Piece(12, 5);
            this.setP1Piece(1, 2);

        }

        public void setP2Piece(int position, int number)
        {
            try
            {
                if ((position < 29) && (position > -1))
                {
                    p2Pieces[position] = number;
                }

            }
            catch
            {

            }
        }

        private int p1TurnRole = -1;
        public int P1TurnRole
        {
            get { return p1TurnRole; }
            set { p1TurnRole = value; }
        }


        private bool p1Rolled;

        public bool P1Rolled
        {
            get { return p1Rolled; }
            set { p1Rolled = value; }
        }

        private bool p2Rolled;

        public bool P2Rolled
        {
            get { return p2Rolled; }
            set { p2Rolled = value; }
        }
        
        private int p2TurnRole = -1;

        public int P2TurnRole
        {
            get { return p2TurnRole; }
            set { p2TurnRole = value; }
        }
        
        
        private string status;

        public string Status
        {
            get { return status; }
            set { status = value; }
        }

        
        
        private int turn = 0;

        public int Turn
        {
            get { return turn; }
            set { turn = value; }
        }

        
        private int tableNumber;

        public int TableNumber
        {
            get { return tableNumber; }
            set { tableNumber = value; }
        }

        private bool taken;

        public bool Taken
        {
            get { return taken; }
            set { taken = value; }
        }

        private string playerOne;

        public string PlayerOne
        {
            get { return playerOne; }
            set { playerOne = value; }
        }


        private string playerTwo;

        public string PlayerTwo
        {
            get { return playerTwo; }
            set { playerTwo = value; }
        }

        private bool gameStarted;

        public bool GameStarted
        {
            get { return gameStarted; }
            set { gameStarted = value; }
        }

        private DateTime gameStartTime;

        public DateTime GameStartTime
        {
            get { return gameStartTime; }
            set { gameStartTime = value; }
        }


        private bool p1Started;

        public bool P1Started
        {
            get { return p1Started; }
            set { p1Started = value; }
        }

        private bool p2Started;

        public bool P2Started
        {
            get { return p2Started; }
            set { p2Started = value; }
        }

        private int die1;

        public int Die1
        {
            get { return die1; }
            set { die1 = value; }
        }

        private int die2;

        public int Die2
        {
            get { return die2; }
            set { die2 = value; }
        }

        public void evictPlayer(string playername){
            if (this.playerOne == playername)
            {
                this.playerOne = this.PlayerTwo;
                this.PlayerTwo = "None";
                this.gameStarted = false;
                this.lastUpdateTime = System.DateTime.Now;
                this.initializeTable();

            }
            else
            {
                this.PlayerTwo = "None";
                this.gameStarted = false;
                this.lastUpdateTime = System.DateTime.Now;
                this.initializeTable();



            }
        }

    }
}
