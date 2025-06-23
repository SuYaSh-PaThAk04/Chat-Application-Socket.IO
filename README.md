Here’s a professional, comprehensive `README.md` content for your **Chat Application with Socket.IO** project:

---

# 💬 Real-Time Chat Application (Socket.IO + MERN Stack)

This is a **full-stack real-time chat application** built using the **MERN stack** with **Socket.IO** for instant messaging between users. It includes user authentication, profile management, and WebSocket-based real-time communication.

### 🔗 Live Demo

* **Frontend**: [https://chat-application-socket-io.vercel.app](https://chat-application-socket-io.vercel.app)
* **Backend**: [https://chat-application-socket-io-r7sq.onrender.com](https://chat-application-socket-io-r7sq.onrender.com)

---

## 🧰 Tech Stack

| Layer          | Technologies                                      |
| -------------- | ------------------------------------------------- |
| **Frontend**   | React (Vite), Zustand, Tailwind CSS, Lucide Icons |
| **Backend**    | Node.js, Express.js, MongoDB, Socket.IO           |
| **Auth**       | Cookie-based sessions, CORS with credentials      |
| **Deployment** | Vercel (Frontend), Render (Backend)               |

---

## ✨ Features

* ✅ User Signup/Login with JWT (stored in secure cookies)
* ✅ Profile management
* ✅ Real-time messaging via Socket.IO
* ✅ Online/offline status indicator
* ✅ Global auth state management with Zustand
* ✅ Socket auto-reconnection on login
* ✅ Toast notifications using `react-hot-toast`
* ✅ Responsive UI built with TailwindCSS and Lucide Icons

---

## 🧠 Learning Outcomes

* Deep understanding of **WebSockets** and **Socket.IO**
* Managing secure cross-origin communication with **CORS**
* Implementing **protected routes** using React Router + Zustand
* Structuring scalable backend APIs
* Debugging production-level deployment issues (Render/Vercel)

---

## 🐛 Challenges Overcome

* Fixing complex **CORS header misconfigurations**
* Handling **preflight (OPTIONS)** request failures
* Syncing frontend and backend cookies in cross-origin requests
* Debugging **socket connection issues** across auth states
* Ensuring **session persistence** and **navigation after login**

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SuYaSh-PaThAk04/Chat-Application-Socket.IO.git
cd Chat-Application-Socket.IO
```

### 2. Setup the backend

```bash
cd backend
npm install
# Create a .env file with the following
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLIENT_URL=https://your-frontend-domain
```

```bash
npm start
```

### 3. Setup the frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📂 Project Structure

```
├── frontend/         # React app (Vite)
│   ├── Pages/
│   ├── Components/
│   ├── Store/
│   └── ...
├── backend/          # Express server
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── ...
```

---



## 🤝 Contributing

Have suggestions or improvements? Feel free to [open an issue](https://github.com/SuYaSh-PaThAk04/Chat-Application-Socket.IO/issues) or create a pull request!

---

## ⭐ Support the Project

If you found this helpful, please ⭐ the repo and share it with others!

---

## 📬 Contact

**Suyash Pathak**
[LinkedIn](https://www.linkedin.com/in/suyash-pathak-4347b5283)
[GitHub](https://github.com/SuYaSh-PaThAk04)

---
