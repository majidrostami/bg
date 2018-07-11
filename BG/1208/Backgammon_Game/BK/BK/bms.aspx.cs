using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;



namespace BK
{
    public partial class bms : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {

                if (Session["sittingTable"] == null)
                {
                    return ;
                }

                if (Session["sittingTable"].ToString() == "")
                {
                    return ;
                }

                string userName = ((BK.User)Session["userInfo"]).EMail;
                string tnum = Session["sittingTable"].ToString();
                int tn = int.Parse(tnum);
                Table thisTable = ((List<Table>)(Application["bgTables"]))[tn];

                int playernumber = 0;
                if (thisTable.PlayerOne == userName)
                {
                    playernumber = 1;
                    if (thisTable.Turn != 1)
                    {
                        return;
                    }

                    if (thisTable.P1Rolled == false)
                    {
                        return;
                    }

                }
                else if (thisTable.PlayerTwo == userName)
                {
                    playernumber = 2;
                    if (thisTable.Turn != 2)
                    {
                        return;
                    }

                    if (thisTable.P2Rolled == false)
                    {
                        return;
                    }

                }
                else
                {
                    return;
                }


                string movement = Page.Request.QueryString["mov"];
                string[] words = movement.Split('_');

                int d1 = int.Parse(words[0]);
                int d2 = int.Parse(words[1]);

                string reverseMov = words[0] + "_" + words[1];


                // todo: some kind of validation must be done here
                for (int i = 2; i < words.Length;i++ )
                {

                    
                        if (words[i] == "b")
                        {
                            reverseMov = reverseMov + "_" + "t";
                        }
                        else if (words[i] == "t")
                        {
                            reverseMov = reverseMov + "_" + "b";
                        }
                        else
                        {

                            if (words[i - 1] == "b" || words[i - 1] == "t")
                            {

                                int nn = 25 - int.Parse(words[i]);
                                if (nn == -2)
                                {
                                    nn = 26;
                                }
                                if (nn == -1)
                                {
                                    nn = 27;
                                }    

                                reverseMov = reverseMov + "_" + nn.ToString();
                            }
                            else
                            {
                                reverseMov = reverseMov + "_" + words[i];
                                
                            }
                        }

                    


                    // todo: some kind of validation should be done here so people can't cheat using javascript console

                    if ((words[i] == "b"))
                    {
                        if (playernumber == 1)
                        {
                            thisTable.setP1Piece(int.Parse(words[i + 1]), int.Parse(words[i + 2]));
                        }
                        else
                        {
                            

                            thisTable.setP2Piece(25 - int.Parse(words[i + 1]), int.Parse(words[i + 2]));
                        }
                    }

                    if ((words[i] == "t"))
                    {
                        if (playernumber == 1)
                        {
                            thisTable.setP2Piece(int.Parse(words[i + 1]), int.Parse(words[i + 2]));
                        }
                        else
                        {
                            thisTable.setP1Piece(25 - int.Parse(words[i + 1]), int.Parse(words[i + 2]));
                        }
                    }
                }
                // representing the winner 
                short winnerNum = 0;

                // todo: calulate the pips for both players and determine if there is a winner here
                if (thisTable.isPlayer1Winner())
                    winnerNum = 1;
                else if (thisTable.isPlayer2Winner())
                    winnerNum = 2;

                if (winnerNum != 0)
                {
                    thisTable.RecordGameScore(winnerNum);    
                }
                    // recording the move
                    thisTable.LastMove = reverseMov;
                thisTable.LastUpdateTime = System.DateTime.Now;
                thisTable.LastMoveTime = System.DateTime.Now;
                // todo: not a bad idea to record it in a que to have the game history
                if (thisTable.Turn == 0)
                {
                    return;
                }
                if (thisTable.Turn == 1)
                {
                    thisTable.Turn = 2;
                    thisTable.P1LastUpdateTime = System.DateTime.Now;
                    thisTable.P1LastMoveTime = System.DateTime.Now;
                    thisTable.P2Rolled = false;

                }
                else
                {
                    thisTable.Turn = 1;
                    thisTable.P2LastUpdateTime = System.DateTime.Now;
                    thisTable.P2LastMoveTime = System.DateTime.Now;
                    thisTable.P1Rolled = false;

                }



            }

            catch
            {
                return;
            }

        }
    }
}
