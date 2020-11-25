using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Dack.Business
{
	public class Departments
	{
		public static List<Department> GetDepartments()
		{
			try
			{
				dackEntities entities = new dackEntities();
				return entities.Departments.ToList();

			}
			catch (Exception)
			{

				throw;
			}
		}
		public static List<SubDepartment> GetSubDepartments(int departmentID)
		{
			try
			{
				dackEntities entities = new dackEntities();
				return entities.SubDepartments.Where(sd => sd.DepartmentID == departmentID).ToList();
			}
			catch (Exception)
			{

				throw;
			}
		}

	}
}