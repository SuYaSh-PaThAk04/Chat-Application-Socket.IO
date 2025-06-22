import {User} from "../Models/user.Models.js"
import { ApiResponse } from "../Utils/apiResponse.js"
import {asyncHandler} from "../Utils/asyncHandller.js"
import { ApiError } from "../Utils/ApiError.js"
import Cloudniary from "../Utils/Cloudinary.js"
import bcrypt from "bcryptjs"

import streamifier from 'streamifier';


const GenerateAccessRefresh =  async (userid)=>{
try {
    const user = await User.findById(userid);
    const accessToken = user.generateAccessToken(userid);
    const refreshToken = user.generateRefreshToken(userid);
       user.refreshToken = refreshToken;
      await user.save({validateBeforeSave : false});
      return {accessToken,refreshToken};
} catch (error) {
    throw new ApiError(500,`Error while generating tokens ${error}`)
}
}
  const options = {
    httpOnly : true,
    secure : true,
   sameSite: "None", 
  }
const signUpUser = asyncHandler(async(req,res)=>{

    const{email,password,fullName,username}= req.body;
    if(!email || !password || !fullName || !username){
        throw new ApiError(401,"All feilds are required",error.message)
    }
    if(password.length<6){
        throw new ApiError(400,"Password should contain atleast 6 characters")
    }
    const user = await User.findOne({email});
    if(user){
        throw new ApiError(401,"User aready exists")
    }
    const salt = await bcrypt.genSalt(10);
    const handlePassword = await bcrypt.hash(password,salt);

    const newUser = await User.create({
        email,
        fullName,
        password : handlePassword,
        username
    })
    const createUser = await User.findById(newUser._id).select("-password -refreshToken");
    if(!createUser){
        throw new ApiError(410,"Error while signing in")
    }
    return res.status(201)
    .json(
        new ApiResponse(201,createUser,"User registered succesfully!!")
    )
})

const loginUser = asyncHandler(async (req,res)=>{
    const {email,password,username} = req.body;
    if(!email || !password){
        throw new ApiError(401,"All feilds are required")
    }
    const user = await User.findOne({
        $or:[{email},{username}]
    })
    const ValidatePassword = await bcrypt.compare(password,user.password)
    if(!ValidatePassword){
        throw new ApiError(400,'Invalid Password');
    }
const {accessToken,refreshToken}= await GenerateAccessRefresh(user._id);
const LogedUser = await User.findById(user._id).select("-password -refreshToken");

return res.status(201)
      .cookie("accessToken", accessToken, options) 
      .cookie('refreshToken',refreshToken,options)
      .json(
        new ApiResponse(201,
            {user :LogedUser,refreshToken ,accessToken},"User loggedin successfully !!")
      )
})

const logoutUser = asyncHandler(async (req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
       { 
        $set:{
            refreshToken: undefined
        }
       },
       {
        new: true
       }
    )
      const options = {
    httpOnly : true,
    secure : true
  }
  return res.status(200)
  .clearCookie("accessToken",options)
  .clearCookie("refreshToken",options)
  .json(
    new ApiResponse(201,"User logedOut succesfull !!")
  )
})


const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { profileImage } = req.body;

  if (!profileImage) {
    throw new ApiError(400, "No image data received");
  }

  const uploadResponse = await Cloudniary.uploader.upload(profileImage, {
    folder: "profileImages",
    width: 500,
    crop: "scale",
  });

  if (!uploadResponse?.secure_url) {
    throw new ApiError(500, "Image upload failed");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { profileImage: uploadResponse.secure_url },
    { new: true }
  );

  return res.status(200).json(
    new ApiResponse(200, updatedUser, "Profile updated successfully")
  );
});



const checkAuth = (req,res)=>{
    try {
        return res.status(201).json(req.user)
    } catch (error) {
        throw new ApiError(500,`Please login ${error.message}`)
    }
}
export {signUpUser,
    loginUser,
   logoutUser,
   updateProfile,
   checkAuth
}
