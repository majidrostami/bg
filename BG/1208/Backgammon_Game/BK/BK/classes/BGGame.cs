using System;
using System.Data;
using System.Configuration;
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
    public class BGGame
    {
        private int tableNumber;

        public int TableNumber
        {
            get { return tableNumber; }
            set { tableNumber = value; }
        }
        private bool isOwner;

        public bool IsOwner
        {
            get { return isOwner; }
            set { isOwner = value; }
        }

        private bool hasStarted;

        public bool HasStarted
        {
            get { return hasStarted; }
            set { hasStarted = value; }
        }
        private int pips;

        public int Pips
        {
            get { return pips; }
            set { pips = value; }
        }

    }
}
