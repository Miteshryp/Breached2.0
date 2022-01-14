import axios from "./../Utils/axios_setup";
import {ReactComponent as FailLogo} from "./../Assets/svg/failFaceLogo.svg"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import * as yup from 'yup'

import {ReactComponent as LoginLoader} from "./../Assets/svg/loginLoad.svg"

//Components
import InputField from "../Components/InputField";

import backend_settings from "../backend_settings";
import FormCard from "../Components/FormCard";
import Modal from "../Components/Modal";


export default function Login(props) {

    let navigate = useNavigate();

    let [failShow, setFailShow] = useState({status: false, message: ""});
    let [askNavigate, setAskNavigate] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem("token");
        if(token) {
            setAskNavigate(true);
        } 
    });


    // Function Handlers
    const navigateSignup = (event) => {
        event.preventDefault();
        navigate("/signup");
    }

    const formikSubmitHandler = async (values, actions) => {
        // console.log(values);
        setFetching(true);
        try {
            let response = await axios.post(backend_settings.login, values);
            // console.log(...response);
            if(response.data.auth) {
                setFetching(false);
                localStorage.setItem("token", response.data.token);
                // setAskNavigate(true);
                navigate("/dashboard", {replace: true});
            } else {
                console.log("Auth Failed");
                console.log(response.data.message);
                setFailShow({status: true, message: response.data.message});
                setFetching(false);
            }
        } catch(err) {
            console.log(err);
            if(err.response) {
                setFailShow({status: true, message: err.response.data.message});
            } else {
                console.log(err.message);
                setFailShow({status: true, message: err.message});
            }
        } finally {
            setFetching(false);
        }
    }

    //hooks
    let [fetching, setFetching] = useState(false);
    let [loginSuccess, setLoginSuccess] = useState();

    // preset data
    let initialValues = {
        regNo: "",
        password: ""
    }

    let validation = yup.object().shape({
        regNo: yup.string().matches(/^[0-9]+$/).min(9).max(9).required(),
        password: yup.string().required()
    })

    

    return (
        <div>
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen justify-end">
            <div className="hidden md:flex h-0">
                { // Design to be determined.
                }
            </div>



            <FormCard
                rememberMe
                header={{salutation: "Welcome back", title: "Login to your Account"}}
                initialValues={initialValues}
                validationSchema={validation}
                onSubmit={formikSubmitHandler}
                inputFields={[
                    {
                        label: "Registration No",
                        name: "regNo",
                        type: "text",
                        placeholder: ""
                    },
                    {
                        label: "Password",
                        name: "password",
                        type: "password",
                        placeholder: "password"
                    }
                ]}
                submitData={
                    {
                        name: "login",
                        value: "Login"
                    }
                }

                extraComponents={() => 
                (
                    [<button 
                        name="signup" 
                        onClick={navigateSignup} 
                        className="w-8/12 h-10 justify-center rounded-lg bg-transparent text-white hover:text-white hover:border-white hover:border-2 transition-all duration-300 ease-in-out">
                             Signup
                    </button>
                ]
                )}
            />
        </div>
        

        {/* <div className={"absolute top-0 left-0 justify-center items-center fixed w-screen h-screen px-20 bg-black/60 " + (fetching ? "flex" : "hidden")}>
            <div className="relative w-full md:w-1/3 lg:w-1/2 h-5/6 rounded-lg bg-gray-900">
                <div className="w-full h-full flex justify-center items-center" >
                 <LoginLoader className="fill-blue-500" />
                </div>

            </div> 
        </div> */}

        <Modal sm visible={fetching}>
                <div className="w-full h-full flex flex-col justify-center items-center" >
                    <LoginLoader className="w-[80%] h-full fill-blue-500" />
                    <h1 className="text-white font-light text-4xl"> Logging in... </h1>
                </div>
        </Modal>

        <Modal sm visible={failShow.status && !fetching} removable>
            <div className="w-full h-full flex flex-col justify-center items-center gap-4" >
                <FailLogo className="w-full h-1/2 md:w-1/2 md:h-1/2 fill-rose-400 animate-pulse"></FailLogo>
                <h1 className="text-white text-4xl font-inter text-center"> Login Failed </h1>
                <h1 className="text-white text-4xl font-roboto text-center"> {failShow.message} </h1>
            </div>
        </Modal>


                
        </div>
    )
}