"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
document.getElementById("sendBtn").disabled = true;

connection.on("ReceiveMessage", (user, message) => {
    console.log("ReceiveMessage fired:", user, message);
    const sanitizedUser = DOMPurify.sanitize(user);
    const sanitizedMessage = DOMPurify.sanitize(message);
    console.log("Sanitized:", sanitizedUser, sanitizedMessage);

    const li = document.createElement("li");
    li.textContent = `${sanitizedUser}: ${sanitizedMessage}`;

    li.className = "list-group-item";

    li.classList.add(sanitizedUser === currentUser ? "my-message" : "other-user-message");

    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {
    console.log("SignalR connected!");
    document.getElementById("sendBtn").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendBtn").addEventListener("click", function (event) {
    var message = document.getElementById("messageInput").value;
    console.log("Sending message:", currentUser, message);
    connection.invoke("SendMessage", currentUser, message)
        .catch(function (err) {
        return console.error(err.toString());
    });

    document.getElementById("messageInput").value = "";

    document.getElementById("messageInput").focus();

    event.preventDefault();
});