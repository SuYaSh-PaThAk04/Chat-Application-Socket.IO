import express from "express"
import authRoutes from "./Routes/auth.Route.js"

const app = express()
app.use(express.json());

app.use("/api/auth",authRoutes)


export {app}