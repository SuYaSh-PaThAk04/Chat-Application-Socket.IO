import {app} from "./app.js"
import dotenv from "dotenv"
import dbConnect from "./DB/Db.js";

dotenv.config();

dbConnect()
.then(()=>
{const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server running at ${PORT}`)}
)
})
.catch((error)=>{
    console.log(`Can't connect to database ${error}`)
})
