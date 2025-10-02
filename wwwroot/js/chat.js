"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

document.getElementById("sendBtn").disabled = true;

connection.on("ReceiveMessage", (user, message) => {
    const li = document.createElement("li");
    li.textContent = `${user}: ${message}`;
    li.className = "list-group-item";

    li.classList.add(user === currentUser ? "my-message" : "other-user-message");

    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {
    document.getElementById("sendBtn").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendBtn").addEventListener("click", function (event) {
    var message = document.getElementById("messageInput").value;

    connection.invoke("SendMessage", currentUser, message)
        .catch(function (err) {
        return console.error(err.toString());
    });

    document.getElementById("messageInput").value = "";
    event.preventDefault();
});