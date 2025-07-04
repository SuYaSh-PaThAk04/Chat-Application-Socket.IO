import Message from "../Models/messages.Model.js";
import { User } from "../Models/user.Models.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asyncHandller.js";
import Cloudniary from "../Utils/Cloudinary.js";
import { getRecieverid, getIO } from "../Utils/Socket.js";

const getUserForSideBar = asyncHandler(async(req,res)=>{
try {
     const loggedInUser = req.user._id;
     const findUsers = await User.find({_id: {$ne : loggedInUser}}).select("-password -refreshToken")
    return res.status(201).json(
        new ApiResponse(201,findUsers,"Users fetched successfully")
    )
} catch (error) {
    throw new ApiError(500,"Error while fetching users from database",error)
}
})

const getMessages = asyncHandler(async(req,res)=>{
try {
        const {id : UserToId}= req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or:[
                {senderId:myId, recieverId:UserToId},
                {senderId:UserToId, recieverId:myId}, 
            ]
        })
    return res.status(200)
    .json(new ApiResponse(201,messages,"Messages fetched!!"))
} catch (error) {
    throw new ApiError(500,"Error while fetching messages",error)
}
})

const sendMessage = asyncHandler(async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    let imageUrl = null;

    if (image) {
      try {
        const uploadResponse = await Cloudniary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      } catch (uploadErr) {
        throw new ApiError(501, "Image upload to Cloudinary failed", uploadErr);
      }
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const recieverSocketId = getRecieverid(recieverId);
    if (recieverSocketId) {
      const io = getIO();
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json(
      new ApiResponse(201, newMessage, "Message sent successfully")
    );
  } catch (err) {
    console.error("Send message failed:", err);
    throw new ApiError(500, "Error while sending the message", err);
  }
});

export  {
    getUserForSideBar,
    getMessages,
    sendMessage
}