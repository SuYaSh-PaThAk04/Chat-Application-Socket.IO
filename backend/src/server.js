import dotenv from "dotenv";
import http from "http";
import dbConnect from "./DB/Db.js";
import app from "./app.js";
import { initializeSocket } from "./Utils/Socket.js";

dotenv.config();

const server = http.createServer(app);

initializeSocket(server);

app.get("/", (req, res) => {
  res.send("Welcome to the backend of the chat application");
});


dbConnect()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ DB connection failed:", error);
  });
