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

			List<m_Employee> retVal = 
				entities.Employees.Where(
				E => (E.SubDepartmentID == criteria.SubDepartmentID  || criteria.SubDepartmentID == 0 )  
				&& E.Deleted == false
				&& (string.IsNullOrEmpty(criteria.FirstName) || (E.FirstName.ToLower()??"").Contains((criteria.FirstName??"").ToLower()))
				&& (string.IsNullOrEmpty(criteria.LastName) || (E.LastName.ToLower() ?? "").Contains((criteria.LastName ?? "").ToLower()))
			)
				.Select(E => new m_Employee() 
				{ 
				  FirstName = E.FirstName, 
				  LastName = E.LastName, 
				  Bio = E.Bio, EmployeeID = E.EmployeeID, 
				  FBProfileLink = E.FBProfileLink, 
				  ProfileImage = E.ProfileImage, 
				  TwitterProfileLink = E.TwitterProfileLink, 
				  SubDepartmentID = E.SubDepartmentID })
				.ToList();

			return retVal;
		}
	}
}