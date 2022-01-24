
// Library
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


// metadata
import axios from "./../Utils/axios_setup"
import backend_settings from "../backend_settings";
import services from "../Utils/services";

// Assets
import ieeeLogo from "./../Assets/svg/ieee_logo.svg"
import accountLogo from "./../Assets/svg/account_logo.svg";
import AccountRedirect from "./AccountRedirect";

function ListItem(props) {
    let {redirect, className, value} = props;

    return <li className={className}> 
        <Link to={redirect}> {value} </Link>
     </li> 
}


export default function Navbar(props) {
    
    let {links} = props;
    let navigate = useNavigate();

    let [userData, setUserData] = useState(null);
    let [update, forceUpdate] = useState(0);

    useEffect(async () => {
        try {
            let responseData = await axios.get(backend_settings.accountDetails, services.auth.getNoCacheCredentialHeaders());

            if(responseData.data.complete) {
                // console.log(responseData.data)
                setUserData(responseData.data.data.account);
            } else {
                console.log("User not logged in");
                setUserData(null);
            }
        } catch(err){
            if(err.response) {
                console.error("ERROR: ")
                console.error(err.response.message);
            } else {
                console.error("Fatal Error: Failed to fetch user details");
                // Failed to connect to server.
            }
            setUserData(null);
        }
    }, [])

    const isSignedIn = () =>{
        let token = localStorage.getItem(process.env.REACT_APP_USER_TOKEN);
        if(token) return true;
        return false;
    }
    
    const buttonClick = () => {
        navigate("/login");
    }

    return (
        <div className=" sticky top-0 flex h-20 px-10 lg:mx-10 py-4 w-auto border-white/10 border-b-4 border-solid z-50 bg-transparent backdrop-blur-lg drop-shadow-2xl">
            
            
            {/* logo */}
            <div className="mx-4 my-auto flex-auto justify-start bg-transparent">
                <img src={ieeeLogo} className="w-auto h-9" />
            </div>



            {/* List of components */}
            <div className="flex flex-end">

                <ul className="hidden md:flex md:flex-start mx-8">
                    { links.map((elem) => {
                        return <ListItem redirect={elem.redirect} className="w-fit mx-4 my-auto text-white transition duration-300 hover:text-[#667EEA]" value={elem.heading}/>
                    })}
                </ul>

                
            {/* Account */}
            { userData && isSignedIn() ? ( 
                // <AccountRedirect />
                <div className="grid grid-cols-1 my-auto mx-12 justify-items-end">
                    {/* <div className="p-4 w-12 h-auto rounded-full bg-[#181823]/40 flex flex-row justify-end items-end" >
                        <img src={accountLogo} className=""></img>
                    </div> */}
                    <AccountRedirect forceUpdate={() => {
                        forceUpdate(prev => ++prev);
                    }} name={userData.name} />
                    {/* <span className="col-span-2 text-white/70 my-auto ml-2"> {userData.name} </span>  */}
                </div>
            ) 
                :

            //  Login Button
            (
                <div className="flex flex-center mx-auto">
                    <button onClick={buttonClick} className="w-36 h-full md:h-auto  rounded-md bg-white/20 justify-center text-center text-[#667EEA]
                            hover:bg-[#667EEA] hover:text-white hover:scale-x-110
                            transition ease-in hover:ease-out duration-300"> Login </button> 
                </div>
            )
            }

            </div>

        </div>
    )
}