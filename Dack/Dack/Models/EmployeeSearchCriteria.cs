using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Dack.Models
{
	public class EmployeeSearchCriteria
	{
		public int DepartmentID { get; set; }
		public int SubDepartmentID { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }

	}
}