import express from "express"
import router from "./Routes/auth.Route.js";
import cookieParser from "cookie-parser"
const app = express()

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));


app.use(cookieParser());

app.use(express.static("public"));
app.use("/api/auth",router)


export {app}