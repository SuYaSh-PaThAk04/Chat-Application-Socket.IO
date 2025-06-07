import express from "express"
import { loginUser, logoutUser, signUpUser, updateProfile } from "../Controllers/auth.controllers";
import { VerifyJWT } from "../Middlewares/auth.midleware";
const router= express.Router();

router.route("/signup").post(signUpUser)

router.route("/login").post(loginUser)

router.route("/logout").post(logoutUser)

router.route("/update-profile").post(VerifyJWT,updateProfile)
export default router;