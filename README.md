# SignalR Chat App

A simple ASP.NET Core MVC chat application using SignalR, with client-side message sanitization via DOMPurify.

---

## Requirements

- [.NET 7 SDK](https://dotnet.microsoft.com/download/dotnet/7.0) or later  
- Modern browser (Chrome, Edge, Firefox)  
- Optional: Internet connection to load DOMPurify from CDN or install it locally.

---

# Features

 - Real-time chat using SignalR  

 - Client-side sanitization with DOMPurify to prevent XSS attacks  

 - HTTPS enabled by default in development  

 - Redirect from root / to /login  

 - Simple login page storing username in session

 ---

## Getting Started

1. **Clone the repository:**

```bash
git clone <repository-url>
cd SignalR_Chat_Prog24
```

---

2. **Restore dependencies:**

```bash
dotnet restore
```

---

3. **Build the project:**

```bash
dotnet build
```

---

4. **Trust the local HTTPS development certificate (if not done already):**

```bash
dotnet dev-certs https --trust
```

---

5. **Run the application:**

```bash
dotnet run
```

---

6. **Open the application in your browser:**

```bash
Go to https://localhost:7172/login
Enter a username
You will be redirected to the chat page
```
