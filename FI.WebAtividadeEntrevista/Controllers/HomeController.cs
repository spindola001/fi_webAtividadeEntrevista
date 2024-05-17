using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebAtividadeEntrevista.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        [HttpPost]
        public ActionResult ShareData(string Nome, string CPF, long IdCliente)
        {
            TempData["Nome"] = Nome;
            TempData["CPF"] = CPF;
            TempData["IdCliente"] = IdCliente;

            return new HttpStatusCodeResult(200);
        }
    }
}
