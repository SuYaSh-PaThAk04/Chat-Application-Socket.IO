import {create} from "zustand"

import toast from "react-hot-toast"
import { axiosInstance } from "../Axios/axios"
import { Shapes, ShoppingBag } from "lucide-react"


const chatStore = create((set)=>({
message: [],
users : [],
selectUser : null,
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
}
}))



