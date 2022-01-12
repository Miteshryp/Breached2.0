const baseURL = process.env.REACT_APP_BACKEND_URL;
console.log(baseURL);
export default {
    login: baseURL +  "/user/login",
    signup: baseURL + "/user/signup",
    adminLogin: baseURL + "/user/admin/login",
    logout: baseURL + "/logout",
};