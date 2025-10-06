using Microsoft.AspNetCore.SignalR;

namespace SignalR_Chat_Prog24
{
    // SignalR-hubben som hanterar realtidskommunikationen mellan klienter
    public class ChatHub : Hub
    {
        // Metod som kallas av klienten för att skicka meddelanden
        public async Task SendMessage(string user, string message)
        {
            // Skickar meddelandet till alla anslutna klienter
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
