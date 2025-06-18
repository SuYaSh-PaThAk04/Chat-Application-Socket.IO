import axios from "axios"

export const axiosInstance = axios.create({
    baseURL : "https://chat-application-socket-io-r7sq.onrender.com/api",
  withCredentials : true,
});