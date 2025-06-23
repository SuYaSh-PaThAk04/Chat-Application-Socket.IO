import express from "express";
import router from "./Routes/auth.Route.js";
import cookieParser from "cookie-parser";
import routerM from "./Routes/message.routes.js";
import cors from "cors";

const app = express();
const allowedOrigins = [
  "https://chat-application-socket-io.vercel.app",
  "https://chat-application-socket-io-git-main-suyash-pathak04s-projects.vercel.app",
  "https://chat-application-socket-hiroqy4ts-suyash-pathak04s-projects.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    const cleanedOrigin = origin.replace(/\/$/, "");
    if (allowedOrigins.includes(cleanedOrigin)) {
      callback(null, true);
    } else {
      console.log("⛔ CORS Blocked:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
  console.log("Origin:", req.headers.origin);
  next();
});

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/api/auth", router);
app.use("/api/message", routerM);

export default app;
