import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({

    senderId:{
        tyoe : mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    recieverId:{
        tyoe : mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type : String,
    },
    image:{
        type : String,
    },
},
{
    timestamps : true
}
);

const Message = mongoose.model("Message",messageSchema);
export default Message