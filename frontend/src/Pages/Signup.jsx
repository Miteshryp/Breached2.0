// Library imports
import Lottie from "react-lottie";
import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router";
import * as yup from 'yup'

// Components
import Modal from "../Components/Modal";
import FormCard from "../Components/FormCard";

// Assets
import * as successAnimationData from "./../Assets/animations/successAnimation.json"
import * as alertAnimation from "./../Assets/animations/alertAnimation.json"
import * as registerAnimation from "./../Assets/animations/registerAnimation.json"
import {ReactComponent as Loader} from "./../Assets/svg/loginLoad.svg"
import {ReactComponent as FailLogo} from "./../Assets/svg/failFaceLogo.svg"

// metadata
import backend_settings from "../backend_settings";


export default function Signup(props) {
    
    let navigate = useNavigate();
    //hooks
    let [fetching, setFetching] = useState(false);
    let [failShow, setFailShow] = useState({message: '', status: false});
    let [complete, setComplete] = useState(false);
    let [askProceed, setAskProceed] = useState(false);
    
    // Function Handlers
    const navigateLogin = (event) => {
        event.preventDefault();
        navigate("/login");
    }
    const onSubmit = async (values, actions) => {
        console.log("Something");
        setFetching(true);
        try {
            let response = await axios.post(backend_settings.signup, values);
            if(response.data.auth) {
                setFetching(false);
                localStorage.setItem(process.env.REACT_APP_USER_TOKEN, response.data.token);
                setComplete(true);
                setFailShow({message: "", status: false})
                // navigate("../dashboard");
            } else {
                console.log("Auth Failed");
                setFetching(false);
                setFailShow({
                    status: true,
                    message: response.response.data.message
                });
            }
        } catch(err) {
            console.log(err);
            setFetching(false);
            setFailShow({
                status: true,
                message: (err.response && err.response.data ? err.response.data.message : err.message)
            });
        }
    }
    
    // preset data
    let header = {
        salutation: "Welcome",
        title: "Register your team"
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
            label: "Team Name",
            type: "text",
            placeholder: "John Doe's Team"
        },
        {
            name: "regNo",
            label: "Leader's Registration No",
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
            className="w-full h-12 justify-center rounded-lg bg-transparent text-white hover:text-white hover:border-white border-2 border-white/20 transition-all duration-300 ease-in-out">
                Login 
        </button>
    );

    return (
        <div>
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen justify-end">
            <div className="hidden md:flex justify-center items-center">
                { // Design to be determined.
                    <Lottie
                    options={{
                        loop: true,
                        autoplay: false,
                        animationData: registerAnimation,
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
                header={header}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                inputFields={inputFields}
                submitData={submitData}
                extraComponents={extraComponents}
            />

        </div>



        <Modal md visible={!fetching && complete}>
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
                    isStopped={!complete}
                    isClickToPauseDisabled={true}
                    eventListeners={[{eventName: "complete", callback: () => setAskProceed(true)}]}
                ></Lottie>
                <h1 className="text-white text-4xl font-inter text-center"> Signup Successful </h1>
            </div>
        </Modal>

        <Modal md visible={askProceed}>
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
                    isStopped={!askProceed}
                    isClickToPauseDisabled={true}
                ></Lottie>
                <h1 className="text-white text-4xl font-inter text-center"> Login and proceed with this account? </h1>
                
                <div className="mt-10 w-full flex flex-col md:flex-row justify-center items-center gap-5">
                    <button className="w-full p-4 rounded-md text-center text-white text-2xl font-roboto font-medium bg-emerald-500 hover:bg-transparent hover:border-2 hover:border-emerald-500 hover:text-emerald-500 transition-all ease-in-out" onClick={() => navigate("/dashboard")}> Yes</button>
                    <button className="w-full p-4 rounded-md text-center text-white text-2xl font-roboto font-medium bg-rose-500 hover:bg-transparent hover:border-2 hover:border-rose-500 hover:text-rose-500 transition-all ease-in-out" onClick={() =>{localStorage.setItem(process.env.REACT_APP_USER_TOKEN, ""); setAskProceed(false); setComplete(false)}}> No </button>
                </div>
            </div>
        </Modal>


        <Modal md visible={fetching}>
            <div className="w-full h-full flex flex-col justify-center items-center" >
                <Loader className="w-[80%] h-full fill-blue-500" />
                <h1 className="text-white font-light text-4xl"> Signing up... </h1>
            </div>
        </Modal>

        <Modal md visible={failShow.status && !fetching} removable>
            <div className="w-full h-full flex flex-col justify-center items-center gap-4" >
                <FailLogo className="w-full h-1/2 md:w-1/2 md:h-1/2 fill-rose-400 animate-pulse"></FailLogo>
                <h1 className="text-white text-4xl font-inter text-center"> Signup Failed </h1>
                <h1 className="text-white text-4xl font-roboto text-center"> {failShow.message} </h1>
            </div>
        </Modal>
                
        </div>
    )
}