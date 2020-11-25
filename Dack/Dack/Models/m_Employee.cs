using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Dack.Models
{
	public class m_Employee
	{
        public int EmployeeID { get; set; }
        public int SubDepartmentID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Bio { get; set; }
        public string ProfileImage { get; set; }
        public string FBProfileLink { get; set; }
        public string TwitterProfileLink { get; set; }
        public System.DateTime AddedDate { get; set; }
       
    }
}