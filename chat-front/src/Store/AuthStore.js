import { create } from "zustand";
import { axiosInstance } from "../Axios/axios";
import toast from "react-hot-toast";
import io from "socket.io-client";

const Base_URL = "http://localhost:3000/api";

export const AuthStore = create((set, get) => ({
  authUser: null,
  isUpdatingProfile: false,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,
  onlineUsers: [],
  socket: null,

checkAuth: async () => {
  set({ isCheckingAuth: true });
  try {
    const res = await axiosInstance.get("/auth/check");
    set({ authUser: res.data.user }); 
  } catch (error) {
    set({ authUser: null }); 
  } finally {
    set({ isCheckingAuth: false });
  }
},

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Created Account Successfully!");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed.");
      console.log(error);
    } finally {
      set({ isSigningUp: false });
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
      toast.error(error.response?.data?.message || "Login failed.");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      console.log("Error while logging out", error);
      toast.error(error.response?.data?.message || "Logout failed.");
    }
  },

updateProfile: async (file) => {
  set({ isUpdatingProfile: true });
  try {
    const formData = new FormData();
    formData.append("profileImage", file); // this must be the File object from input

    const res = await axiosInstance.post("/auth/update-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    set({ authUser: res.data.data }); // adjust if needed
    toast.success("Profile updated successfully");
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Update failed.");
  } finally {
    set({ isUpdatingProfile: false });
  }
},

  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return;

    const newSocket = io(Base_URL, {
      query: {
        userId: authUser._id,
      },
    });

    newSocket.connect();

    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    set({ socket: newSocket });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) socket.disconnect();
  },
}));
