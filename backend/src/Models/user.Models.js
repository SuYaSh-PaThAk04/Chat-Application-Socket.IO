import mongoose from "mongoose";
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({
email:{
    type : String,
    required : true
},
username:{
    type : String,
    required : true
},
fullName:{
    type : String,
    required : true
},
password:{
    type : String,
    required : true,
    minlength : 6
},
profileImage:{
    type : String,
    default : ""
},
refreshToken:{
    type : String

}},
{timestamps: true}
);

userSchema.methods.generateAccessTokens = function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        fullName:this.fullName,
        password:this.password,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.  ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.methods.generateRefreshTokens = function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        fullName:this.fullName,
        password:this.password,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}


export const User = mongoose.model("User",userSchema);



