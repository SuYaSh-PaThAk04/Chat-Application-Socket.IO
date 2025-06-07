import express from "express"
import router from "./Routes/auth.Route.js";
const app = express()
app.use(express.json());

app.use("/api/auth",router)


export {app}