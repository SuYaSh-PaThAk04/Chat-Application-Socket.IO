import { create } from "zustand";
import { axiosInstance } from "../Axios/axios";
import toast from "react-hot-toast";
import io from "socket.io-client";

const Base_URL = "https://chat-application-socket-io-r7sq.onrender.com";

export const AuthStore = create((set, get) => ({
  authUser: null,
  isUpdatingProfile: false,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    console.log("🔥 AuthStore.signUp called with", data);
    set({ isCheckingAuth: true });
        console.log("✅ Signup success", res.data);
    try {
      const res = await axiosInstance.get("/auth/check", { withCredentials: true });
      set({ authUser: res.data.user });
    } catch (error) {
        console.error("❌ Signup error", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data, { withCredentials: true });
      set({ authUser: res.data });
      toast.success("Created Account Successfully!");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed.");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data, { withCredentials: true });
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
      await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
      get().disconnectSocket();
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.log("Logout error", error);
      toast.error(error.response?.data?.message || "Logout failed.");
    }
  },


  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.post("/auth/update-profile", data, {
        withCredentials: true,
      });
      set({ authUser: res.data.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Profile update failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },


  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return;

    const newSocket = io(Base_URL, {
      withCredentials: true,
      query: {
         userId: authUser?.data?.user._id, 
      },
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("🟢 Socket connected");
    });

    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    set({ socket: newSocket });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
