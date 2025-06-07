import User from "../Models/user.Models.js"
import { ApiResponse } from "../Utils/apiResponse.js"
import asyncHandler from "../Utils/asyncHandller.js"
import { ApiError } from "../Utils/ApiError.js"


const GenerateAccessRefresh =  async (userid)=>{
try {
    const user = await User.findById(userid);
    const accessToken = user.generateAccessTokens(userid);
    const refreshToken = user.generateRefreshTokens(userid);
       user.refreshToken = refreshToken;
      await user.save({validateBeforeSave : false});
      return {accessToken,refreshToken};
} catch (error) {
    throw new ApiError(500,`Error while generating tokens ${error}`)
}
}
  const options = {
    httpOnly : true,
    secure : true
  }
const signUpUser = asyncHandler(async(req,res)=>{

    const{email,password,fullName}= req.body;
    if(!email || !password || !fullName){
        throw new ApiError(401,"All feilds are required",error.message)
    }
    if(password.length<6){
        throw new ApiError(400,"Password should contain atleast 6 characters")
    }
    const user = await User.findOne({email});
    if(user){
        throw new ApiError(401,"User aready exists")
    }
    const salt = await bcrypt.getSalt(10);
    const handlePassword = await bcrypt.hash(password,salt);

    const newUser = await User.create({
        email,
        fullName,
        password : handlePassword,
    })
    const createUser = await User.findById(newUser._ud).select("-password -refreshToken");
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
const {accessToken,refreshToken}= GenerateAccessRefresh(user._id);
const LogedUser = await User.findById(user._id).select("-password -refreshToken");

return res.status(201)
      .cookie("accesToken",accessToken,options)
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

const updateProfile = asyncHandler(async(req,res)=>{

})
export {signUpUser,
    loginUser,
   logoutUser,
   updateProfile
}