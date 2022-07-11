using KursWork.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace KursWork.Controllers
{
    // Контроллер для выдачи главной страницы
    public class HomeController : Controller
    {
        // обработчик запроса по пути /home
        public IActionResult Index()
        {
            return View();
        }
    }
}