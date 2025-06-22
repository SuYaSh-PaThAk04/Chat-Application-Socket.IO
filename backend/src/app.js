import express from "express";
import router from "./Routes/auth.Route.js";
import cookieParser from "cookie-parser";
import routerM from "./Routes/message.routes.js";
import cors from "cors";

const app = express();


app.use(
  cors({
    origin: "https://chat-application-socket-io-git-main-suyash-pathak04s-projects.vercel.app/",
    credentials: true,
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/api/auth", router);
app.use("/api/message", routerM);

export default app;
