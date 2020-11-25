using Dack.Business;
using Dack.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Dack.Controllers
{
    public class EmployeeSearchController : Controller
    {
        // GET: EmployeeSearch
        public ActionResult Index()
        {
            List<Department> departments = Departments.GetDepartments();
            ViewBag.Departments = new SelectList(departments,"DepartmentId", "DepartmentName");
            return View();
        }

        [HttpPost]
        public ActionResult GetSubDepartmentByDepartmentId(int departmentId)
        {           
            List<SubDepartment> subDepartments = Departments.GetSubDepartments(departmentId); 
            SelectList drpSubDepartments = new SelectList(subDepartments, "SubDepartmentID", "SubDepartmentName", 0);
            return Json(drpSubDepartments);
        }

        public ActionResult GetEmployees(int departmentId, int subDepartmentId)
        {
            EmployeeSearchCriteria employeeSearchCriteria1 = new EmployeeSearchCriteria()
            {
                DepartmentID = departmentId,
                SubDepartmentID = subDepartmentId
            };

			try
			{
                List<m_Employee> lstEmployees = EmployeeSearch.GetEmployees(employeeSearchCriteria1);
                return Json (lstEmployees);
			}
			catch (Exception ex)
			{
                return Json("Error " + ex.Message);
            }
        }

        public ActionResult DisplayEmployees(EmployeeSearchCriteria employeeSearchCriteria)
        {
            try
            {
                List<m_Employee> lstEmployees = EmployeeSearch.GetEmployees(employeeSearchCriteria);
                return View(lstEmployees);
            }
            catch (Exception ex)
            {
                return Json("Error " + ex.Message);
            }
        }

    }
}