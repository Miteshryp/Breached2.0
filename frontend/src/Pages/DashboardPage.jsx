// React imports
import { useEffect, useState } from "react";

// Components
import Dashboard from "./../Components/Dashboard"
import Modal from "../Components/Modal";

// Assets data
import { HomeIcon,ChartBarIcon,DocumentIcon } from "@heroicons/react/solid";
import {ReactComponent as FailLogo} from "./../Assets/svg/failFaceLogo.svg"
import {ReactComponent as IeeeLogo} from "./../Assets/svg/ieee_logo.svg"
import {ReactComponent as LoadingSVG} from "./../Assets/svg/loginLoad.svg"

// Screen
import QuestionScreen from "./Screens/QuestionScreen";
import ContestScreen from "./Screens/ContestScreen"
import LeaderboardScreen from "./Screens/LeaderboardScreen";

export default function DashboardPage() {

    let [authenticated, setAuthenticated] = useState(false);
    let [checked, setChecked] = useState(false);

    useEffect(() => {
        let tokenName = process.env.REACT_APP_USER_TOKEN
        let token = localStorage.getItem(tokenName);
        if(token) {
            setAuthenticated(true);
        }
        setChecked(true);
    }, []);

    let screens = [
        {
            screenComponent: () => {
                return <ContestScreen />
            },
            iconComponent: HomeIcon
        },
        {
            screenComponent: () => {
                return <QuestionScreen />
            },
            iconComponent: DocumentIcon
        },
        {
            screenComponent: () => {
                return <LeaderboardScreen />// <h1> Element 3</h1>
            },
            iconComponent: ChartBarIcon
        },
    ]

    return (
        <div>
            <div className={`${authenticated ? 'flex' : 'hidden'}`} >
                <Dashboard screens={screens} HomeLogo={IeeeLogo} homeRedirect={"/"} bgColor={"bg-sidebar"}  highlightColor={"bg-sidebar-highlight"}/>
            </div>
            <div className={``}>

            </div>

            {/* Failed modal */}
            <Modal md visible={!authenticated && checked}>
                <div className="p-4 flex flex-col justify-center items-center gap-2">
                    <FailLogo className="w-1/2 h-1/2 fill-rose-500 animate-pulse" ></FailLogo>
                    <h1 className="text-white font-inter text-5xl my-4"> Authentication Failed</h1>
                    <h1 className="text-white text-3xl"> Please Login to access dashboard </h1>
                </div>
            </Modal>

            {/* Loading Modal */}
            <Modal md visible={!checked && !authenticated} >
                <div className="flex flex-col justify-center items-center">
                    <LoadingSVG className="w-1/2 h-1/2 fill-sky-400 animate-pulse" />
                    <h1 className="text-white text-5xl">Please wait</h1>
                </div>
            </Modal>
        </div>

    )
}