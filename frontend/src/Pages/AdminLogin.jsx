// Libraries
import { useState } from "react";
import { useNavigate } from "react-router";
import * as yup from "yup";

// services and metadata
import axios from "./../Utils/axios_setup";
import backend_settings from "../backend_settings";

// Components
import FormCard from "../Components/FormCard";
import Modal from "../Components/Modal";




export default function AdminLogin(props) {
   const navigate = useNavigate();
   // hooks
   let [submitting, setSubmitting] = useState(false);
   let [failShow, setFailShow] = useState({message: '', status: false});

   // preset data
   const 
   header = {salutation: "Admin usage only", title: "Login"},
   initialValue = {
      regNo: (process.env.NODE_ENV === "production" ? "" : process.env.REACT_APP_ADMIN_INITIAL_REGNO),
      password: (process.env.NODE_ENV === "production" ? "" : process.env.REACT_APP_ADMIN_INITIAL_PASSWORD)
   },
   validationSchema = yup.object().shape({
      regNo: yup.string().matches(/^[0-9]+$/).required(),
      password: yup.string().min(6).required()
   }),
   inputFields = [
      {
         name: "regNo", 
         label: "Registration No", 
         type:"text", 
         placeholder:"9 digit number"
      },
      {
         name: "password",
         label: "Password",
         type: "password",
         placeholder: "password"
      }
   ], 
   submitData = {
      name: "login", 
      value: "Login"
   },
   
   onSubmit = async (values, actions) => {
      console.log("Something");
      setSubmitting(true);

      try {
         let response = await axios.post(backend_settings.adminLogin, values);
         console.log(response.data);
         
         if(!response.data.auth) {
            console.log("Auth failed: " + response.status);
            setSubmitting(false);
            setFailShow((prev) => {
               prev.status = true;
               prev.message = response.data.message;
               return prev;
            });
            return;
         }

         console.log("Success");
         localStorage.setItem("adminToken", response.data.token);
         navigate("/adminDashboard", {replace: true});
      } catch(err) {
         console.log(err);
         setFailShow((prev) => {
            prev.status = true;
            prev.message = err.data.message;
            return prev;
         });
      }
      setSubmitting(false);
   },
   extraComponents = () => null;// { return <component(s)[array] to be rendered> }




   return (
      <div className="w-screen h-screen grid grid-cols-2">
         <div>
         </div>

         <div className="w-full h-screen flex justify-center items-center bg-[#120F05]">
            <FormCard
               header={header}
               initialValues={initialValue}
               validationSchema={validationSchema}
               inputFields={inputFields}
               submitData={submitData}

               onSubmit={onSubmit}
               extraComponents={extraComponents}
            />
         </div>

         <Modal visible={failShow.status && !submitting} md />
      </div>
   )   
}