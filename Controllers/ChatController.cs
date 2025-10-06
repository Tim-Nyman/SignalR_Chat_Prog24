using Microsoft.AspNetCore.Mvc;

namespace SignalR_Chat_Prog24.Controllers
{
    public class ChatController : Controller
    {
        public IActionResult Index()
        {
            // Visar chattsidan. Kräver att användaren är inloggad (har ett användarnamn i sessionen)
            var username = HttpContext.Session.GetString("Username");
            if (string.IsNullOrEmpty(username))
            {
                // Om användaren inte är inloggad – skicka till login-sidan
                return RedirectToAction("Index", "UserLogin");
            }

            // Skicka användarnamnet till vyn via ViewBag
            ViewBag.Username = username;
            // Rendera chattsidan
            return View();
        }
    }
}