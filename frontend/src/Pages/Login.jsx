// Libraries
import Lottie from "react-lottie";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import * as yup from 'yup'

// Assets
import {ReactComponent as FailLogo} from "./../Assets/svg/failFaceLogo.svg"
import {ReactComponent as LoginLoader} from "./../Assets/svg/loginLoad.svg"
import * as successAnimationData from "./../Assets/animations/successAnimation.json"
import * as alertAnimation from "./../Assets/animations/alertAnimation.json"
import * as loginAnimation from "./../Assets/animations/loginAnimation.json"

//Components
import FormCard from "../Components/FormCard";
import Modal from "../Components/Modal";

// services/metadata
import axios from "./../Utils/axios_setup";
import backend_settings from "../backend_settings";




export default function Login(props) {
    
    let navigate = useNavigate();
    
    //hooks
    let [showRedirect, setShowRedirect] = useState(false);
    let [fetching, setFetching] = useState(false);
    let [loginSuccess, setLoginSuccess] = useState(false);
    let [failShow, setFailShow] = useState({status: false, message: ""});
    let [askNavigate, setAskNavigate] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem(process.env.REACT_APP_USER_TOKEN);
        console.log("Found: " + token)
        if(token && token !== "") {
            setShowRedirect(true);
        } 
    }, []);


    useEffect(() => {
        if(askNavigate) {
            console.log("Going to dashboard");
            navigate("/dashboard")
        }
    }, [askNavigate])


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
                localStorage.setItem(process.env.REACT_APP_USER_TOKEN, response.data.token);
                setLoginSuccess(true);
                // setAskNavigate(true);
                // navigate("/dashboard", {replace: true});
            } else {
                console.log("Auth Failed");
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


    // preset data
    let initialValues = {
        // regNo: "",
        email: "",
        password: ""
    }

    let validation = yup.object().shape({
        // regNo: yup.string().matches(/^[0-9]+$/, "RegNo: Must be a number").min(9, "9 digits required").max(9, "9 digits only").required("Required"),
        email: yup.string().email().required(),
        password: yup.string().required("Required")
    })

    

    return (
        <div>
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen justify-end">
            <div className="w-full h-full hidden md:flex flex-col justify-center items-center bg-login-gradient">
                { // Design to be determined.
                    <Lottie
                        options={{
                            loop: true,
                            autoplay: false,
                            animationData: loginAnimation,
                            renderSettings: {
                                preserveAspectRatio: "xMidyMid slice"
                            }
                        }} 
                        width={450}
                        height={500}
                        isStopped={false}
                        isClickToPauseDisabled={true}
                    />
                }
            </div>



            <FormCard
                header={{salutation: "Welcome back", title: "Login to your Account"}}
                initialValues={initialValues}
                validationSchema={validation}
                onSubmit={formikSubmitHandler}
                inputFields={[
                    {
                        label: "Email",
                        name: "email",
                        type: "email",
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
                        className="w-full h-12 justify-center rounded-lg bg-transparent text-white hover:text-white hover:border-white border-2 border-white/20 transition-all duration-300 ease-in-out">
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

        <Modal md visible={fetching}>
                <div className="w-full h-full flex flex-col justify-center items-center" >
                    <LoginLoader className="w-[80%] h-full fill-blue-500" />
                    <h1 className="text-white font-light text-4xl"> Logging in... </h1>
                </div>
        </Modal>

        <Modal md visible={failShow.status && !fetching} removable>
            <div className="w-full h-full flex flex-col justify-center items-center gap-4" >
                <FailLogo className="w-full h-1/2 md:w-1/2 md:h-1/2 fill-rose-400 animate-pulse"></FailLogo>
                <h1 className="text-white text-4xl font-inter text-center"> Login Failed </h1>
                <h1 className="text-white text-4xl font-roboto text-center"> {failShow.message} </h1>
            </div>
        </Modal>

        <Modal md visible={!fetching && loginSuccess}>
            <div className="w-full h-full flex flex-col justify-center items-center gap-4" >
                <Lottie
                    className={"w-full h-full"}
                    options={{
                        loop: false,
                        autoplay: false,
                        animationData: successAnimationData,
                        renderSettings: {
                            preserveAspectRatio: "xMidyMid slice"
                        }
                    }}
                    isStopped={!loginSuccess}
                    isClickToPauseDisabled={true}
                    eventListeners={[{eventName: "complete", callback: () => navigate("/dashboard")}]}
                ></Lottie>
                <h1 className="text-white text-4xl font-inter text-center"> Login Successful </h1>
            </div>
        </Modal>

        <Modal md visible={showRedirect}>
            <div className="w-full h-full flex flex-col justify-center items-center gap-4" >
                <Lottie
                    className={"w-full h-full"}
                    options={{
                        loop: true,
                        autoplay: false,
                        animationData: alertAnimation,
                        renderSettings: {
                            preserveAspectRatio: "xMidyMid slice"
                        }
                    }}
                    isStopped={!showRedirect}
                    isClickToPauseDisabled={true}
                ></Lottie>
                <h1 className="text-white text-4xl font-inter text-center"> An account is already logged in. Proceed to dashboard? </h1>
                
                <div className="mt-10 w-full flex flex-col md:flex-row justify-center items-center gap-5">
                    <button className="w-full p-4 rounded-md text-center text-white text-2xl font-roboto font-medium bg-emerald-500 hover:bg-transparent hover:border-2 hover:border-emerald-500 hover:text-emerald-500 transition-all ease-in-out" onClick={() => navigate("/dashboard")}> Yes</button>
                    <button className="w-full p-4 rounded-md text-center text-white text-2xl font-roboto font-medium bg-rose-500 hover:bg-transparent hover:border-2 hover:border-rose-500 hover:text-rose-500 transition-all ease-in-out" onClick={() => setShowRedirect(false)}> No </button>
                </div>
            </div>
        </Modal>


                
        </div>
    )
}