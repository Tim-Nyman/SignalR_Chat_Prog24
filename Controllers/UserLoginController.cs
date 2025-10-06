using Microsoft.AspNetCore.Mvc;

namespace SignalR_Chat_Prog24.Controllers
{
    [Route("login")]
    public class UserLoginController : Controller
    {
        // GET: Visar inloggningssidan
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        // POST: Tar emot användarnamnet och sparar det i sessionen
        [HttpPost]
        public IActionResult Index(string username)
        {
            // Kontrollera att användarnamnet inte är tomt
            if (!string.IsNullOrWhiteSpace(username))
            {
                // Spara användarnamnet i sessionen
                HttpContext.Session.SetString("Username", username);
                // Skicka vidare till chattsidan
                return RedirectToAction("Index", "Chat");
            }
            // Om inget användarnamn angetts, visa felmeddelande
            ViewBag.Error = "Please enter a username.";
            return View();
        }
    }
}
