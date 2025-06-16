import {create} from "zustand"

import toast from "react-hot-toast"
import { axiosInstance } from "../Axios/axios"
import { Shapes, ShoppingBag } from "lucide-react"


export const chatStore = create((set)=>({
message: [],
users : [],
selectedUser : null,
isUsersLoading: false,
isMessagesLoading : false,

getUser : async ()=>{
    set({isUsersLoading : true});
 try {
    const res = axiosInstance.get("/message/users")
    set({users :res.data});
 } catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
 }
 finally{
    set({isUsersLoading : false});
 }
},
getMessages : async (userid)=>{
   set({isMessagesLoading : true});
   try {
      const res = axiosInstance.get(`message/${userid}`);
      set({message : res.data});
   } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
   }
   finally{
      set({isMessagesLoading :false })
   }
},
sendMesssage : async(messageData)=>{
   const { message,selectedUser}= get()
   try {
      const res = axiosInstance.post(`/message/${selectedUser._id}`,messageData);
      set({message : [...message,(await res).data]})
   } catch (error) {
      toast.error("something went wrong while sending message")
   }
}
}))



