// import axios from "./../axios_setup"
import axios from "axios"
import settings from "./../../backend_settings"

async function login (credentials) {
   let response = await axios.post(settings.baseURL + settings.login, credentials);
   if(!response.auth) {
      console.log("Login Failed" + response.message);
      return false;
   }

   localStorage.setItem(process.env.REACT_APP_USER_TOKEN, response.token);
   return true;
}

async function signup (credentials) {
   let response = await axios.post(settings.baseURL + settings.signup, credentials);
   if(!response.auth) {
      console.log("Signup Failed");
      return false;
   }

   localStorage.setItem(process.env.REACT_APP_USER_TOKEN, response.token);
   return true; //{...response, token: null};
}

async function logout () {
   // one way to do it
   // let response = await axios.post(settings.baseURL + settings.logout);
   // localStorage.setItem("token", response.token);
   localStorage.setItem(process.env.REACT_APP_USER_TOKEN, null);
}

function getCredentialHeaders() {
   return {
      headers: {
         "x-access-token": localStorage.getItem(process.env.REACT_APP_USER_TOKEN)
      }
   }
}


function getNoCacheCredentialHeaders() {
   return {
      headers: {
         'Cache-Control': 'no-cache',
         'Pragma': 'no-cache',
         'Expires': '0',
         "x-access-token": localStorage.getItem(process.env.REACT_APP_USER_TOKEN)
      }
   }
}


export default {login, logout, signup, getCredentialHeaders, getNoCacheCredentialHeaders};