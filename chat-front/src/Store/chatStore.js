import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../Axios/axios";
import { AuthStore } from "./AuthStore";

export const chatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

getUsers: async () => {
  set({ isUsersLoading: true });
  try {
    const res = await axiosInstance.get("/message/users");
    console.log("Fetched users:", res.data.data);
    set({ users: res.data.data });
  } catch (e) {
    toast.error("Failed to load users");
  } finally {
    set({ isUsersLoading: false });
  }
},

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data.data });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

 sendMessage: async (messageData) => {
    const { messages, selectedUser } = get();
    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error("Something went wrong while sending the message");
      console.log(error);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = AuthStore.getState().socket;

    socket.on("NewMessage", (newMessage) => {
      const isFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = AuthStore.getState().socket;
    socket.off("NewMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
