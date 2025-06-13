import { create } from "zustand";
import { axiosInstance } from "../Axios/axios";
import SignUp from "../Pages/SignUp";
import toast from "react-hot-toast";


export const AuthStore = create((set)=>({
    authUser : null,
     isUpadetingProfile : false,
     isSigningUp : false,
    isCheckingAuth : true,
    isCheckingAUth : false ,

    checkAuth : async()=>{
  try {
    const res = axiosInstance.get('/auth/check');
    set({authUser : res.data})
  } catch (error) {
    set({authUser : null})
    console.log("Error in checking authUser",error);
    
  }
  finally{
    set({isCheckingAUth : false})
  }
    },
    signUp : async(data)=>{
        set({isSigningUp:true})
   try {
     const res = await axiosInstance.post("/auth/signUp",data);
        set({authUser : res.data});
     toast.success("Created Account Succesfully!!");
  
   } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
   }
   finally{
    set({isSigningUp :false})
   }
    }
}))