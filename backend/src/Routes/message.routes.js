import express from "express"
import { VerifyJWT } from "../Middlewares/auth.midleware.js"
import {getUserForSideBar,getMessages,sendMessage} from "../Controllers/message.controllers.js"

const routerM = express.Router()

routerM.route('/users').get(VerifyJWT,getUserForSideBar)
routerM.route('/:id').get(VerifyJWT,getMessages)
routerM.route('/send/:id').post(VerifyJWT,sendMessage)

export default routerM;