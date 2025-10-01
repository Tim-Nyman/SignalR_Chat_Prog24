using Microsoft.AspNetCore.Mvc;

namespace SignalR_Chat_Prog24.Controllers
{
    [Route("login")]
    public class UserLoginController : Controller
    {
        
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Index(string username)
        {
            if (!string.IsNullOrWhiteSpace(username))
            {
                HttpContext.Session.SetString("Username", username);

                return RedirectToAction("Index", "Chat");
            }

            ViewBag.Error = "Please enter a username.";
            return View();
        }
    }
}
