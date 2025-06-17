import express from "express"
import router from "./Routes/auth.Route.js";
import cookieParser from "cookie-parser"
import routerM from "./Routes/message.routes.js";
import cors from "cors"

const app = express()


app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials : true
}))
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));


app.use(cookieParser());

app.use(express.static("public"));
app.use("/api/auth",router)
app.use("/api/message",routerM)
export {app}