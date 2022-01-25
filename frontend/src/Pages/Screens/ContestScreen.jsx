// Library imports
import Lottie from "react-lottie";
import { useEffect, useState } from "react";

// Components
import Modal from "./../../Components/Modal"
import ContestCard from "../../Components/ContestCard";

// services and meta
import axios from "./../../Utils/axios_setup"
import backend from "../../backend_settings";

// Assets
import {ReactComponent as FailLogo} from "./../../Assets/svg/failFaceLogo.svg"
import {ReactComponent as LoginLoader} from "./../../Assets/svg/loginLoad.svg"
import * as successAnimationData from "./../../Assets/animations/successAnimation.json"
import services from "../../Utils/services";




export default function ContestScreen(props) {

    let [registering, setRegistering] = useState(false);
    let [failShow, setFailShow] = useState({message: '', status: false});
    let [contestList, setContestList] = useState();
    let [description, setDescription] = useState();
    let [fetching, setFetching] = useState(false);
    let [success, setSuccess] = useState(false);
    let [registered, setAlert] = useState(false);
    let [refresh, setRefresh] = useState(0);
    // map an array to the contestID

    useEffect(async () => {
        setFetching(true);
        try {
            let response = await axios.get(backend.activeContestList, services.auth.getNoCacheCredentialHeaders());

            if(response.data.complete) {
                // console.log(response.data.data.contestList);
                setContestList(response.data.data.contestList);
                setFailShow({status: false, message: "" });
                
            } else {
                setContestList(null);
                setFailShow({ status: true, message: response.data.message })
            }

            let descriptionResponse = await axios.get(backend.getContestDescription, services.auth.getNoCacheCredentialHeaders());
            if(descriptionResponse.data.complete) {
                // console.log(descriptionResponse.data.data.description);
                // console.log(response.data.data.description);
                setDescription(descriptionResponse.data.data.description);
                setFailShow({status: false, message: "" });
                
            } else {
                setFailShow({ status: true, message: response.data.message })
            }

            setFetching(false);
        } catch(err) {
            console.log(err);
            if(err.response.status === 300) {
                setAlert(true);
            } else {
                setFailShow({status: true, message:  (err.response && err.response.data ? err.response.data.message : err.message)});
            }
            // console.log(err.response);
            // console.log(err.data.message)
            setContestList(null)
            setFetching(false);
        }
    }, [refresh]);

    useEffect(() => {
        setRefresh(prev => prev++);
    }, [])


    // const registerContest = async () => {
    //     setRegistering(true);
    //     console.log("registering");
    //     try {
    //         let response = await axios.post(backend.register, {contestID}, {
    //             headers: {
    //                 'x-access-token': localStorage.getItem(process.env.REACT_APP_USER_TOKEN)
    //             }
    //         });
    //         if(response.data.complete) {
    //             console.log("Registration successful");
    //             setFailShow((prev) => {
    //                 prev.status = false;
    //                 return prev;
    //             })
    //         }
    //         else {
    //             console.log("Registration could not be completed")
    //             setFailShow((prev) => {
    //                 prev.status = true;
    //                 prev.message = response.data.message;
    //                 return prev;
    //             })
    //         }
    //         setRegistering(false);
    //     } catch (err) {
    //         console.log("Registration Failed")
    //         console.log(err);
    //         setFailShow((prev) => {
    //             prev.status = true;
    //             prev.message = err.data.message;
    //             return prev;
    //         })
    //         setRegistering(false);
    //     }
    // }

    let showContest = contestList && contestList.length;

    return (
        <div>

        <div className={`w-screen h-full fixed left-0 top-0 bg-dashboard -z-20`}>
        </div>

        {/* Main Display Contest page */}
        { showContest ? (
        <div className="w-full h-full p-1 md:p-10">
            
            <div className="mb-40 w-full h-fit m-5 md:m-10 px-0 md:px-10 flex flex-col justify-start items-start">
                <h1 className="text-white text-6xl font-roboto font-bold">
                    Prologue
                </h1>

                <div className="mt-10 flex flex-col gap-5">
                    { description && description.map((element) => {
                        return( 
                        <p className="mb-3 text-white text-2xl font-roboto font-light">
                            {element}
                        </p>
                        )
                    })
                        
                    }
                </div>
            </div>   

            <div className="w-full h-fit m-5 md:m-10 md:px-10 flex justify-start items-center">
                <h1 className="text-white text-6xl font-roboto font-bold"> Contests </h1>
            </div>

            <div className="w-full h-full px-5 md:px-20 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">

            {
                contestList && contestList.map((contest) => {
                    return (
                        <ContestCard contest={contest} failSignal={setFailShow} registerSignal={setRegistering} successSignal={setSuccess}/>
                    )
                })
                
            }
            </div>
        </div>
        ): ("")}

        { (!showContest) ? (
            <div className="w-[97vw] h-[80vh] flex flex-col justify-center items-center">
                <h1 className="text-gray-400 font-inter font-bold text-3xl"> No Contests available </h1>
            </div>
            )
            :
            (<div></div>)
        }
        

        <Modal md fullScreen visible={fetching || registering}>
                <div className="w-full h-full flex flex-col justify-center items-center" >
                    <LoginLoader className="w-[80%] h-full fill-blue-500" />
                    <h1 className="text-white font-light text-4xl"> Please wait... </h1>
                </div>
        </Modal>

        <Modal md fullScreen visible={failShow.status && !fetching && !registering}>
            <div className="w-full h-full flex flex-col justify-center items-center gap-4" >
                <FailLogo className="w-full h-1/2 md:w-1/2 md:h-1/2 fill-rose-400 animate-pulse"></FailLogo>
                <h1 className="text-white text-4xl font-inter text-center"> Fetch Failed </h1>
                <h1 className="text-white text-4xl font-roboto text-center"> {failShow.message} </h1>
            </div>
        </Modal>

        <Modal md visible={!fetching && success} fullScreen>
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
                    isStopped={!success}
                    isClickToPauseDisabled={true}
                    // eventListeners={[{eventName: "complete", callback: () => { setRefresh(prev => ++prev); setSuccess(false); setRegistering(false); }}]}
                ></Lottie>
                <h1 className="text-white text-4xl font-inter text-center"> Registration Successful </h1>
            </div>
        </Modal>

        {/* Alert Modal */}
        <Modal md visible={registered && !fetching} fullScreen>
            <div className="w-full h-full flex flex-col justify-center items-center gap-5" >
                {/* <FailLogo className="w-full h-1/2 md:w-1/2 md:h-1/2 fill-rose-400 animate-pulse"></FailLogo> */}
                <Lottie
                    options={{
                        animationData: successAnimationData,
                        loop: false,
                        autoplay: false,
                        rendererSettings: {
                            preserveAspectRatio: 'xMidYMid slice'
                          }
                    }}
                    width={300} height={300}
                    isStopped={!registered}
                    isClickToPauseDisabled={true}
                />
                <h1 className="text-white text-4xl font-inter text-center"> Already Registered </h1>
                {/* <h1 className="text-white text-4xl font-roboto text-center"> {failShow.message} </h1> */}
            </div>
        </Modal>

        </div>
    )
}