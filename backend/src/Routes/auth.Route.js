import express from "express"
import { checkAuth, loginUser, logoutUser, signUpUser, updateProfile } from "../Controllers/auth.controllers.js";
import { VerifyJWT } from "../Middlewares/auth.midleware.js";
const router= express.Router();

router.route("/signup").post(signUpUser)

router.route("/login").post(loginUser)

router.route("/logout").post(logoutUser)

router.route("/update-profile").post(VerifyJWT,updateProfile)
router.route("/check").get(VerifyJWT,checkAuth)

export default router;