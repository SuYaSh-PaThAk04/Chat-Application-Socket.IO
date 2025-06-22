// app.js
import express from "express";
import router from "./Routes/auth.Route.js";
import cookieParser from "cookie-parser";
import routerM from "./Routes/message.routes.js";
import cors from "cors";

const app = express();

const allowedOrigins = [
  "https://chat-application-socket-io-dun.vercel.app",
  "http://localhost:5173" 
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/api/auth", router);
app.use("/api/message", routerM);

export default app;
