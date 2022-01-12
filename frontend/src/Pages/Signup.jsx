import axios from "axios";
import { Formik }  from "formik"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import * as yup from 'yup'

import backend_settings from "../backend_settings";
import FormCard from "../Components/FormCard";

function InputField(props) {
    let {name, label, value, placeholder, onChange, type} = props
    return (
        <div className="w-full flex flex-col gap-0">
            <label className="text-lg text-gray-700"> {label} </label>
            <input 
                name={name} 
                type={type} 
                value={value}
                onChange={onChange} 
                placeholder={placeholder}  
                className="block w-full text-white px-4 my-1 h-14 bg-transparent rounded-md border-2 border-white/70 focus:outline-none focus:border-[#5264B5] transition-all ease-in-out duration-300" />
        </div>
    )
}

export default function Signup(props) {

    let navigate = useNavigate();

    
    
    // Function Handlers
    const navigateLogin = (event) => {
        event.preventDefault();
        navigate("/login");
    }
    const onSubmit = async (values, actions) => {
        console.log("Something");
        let response = await axios.post(backend_settings.signup, values);
        console.log(response);
        if(response.data.auth) {
            setFetching(false);
            localStorage.setItem("token", response.data.token);
            navigate("../dashboard");
        } else {
            console.log("Auth Failed");
            console.log(response.data.message);
            setFetching(false);
        }
    }
    
    //hooks
    let [fetching, setFetching] = useState(false);
    let [loginSuccess, setLoginSuccess] = useState();
    
    // preset data
    let header = {
        salutation: "Welcome",
        title: "Register yourself"
    },
    initialValues = {
        name: "",
        regNo: "",
        email: "",
        password: "",
    },
    validationSchema = yup.object().shape({
        name: yup.string().required(),
        regNo: yup.string().matches(/^[0-9]+$/).min(9).max(9).required(),
        email: yup.string().email().required(),
        password: yup.string().min(6, "Minimum 6 characters required").required()
    }),
    inputFields = [
        {
            name: "name",
            label: "Name",
            type: "text",
            placeholder: "John Doe"
        },
        {
            name: "regNo",
            label: "Registration No",
            type: "text",
            placeholder: "9 digit number"
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "john.doe@gmail.com"
        },
        {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "password"
        }
    ],
    submitData = {
        name: "signup",
        value: "Signup"
    },
    extraComponents = () => (
        <button 
            name="signup"
            onClick={navigateLogin} 
            className="w-8/12 h-10 justify-center rounded-lg bg-transparent text-white hover:text-white hover:border-white hover:border-2 transition-all duration-300 ease-in-out">
                Login 
        </button>
    );
    



    // executions
    useEffect(() => {
        let token = localStorage.getItem("token");
        if(token) navigate("dashboard"); 
    });


    
    return (
        <div>
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen justify-end">
            <div className="hidden md:flex h-0">
                { // Design to be determined.
                }
            </div>


            <FormCard
                header={header}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                inputFields={inputFields}
                submitData={submitData}
                extraComponents={extraComponents}
            />

        </div>
        

        <div className={"absolute top-0 left-0 justify-center items-center fixed w-screen h-screen p-20 bg-black/60 " + (fetching ? "flex" : "hidden")}>
            <div className="w-full md:w-1/3 lg:w-1/2 flex justify-center items-center h-5/6 bg-white">
                <img src="loading.gif" /> 
            </div> 
        </div>
                
        </div>
    )
}