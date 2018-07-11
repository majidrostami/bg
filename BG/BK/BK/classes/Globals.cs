using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BK
{
    public class Globals
    {
        
        public static List<Table> Initialize(){
            tables = new List<Table>();
            Table working = null;
            
            for (int i = 0; i < 10; i++)
            {
                working = new Table();
                working.TableNumber = i;
                working.Taken = false;
                working.PlayerOne = "None";
                working.PlayerTwo = "None";

                tables.Add(working);
            }

            return tables;

        }

        private static List<Table> tables;
    
        public static Table getTable(int index)
        {
            return tables.ElementAt(index);
        }




    }
}
