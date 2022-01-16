import axios from "axios"

let instance = axios.create({
   baseURL: process.env.REACT_APP_BACKEND_URL,
   withCredentials: false
});

instance.defaults.headers = {
   'Cache-Control': 'no-cache',
   'Pragma': 'no-cache',
   'Expires': '0',
 };

export default instance;