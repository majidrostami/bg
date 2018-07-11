using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
namespace BK
{
    public class User
    {
        private string eMail;
        private string firstName;
        private string status;
        private string role;
        private int bgtableNumber;
        private bool isFamily;

        public bool IsFamily
        {
            get { return isFamily; }
            set { isFamily = value; }
        }

        public int BGTableNumber
        {
            get { return bgtableNumber; }
            set { bgtableNumber = value; }
        }
        public string Role
        {
            get { return role; }
            set { role = value; }
        }

        public string Status
        {
            get { return status; }
            set { status = value; }
        }
        private bool gender;

        public bool Gender
        {
            get { return gender; }
            set { gender = value; }
        }

        public string FirstName
        {
            get { return firstName; }
            set { firstName = value; }
        }
        private string lastName;

        public string LastName
        {
            get { return lastName; }
            set { lastName = value; }
        }
        private DateTime DOB;

        public DateTime DOB1
        {
            get { return DOB; }
            set { DOB = value; }
        }
        private DateTime DOJ;

        public DateTime DOJ1
        {
            get { return DOJ; }
            set { DOJ = value; }
        }

        public string EMail
        {
            get { return eMail; }
            set { eMail = value; }
        }

        public User(string email)
        {
            this.eMail = email;
        }
/// <summary>
/// 
/// </summary>
/// <param name="email"></param>
/// <param name="firstName"></param>
/// <param name="lastName"></param>
/// <param name="gender"></param>
/// <param name="dob"></param>
/// <param name="doj"></param>

        public User(string emailPassed, string firstNamePassed, string lastNamePassed, bool genderPassed,DateTime dobPassed, DateTime dojPassed )
        {
            this.DOB1 = dobPassed;
            this.DOJ1 = dojPassed;
            this.EMail = emailPassed;
            this.FirstName = firstNamePassed;
            this.Gender = genderPassed;
            this.LastName = lastNamePassed;



        }
    }
}
