// Library imports
import Lottie from "react-lottie";
import { useEffect, useState } from "react";

// Components
import Modal from "./../../Components/Modal"

// services and meta
import axios from "./../../Utils/axios_setup"
import backend from "../../backend_settings";

// Assets
import {ReactComponent as FailLogo} from "./../../Assets/svg/failFaceLogo.svg"
import {ReactComponent as LoginLoader} from "./../../Assets/svg/loginLoad.svg"
import * as successAnimationData from "./../../Assets/animations/successAnimation.json"

function ContestCard(props) {
    let {contest, registerSignal, failSignal, successSignal} = props;

    let registerContest = async function() {
        registerSignal(true);

        try {
            let response = await axios.post(backend.register, {contestID: contest._id}, {
                headers: {
                    'x-access-token': localStorage.getItem(process.env.REACT_APP_USER_TOKEN)
                }
            });
            if(response.data.complete) {
                console.log("Registration successful");
                failSignal({status: false})
                successSignal(true);
                registerSignal(false);
            }
            else {
                console.log("Registration could not be completed")
                failSignal((prev) => {
                    prev.status = true;
                    prev.message = response.data.message;
                    return prev;
                })
            }
            registerSignal(false);
        } catch (err) {
            console.log("Registration Failed")
            console.log(err);
            failSignal((prev) => {
                prev.status = true;
                prev.message = err.response.data.message;
                return prev;
            })
            registerSignal(false);
        }
    }

    console.log()
    let startDate = new Date(contest.startTime);
    let endDate = new Date(contest.endTime);

    // from-[#009ffd] via-[#1b64b7] to-[#2288fd]
    return (
    <div className="group w-full h-full px-10 p-5 bg-size-200 bg-pos-0 hover:bg-pos-100 bg-gradient-to-b from-[#009ffd] via-[#1b64b7] to-[#2288fd] transition-all rounded-xl shadow-2xl shadow-[#009ffd]/25 hover:scale-110">
        <h1 className="text-white text-xl font-roboto font-bold transition-all"> {contest.name} </h1>
        <div className="my-4">
        <p className="text-white"> No of Questions: {contest.question.length}</p>
            <p className="text-white"> Starts at: {`${startDate.toDateString()} - ${startDate.toLocaleTimeString()}`}</p>
            <p className="text-white"> Ends at: {`${endDate.toDateString()} - ${endDate.toLocaleTimeString()}`} </p>
        </div>

        <div className="flex justify-center items-center">
            <button className="mx-auto px-4 py-2 hover:bg-white rounded hover:text-black border-2 border-white text-white transition-all bg-transparent" 
                    onClick={registerContest}>
                Register
            </button>
        </div>
    </div>
    )
}



export default function ContestScreen(props) {

    let [registering, setRegistering] = useState(false);
    let [failShow, setFailShow] = useState({message: '', status: false});
    let [contestList, setContestList] = useState();
    let [fetching, setFetching] = useState(false);
    let [success, setSuccess] = useState(false);
    let [refresh, setRefresh] = useState(0);
    // map an array to the contestID

    useEffect(async () => {
        console.log("Effect Underway")
        setFetching(true);
        try {
            let response = await axios.get(backend.activeContestList, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                    'x-access-token': localStorage.getItem("token")
                }
            });

            console.log(response);

            if(response.data.complete) {
                // console.log(response.data.data.contestList);
                setContestList(response.data.data.contestList);
                setFailShow({status: false, message: "" });
                
            } else {
                setContestList(null);
                setFailShow({ status: true, message: response.data.message })
            }

            setFetching(false);
        } catch(err) {
            console.log(err);
            // console.log(err.response);
            // console.log(err.data.message)
            setContestList(null)
            setFailShow({status: true, message:  (err.response && err.response.data ? err.response.data.message : err.message)})
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

    console.log(contestList)
    let showContest = contestList && contestList.length;

    return (
        <div>

        <div className={`w-screen h-screen fixed left-0 top-0 bg-gray-900 -z-20`}>
        </div>

        {/* Main Display Contest page */}
        { showContest ? (
        <div className="w-full h-full p-10">


            <div className="w-full h-fit m-10 px-10 flex justify-start items-center">
                <h1 className="text-white text-6xl font-roboto font-medium"> Available Contests </h1>
            </div>

            <div className="w-full h-full px-20 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">

            {
                contestList && contestList.map((contest) => {
                    return (
                        <ContestCard contest={contest} failSignal={setFailShow} registerSignal={setRegistering} successSignal={setSuccess}/>
                    )
                })
                
            }

            {/* Sample Card - to-[#2a2a72] */}
                {/* <div className="group w-full h-full px-10 p-5 bg-size-200 bg-pos-0 hover:bg-pos-100 bg-gradient-to-b from-[#009ffd] via-[#1b64b7] to-[#2288fd] transition-all rounded-xl shadow-2xl shadow-[#009ffd]/25 hover:scale-110">
                    <h1 className="text-white text-xl font-roboto font-bold transition-all"> Contest Name </h1>
                    <div className="my-4">
                    <p className="text-white"> No of Questions: n</p>
                        <p className="text-white"> Starts at: sometime</p>
                        <p className="text-white"> Ends at: sometime </p>
                    </div>

                    <div className="flex justify-center items-center">
                        <button className="mx-auto px-4 py-2 hover:bg-white rounded hover:text-black border-2 border-white text-white transition-all bg-transparent" >
                            Register
                        </button>
                    </div>
                </div>

                <div className="w-full h-full rounded-xl shadow-2xl shadow-black/20">
                    <p> Something </p>
                </div>

                <div className="w-full h-full rounded-xl shadow-2xl shadow-black/20">
                    <p> Something </p>
                </div>               */}
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
        

        <Modal sm fullScreen visible={fetching || registering}>
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

        <Modal sm visible={!fetching && success} fullScreen>
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
                    eventListeners={[{eventName: "complete", callback: () => { setRefresh(prev => ++prev); setSuccess(false); setRegistering(false); }}]}
                ></Lottie>
                <h1 className="text-white text-4xl font-inter text-center"> Registration Successful </h1>
            </div>
        </Modal>

        </div>
    )
}