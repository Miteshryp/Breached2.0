import axios from "axios"
import backend from "./backend_settings"

let instance = axios.create({
   baseURL: backend.baseURL,
   withCredentials: true
});

module.exports = instance;