import { create } from "zustand";
import { axiosInstance } from "../Axios/axios";
import toast from "react-hot-toast";
import axios from "axios";
import { data } from "react-router-dom";


export const AuthStore = create((set)=>({
    authUser : null,
     isUpdatingProfile : false,
     isSigningUp : false,
     isLoggingIn : false,
    isCheckingAuth : true,
    isCheckingAUth : false ,

    checkAuth : async()=>{
  try {
    const res = axiosInstance.get("/auth/check");
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
     const res = await axiosInstance.post("/auth/signup",data);
        set({authUser : res.data});
     toast.success("Created Account Succesfully!!");
  
   } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
   }
   finally{
    set({isSigningUp :false})
   }
    },
    login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

    logout : async()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser : null})
            toast.success("Log-Out succesfully")
        } catch (error) {
            console.log("Error while loggingOut ",error)
            toast.error(error.response.data.message)
        }
    },
    updateProfile : async(data)=>{
        set({isUpdatingProfile : true})
        try {
            const res = await axiosInstance.put("/auth/update-profile",data)
            set({authUser : res.data});
            toast.success("Profile picture updated succesfully ");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }finally{
            set({isUpdatingProfile : false})
        }
    }
}))