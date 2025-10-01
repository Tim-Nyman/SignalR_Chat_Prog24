using Microsoft.AspNetCore.Mvc;

namespace SignalR_Chat_Prog24.Controllers
{
    public class ChatController : Controller
    {
        public IActionResult Index()
        {
            var username = HttpContext.Session.GetString("Username");
            if (string.IsNullOrEmpty(username))
            {
                return RedirectToAction("Index", "UserLogin");
            }

            ViewBag.Username = username;
            return View();
        }
    }
}