import axios from "axios";
import { useState } from "react";
import * as yup from "yup";
import backend_settings from "../backend_settings";

// Components
import FormCard from "../Components/FormCard";

export default function AdminLogin(props) {

   // hooks
   let [submitting, setSubmitting] = useState(false);

   // preset data
   const 
   header = {salutation: "Admin usage only", title: "Login"},
   initialValue = {
      regNo: process.env.ADMIN_INITIAL_REGNO,
      password: process.env.ADMIN_INITIAL_PASSWORD
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
      let response = await axios.post(backend_settings.adminLogin, values);
      console.log(response.data);
      if(!response.data.auth) {
         console.log("Auth failed: " + response.status);
         setSubmitting(false);
         return;
      }


      localStorage.setItem("adminToken", response.data.token);
      setSubmitting(false);
      console.log("Success");
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
      </div>
   )   
}