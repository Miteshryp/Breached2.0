import Lottie from "react-lottie";
import { useEffect, useState } from "react";

import Modal from "../../Components/Modal";

import backend_settings from "../../backend_settings";
import services from "../../Utils/services";

import axios from "./../../Utils/axios_setup"

import alertAnimation from "./../../Assets/animations/alertAnimation.json"
import {ReactComponent as Loader} from "./../../Assets/svg/loginLoad.svg"

export default function LeaderboardScreen(props) {

    let [fetching, setFetching] = useState(false);
    let [failShow, setFailShow] = useState(false);
    let [responseData, setResponseData] = useState(null);

    // console.log(responseData);

    useEffect(async () => {
        setFetching(true)
        try {
            let fetch = await axios.get(backend_settings.getOverallLeaderboard, services.auth.getNoCacheCredentialHeaders());
            console.log("Fetching Leaderboard")
            if(fetch.data.complete) {
                setResponseData(fetch.data.data);
                setFetching(false);
                setFailShow({status: false, message: ""});
            } else {
                setResponseData(null);
                setFailShow({status: true, message: fetch.data.message});
            }
        } catch(err) {
            if(err.response && (err.response.status === 500 || err.response.status === 300) ) {
                setResponseData(null);
                setFailShow({status: true, message: err.response.data.message});    
            } else {
                setResponseData(null);
                setFailShow({status: true, message: err.message});
            }
        } finally {
            setFetching(false);
        }
    }, []);

    return (
        <div>
            <div className="fixed w-screen h-screen top-0 left-0 bg-dashboard -z-10"></div>
            {( responseData &&
            <div className={`py-10 lg:p-10 flex flex-col justify-center items-center`}>
                <h1 className="text-white text-6xl font-inter font-bold">Leaderboard</h1>
                <div className="w-full h-full mt-20 px-5 flex flex-col">
                    <h1 className="text-white text-3xl font-inter font-normal justify-self-end"> Your rank: {responseData.rank > 0 ? responseData.rank : "-"}</h1>
                </div>
                <div className="w-full h-full flex my-5 justify-center items-center scrollbar-none">
                    <table className="w-full table-fixed">
                        <thead className="bg-contest-card-hover">
                            <td className="py-7 text-center text-white sm:text-xl font-inter font-bold justify-center rounded-tl-xl pl-4">Rank</td>
                            <td className="py-7 text-center text-white sm:text-xl font-inter font-bold justify-center">Team Name</td>
                            <td className="py-7 text-center text-white sm:text-xl font-inter font-bold justify-center">Reg No.</td>
                            <td className="py-7 text-center text-white sm:text-xl font-inter font-bold justify-center rounded-tr-xl ">Score</td>
                        </thead>
                        <tbody className="w-full h-[70%] overflow-x-hidden overflow-y-scroll scrollbar-none"> 
                        { responseData.rankList.map((element, index) => {
                            return  (
                                <tr className={`group ${responseData.rank === index + 1 ? "bg-emerald-500" : "bg-gray-600/50"} rounded`}>
                                    <td className=" text-center py-5 text-white sm:text-xl font-inter font-thin group-last:rounded-bl-xl "> {index + 1} </td>
                                    <td className=" text-center py-5 text-white sm:text-xl font-inter font-thin"> {element.name} </td>
                                    <td className=" text-center py-5 text-white sm:text-xl font-inter font-thin"> {element.regNo} </td>
                                    <td className=" text-center py-5 text-white sm:text-xl font-inter font-thin group-last:rounded-br-xl"> {element.score} </td>    
                                </tr>
                            )
                        })
                            
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            )}

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
                        width={350}
                        height={350}
                        isStopped={!failShow.status}
                    />
                    <h1 className="text-white text-4xl font-inter text-center"> Leaderboard Unavailable </h1>
                    <h1 className="text-white text-4xl font-roboto text-center"> {failShow.message} </h1>
                </div>
            </Modal>

            <Modal md fullScreen visible={fetching}>
                <div className="w-full h-full flex flex-col justify-center items-center" >
                    <Loader className="w-[80%] h-full fill-blue-500" />
                    <h1 className="text-white font-light text-4xl"> Please wait... </h1>
                </div>
            </Modal>

        </div>
    )
}