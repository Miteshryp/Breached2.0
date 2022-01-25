// Library imports
import Lottie from "react-lottie";
import { useEffect, useState } from "react"

// Services
import axios from "./../../Utils/axios_setup";
import services from "./../../Utils/services"

// Component imports
import QuestionCard from "../../Components/QuestionCard"
import Modal from "../../Components/Modal";

// Meta data
import backend_settings from "./../../backend_settings";

// Assets imports
import {ReactComponent as Loader} from "./../../Assets/svg/loginLoad.svg"
import {ReactComponent as FailLogo} from "./../../Assets/svg/failFaceLogo.svg"
import * as successAnimationData from "./../../Assets/animations/successAnimation.json"
import * as alertAnimation from "./../../Assets/animations/alertAnimation.json"


export default function QuestionScreen() {

    let [fetching, setFetching] = useState(true);
    let [failShow, setFailShow] = useState({message: '', status: false});
    let [question, setQuestion] = useState(null);
    let [submitSuccess, setSubmitSuccess] = useState(false);
    let [incorrect, setIncorrect] = useState(false);
    let [contestEnd, setContestEnd] = useState({endCredit: null, status: false});

    let [refresh, setRefresh] = useState(1);

    useEffect(() => {
        setRefresh(prev => ++prev);
    }, []);

    useEffect(async () => {
        try {
            setFetching(true);
            let fetch = await axios.get(backend_settings.getCurrentQuestion, services.auth.getNoCacheCredentialHeaders());
    
            if(fetch.data.complete) {
                console.log("Fetch Successful")
                setQuestion(fetch.data.data.question);
                setFetching(false);
                // setFetching(false);
            } else if(fetch.data.end) {
                setContestEnd({status: true, endCredit: fetch.data.data.endCredit});
                setQuestion(null);
                setFetching(false);
            }   else {
                console.log(fetch.data.message);
                setFailShow({title: "Questions not available", message: fetch.data.message, status: true})
            }
        } catch(err) {
            // console.log(err.response.status)
            if(err.response.status === 500 || err.response.status === 300) {
                console.log(err.response.data.message);
                setFailShow({title: "Questions not available", message: err.response.data.message, status: true});
            } else {
                console.log("Request Failed")
                console.log(err);
                setFailShow({title: "Questions not available", message: err.message, status: true})
            }
        } finally {
            setFetching(false);
        }
    }, [refresh]);

    return (
        <div>
        
        {/* Background */}
        <div className="fixed top-0 left-0 w-full h-full bg-dashboard -z-50">
        </div>

        {/* Question Card */}
        { question && 
        <div className={`md:px-14 md:py-10 w-full h-screen ${failShow.title === "Questions not available" && !fetching ? 'hidden' : ''} `}>
            <QuestionCard question={question} signalSubmit={setFetching} signalSuccess={setSubmitSuccess} signalFail={setFailShow} signalWrongAnswer={setIncorrect}/>
        </div>
        }

        {
            contestEnd && contestEnd.status && (
                <div className="p-10 lg:p-20 w-full h-full rounded-2xl bg-card">
                    
                    {
                        contestEnd.endCredit.map((element, index) => {
                            if(index === 0)
                            return (
                                <h1 className="mb-10 mx-auto text-white text-6xl font-inter font-bold"> {element} </h1>
                            )
                            return (
                                <p className="mb-7 text-white text-xl font-inter font-light">
                                    {element}
                                </p>
                            )
                        })
                    }
                </div>
            )
        }

        {/* Modal background */}
        <div className={`fixed top-0 left-0 w-full h-full lg:w-screen ${failShow.status || fetching ? '' : 'hidden'} bg-gray-500`}>
        </div>

        {/* Loading Modal */}
        <Modal md visible={fetching} fullScreen>
                <div className="w-full h-full flex flex-col justify-center items-center" >
                    <Loader className="w-[80%] h-full fill-blue-500" />
                    <h1 className="text-white font-light text-4xl"> Please wait </h1>
                </div>
        </Modal>


        {/* Failure Modal */}
        <Modal md visible={failShow.status && !fetching} fullScreen>
            <div className="w-full h-full flex flex-col justify-center items-center gap-5" >
                {/* <FailLogo className="w-full h-1/2 md:w-1/2 md:h-1/2 fill-rose-400 animate-pulse"></FailLogo> */}
                <Lottie
                    options={{
                        animationData: alertAnimation,
                        loop: true,
                        autoplay: false,
                        rendererSettings: {
                            preserveAspectRatio: 'xMidYMid slice'
                          }
                    }}
                    width={300} height={300}
                    isStopped={!failShow.status}
                />
                <h1 className="text-white text-4xl font-inter text-center"> {failShow.title}</h1>
                <h1 className="text-white text-4xl font-roboto text-center"> {failShow.message} </h1>
            </div>
        </Modal>

        {/* Incorrect Answer  */}
        <Modal md visible={incorrect && !fetching} removable fullScreen>
            <div className="w-full h-full flex flex-col justify-center items-center gap-5" >
                <FailLogo className="w-full h-1/2 md:w-1/2 md:h-1/2 fill-rose-400 animate-pulse"></FailLogo>
                <h1 className="text-white text-4xl font-inter text-center"> Incorrect Answer </h1>
                {/* <h1 className="text-white text-4xl font-roboto text-center">  </h1> */}
                <button
                    onClick={() => {
                        setIncorrect(false)
                        setRefresh(prev => prev++);
                    }}
                    className="mt-20 w-[80%] h-fit p-3 group flex flex-row justify-center items-center gap-3 hover:bg-emerald-500 bg-transparent outline-1 outline-double outline-emerald-500 backdrop-blur-3xl rounded transition-all ease-in-out duration-300">
                        <p className="group-hover:text-white text-2xl font-light font-roboto text-emerald-500"> Retry </p>
                </button>
            </div>
        </Modal>


        {/* Success Modal  */}
        <Modal md visible={!fetching && submitSuccess}>
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
                    isStopped={!submitSuccess}
                    isClickToPauseDisabled={true}
                    eventListeners={[{eventName: "complete", callback: () => { setRefresh(prev => ++prev); setSubmitSuccess(false); }}]}
                ></Lottie>
                <h1 className="text-white text-4xl font-inter text-center"> Correct Answer </h1>
            </div>
        </Modal>
        </div>
    )
}