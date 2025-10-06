// Detta aktiverar strikt läge för JS.
"use strict";

// Skapar en ny SignalR-anslutning till hubben på servern (ChatHub)
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
// Inaktiverar send button tills anslutningen är etablerad
document.getElementById("sendBtn").disabled = true;

// Lyssnar på inkommande meddelanden från servern via "ReceiveMessage"-händelsen
connection.on("ReceiveMessage", (user, message) => {

    // Sanerar inkommande data för att undvika XSS-attacker
    const sanitizedUser = DOMPurify.sanitize(user);
    const sanitizedMessage = DOMPurify.sanitize(message);

    // Skapar ett nytt list-element för meddelandet
    const li = document.createElement("li");
    li.textContent = `${sanitizedUser}: ${sanitizedMessage}`;
    li.className = "list-group-item";
    li.classList.add(sanitizedUser === currentUser ? "my-message" : "other-user-message");

    // Lägger till meddelandet i meddelandelistan i DOM:en
    document.getElementById("messagesList").appendChild(li);
});

// Startar anslutningen till SignalR-hubben
connection.start().then(function () {
    console.log("SignalR connected!");
    // Aktiverar send button när anslutningen lyckas
    document.getElementById("sendBtn").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

// Hanterar klick på send button
document.getElementById("sendBtn").addEventListener("click", function (event) {
    var message = document.getElementById("messageInput").value;
    console.log("Sending message:", currentUser, message);

    // Anropar serverns SendMessage-metod via SignalR
    connection.invoke("SendMessage", currentUser, message)
        .catch(function (err) {
        return console.error(err.toString());
    });

    // Tömmer inmatningsfältet och fokuserar det igen
    document.getElementById("messageInput").value = "";
    document.getElementById("messageInput").focus();

    // Förhindrar att sidan laddas om vid knapptryck
    event.preventDefault();
});