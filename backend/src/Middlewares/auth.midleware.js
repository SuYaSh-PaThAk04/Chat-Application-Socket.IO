import { ApiError } from '../Utils/ApiError.js';
import { asyncHandler } from "../Utils/asyncHandller.js";
import jwt from "jsonwebtoken";
import { User } from "../Models/user.Models.js";

const VerifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = (req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")).trim();
        if (!token) {
            throw new ApiError(401, "Unauthorized request: No token provided");
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Unauthorized request: User not found");
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT verification error:", error); 
        if (error instanceof jwt.JsonWebTokenError) {
            throw new ApiError(401, "Invalid access token: " + error.message);
        }
        throw new ApiError(401, "Invalid access token");
    }
});

export { VerifyJWT };
