import axios from "axios"

let instance = axios.create({
   baseURL: process.env.REACT_APP_BACKEND_URL,
   withCredentials: false
});

export default instance;