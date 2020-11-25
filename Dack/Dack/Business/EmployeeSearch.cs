using Dack.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Dack.Business
{
	public class EmployeeSearch
	{
		public static List<m_Employee> GetEmployees(EmployeeSearchCriteria criteria)
		{
			dackEntities entities = new dackEntities();
			List<m_Employee> retVal = entities.Employees.Where(E => E.SubDepartmentID == criteria.SubDepartmentID)
				.Select(E => new m_Employee() { FirstName = E.FirstName, LastName = E.LastName }).ToList();

			return retVal;
		}
	}
}