using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.Sql;
using System.Data.SqlClient;

namespace BK
{
    /// <summary>
    /// Parameter object with consructors
    /// Created 10/09/2009 by Guddu Mony and Majid Rostami
    /// has only 4 properties 
    /// </summary>
    public struct Param
    {
        //parameter name 
        public string paramName;
        //parameter valu in string 
        public string paramValue;
        //parameter type 
        public SqlDbType paramType;
        //parameter length
        public int paramLength;
        /// <summary>
        ///  Constructor when we have a length
        /// </summary>
        /// <param name="name"></param>
        /// <param name="value"></param>
        /// <param name="type"></param>
        /// <param name="length"></param>
        public Param(string name, string value, SqlDbType type, int length)
        {
            this.paramName = name;
            this.paramValue = value;
            this.paramType = type;
            this.paramLength = length;
        }

        /// <summary>
        /// constructor when we don't have a length
        /// </summary>
        /// <param name="name"></param>
        /// <param name="value"></param>
        /// <param name="type"></param>
        public Param(string name, object value, SqlDbType type)
        {
            this.paramName = name;
            this.paramValue = Convert.ToString(value);
            this.paramType = type;
            this.paramLength = 4;
        }
    }
}
