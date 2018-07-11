using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;

namespace BK
{
    /// <summary>
    /// Summary description for photoService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class photoService : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        public AjaxControlToolkit.Slide[] getPics()
        {

            if (GetCurrentCategory().Equals("Interesting"))
            {
                AjaxControlToolkit.Slide[] slides = new AjaxControlToolkit.Slide[12];
                slides[0] = new AjaxControlToolkit.Slide("photos/interesting/000.gif", "", "Two headed snake!");
                slides[1] = new AjaxControlToolkit.Slide("photos/interesting/01.jpg", "Sunset", "Shopping bag!");
                slides[2] = new AjaxControlToolkit.Slide("photos/interesting/ellen.jpg", "Winter", "Cards !");
                slides[3] = new AjaxControlToolkit.Slide("photos/interesting/hhh.bmp", "ellen.jpg", "Nice haircut!");
                slides[4] = new AjaxControlToolkit.Slide("photos/interesting/photo051806.jpg", "Sedona", " Beach! ");
                slides[5] = new AjaxControlToolkit.Slide("photos/interesting/photo101006.jpg", "Sedona", "Cheat in cards!");
                slides[6] = new AjaxControlToolkit.Slide("photos/interesting/r1459394032.jpg", "Sedona", "Hairy Chinese!!!");
                slides[7] = new AjaxControlToolkit.Slide("photos/interesting/ShowLetter444.jpg", "Sedona", "Crocodile eating man!");
                slides[8] = new AjaxControlToolkit.Slide("photos/interesting/snake.jpg", "Sedona", "python ate a human!");
                slides[9] = new AjaxControlToolkit.Slide("photos/interesting/steamengine1.jpg", "Sedona", "Steam engine invented 2000 yrs ago");
                slides[10] = new AjaxControlToolkit.Slide("photos/interesting/ultrasound.jpg", "Sedona", "supersonic airplane creating rain!");
                slides[11] = new AjaxControlToolkit.Slide("photos/interesting/stadium.jpg", "Sedona", "Stadium made out of cards!");
                return (slides);
            }

            if (GetCurrentCategory().Equals("Optic"))
            {
                AjaxControlToolkit.Slide[] slides = new AjaxControlToolkit.Slide[15];
                slides[0] = new AjaxControlToolkit.Slide("photos/opticillusion/018.jpg", "", "increase distance to read!");
                slides[1] = new AjaxControlToolkit.Slide("photos/opticillusion/07b.gif", "Sunset", "What do you see?");
                slides[2] = new AjaxControlToolkit.Slide("photos/opticillusion/1-11.jpg", "Winter", "How many faces");
                slides[3] = new AjaxControlToolkit.Slide("photos/opticillusion/1-15.gif", "innser circle", "Inner circle looks smaller");
                slides[4] = new AjaxControlToolkit.Slide("photos/opticillusion/1-23.gif", "Sedona", " How many faces ");
                slides[5] = new AjaxControlToolkit.Slide("photos/opticillusion/1-25.gif", "Sedona", "Move your head is the picture revolving?");
                slides[6] = new AjaxControlToolkit.Slide("photos/opticillusion/1-32.jpg", "Sedona", "Up or down ?");
                slides[7] = new AjaxControlToolkit.Slide("photos/opticillusion/untitled.bmp", "Sedona", "Up or down?");
                slides[8] = new AjaxControlToolkit.Slide("photos/opticillusion/untitled3.bmp", "Sedona", "Where is the sphere?");
                slides[9] = new AjaxControlToolkit.Slide("photos/opticillusion/untitled4.bmp", "Sedona", "outward or inward ?");
                slides[10] = new AjaxControlToolkit.Slide("photos/opticillusion/untitled5.bmp", "Sedona", "Blinking points");
                slides[11] = new AjaxControlToolkit.Slide("photos/opticillusion/untitled6.bmp", "Sedona", "Revolving again.");
                slides[12] = new AjaxControlToolkit.Slide("photos/opticillusion/untitled7.bmp", "Sedona", "stairs!");
                slides[13] = new AjaxControlToolkit.Slide("photos/opticillusion/untitled8.bmp", "Sedona", "Where is the little cube? ");
                slides[14] = new AjaxControlToolkit.Slide("photos/opticillusion/untitled9.bmp", "Sedona", "Inward or outward? ");
                return (slides);
            }

            if (GetCurrentCategory().Equals("2011Trip"))
            {
                AjaxControlToolkit.Slide[] slides = new AjaxControlToolkit.Slide[15];
                slides[0] = new AjaxControlToolkit.Slide("photos/SDTOPHILLY/100_0011.JPG", "", "My trip from San Diego to Philadelphia");
                slides[1] = new AjaxControlToolkit.Slide("photos/SDTOPHILLY/100_0012.JPG", "", "My trip from San Diego to Philadelphia");
                slides[2] = new AjaxControlToolkit.Slide("photos/SDTOPHILLY/100_0013.JPG", "", "My trip from San Diego to Philadelphia");
                slides[3] = new AjaxControlToolkit.Slide("photos/SDTOPHILLY/100_0014.JPG", "", "My trip from San Diego to Philadelphia");

                slides[4] = new AjaxControlToolkit.Slide("photos/SDTOPHILLY/100_0019.JPG", "", "My trip from San Diego to Philadelphia");
                slides[5] = new AjaxControlToolkit.Slide("photos/SDTOPHILLY/100_0020.JPG", "", "My trip from San Diego to Philadelphia");
                slides[6] = new AjaxControlToolkit.Slide("photos/SDTOPHILLY/100_0023.JPG", "", "My trip from San Diego to Philadelphia");
                slides[7] = new AjaxControlToolkit.Slide("photos/SDTOPHILLY/100_0025.JPG", "", "My trip from San Diego to Philadelphia");

                slides[8] = new AjaxControlToolkit.Slide("photos/SDTOPHILLY/100_0026.JPG", "", "My trip from San Diego to Philadelphia");
                slides[9] = new AjaxControlToolkit.Slide("photos/SDTOPHILLY/100_0027.JPG", "", "My trip from San Diego to Philadelphia");
                slides[10] = new AjaxControlToolkit.Slide("photos/SDTOPHILLY/100_0028.JPG", "", "My trip from San Diego to Philadelphia");
                slides[11] = new AjaxControlToolkit.Slide("photos/SDTOPHILLY/100_0029.JPG", "", "My trip from San Diego to Philadelphia");

                slides[12] = new AjaxControlToolkit.Slide("photos/SDTOPHILLY/100_0030.JPG", "", "My trip from San Diego to Philadelphia");
                slides[13] = new AjaxControlToolkit.Slide("photos/SDTOPHILLY/100_0031.JPG", "", "My trip from San Diego to Philadelphia");
                slides[14] = new AjaxControlToolkit.Slide("photos/SDTOPHILLY/100_0032.JPG", "", "My trip from San Diego to Philadelphia");
                return (slides);
            }




            return null;

        }

        private string GetCurrentCategory(){

            if (Session["selectedPicCategory"] == null)
            {
                return "";
            }
            else
            {
                return Session["selectedPicCategory"].ToString();
            }
        }
    }
}
