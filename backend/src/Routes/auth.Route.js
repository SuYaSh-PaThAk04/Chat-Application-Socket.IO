import express from "express"
import { checkAuth, loginUser, logoutUser, signUpUser, updateProfile } from "../Controllers/auth.controllers.js";
import { VerifyJWT } from "../Middlewares/auth.midleware.js";
import { upload } from "../Middlewares/multer.middleware.js";
const router= express.Router();

router.route("/signup").post(signUpUser)

router.route("/login").post(loginUser)

router.route("/logout").post(VerifyJWT,logoutUser)
router.route("/update-profile").post(VerifyJWT, updateProfile);

router.route("/check").get(VerifyJWT,checkAuth)

export default router;