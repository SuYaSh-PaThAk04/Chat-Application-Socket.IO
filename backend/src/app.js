// app.js
import express from "express";
import router from "./Routes/auth.Route.js";
import cookieParser from "cookie-parser";
import routerM from "./Routes/message.routes.js";
import cors from "cors";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/api/auth", router);
app.use("/api/message", routerM);

export default app;
