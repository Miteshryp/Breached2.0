// Libraries
import { useNavigate } from "react-router";

// Components
import FaqCard from "../Components/FAQCard";
import Navbar from "../Components/Navbar";

// services/metadata
import faqData from "./../Assets/data/faqData"
import contactData from "./../Assets/data/contactData"
import {ReactComponent as IeeeLogo} from "./../Assets/svg/ieee_logo.svg"
import {ReactComponent as IeeeDomeLogo} from "./../Assets/svg/IeeeDomeLogo.svg"
// import {FaInstagramSquare} from "react-icons/fa"
import {AiFillLinkedin, AiOutlineInstagram, AiOutlineLinkedin, AiOutlineMedium, AiFillMediumCircle} from "react-icons/ai"
import {BsFacebook} from "react-icons/bs"
import {IoIosCall} from "react-icons/io"
import {FaDiscord} from "react-icons/fa" 

export default function LandingPage(props) {
    let navigate = useNavigate();

    let linkArr = [

    ];
    
    
    
    
    const rules = [
    "The time limit for Round 1 is 24 hours. The objective of the hunt is to finish the hunt as soon as possible.", 
    "Only the team leader is supposed to register for the team. Only one account per team is allowed. Other members of the team are to use the same account for login.",
    "All official hints will be released on the Breached 2.0 discord server. Collusion with other team players is not allowed and will lead to disqualification if caught.",
    "The leaderboard is time based. Meaning teams solving the problems in the least amount of time will be at the top"
    ];


    const contactInfo = [
        {
            name: "Shaleen Poddar",
            contact: "+91 98254 40501"
        },
        {
            name: "Ronak Modi",
            contact: "+91 81068 53161"
        }
    ];


    const socials = [
        {
            url: "https://www.instagram.com/ieeemuj/",
            Icon: <AiOutlineInstagram className="w-[45px] h-full" fill="#ffffff"/>
        },
        {
            url:"https://medium.com/@ieeemuj",
            Icon: <AiFillMediumCircle className="w-[45px] h-full" fill="#ffffff" />
        },
        {
            url:"https://www.linkedin.com/company/ieeesbmuj/",
            Icon: <AiFillLinkedin className="w-[45px] h-full fill-white" />
        },
        {
            url: "https://www.facebook.com/ieeemuj/",
            Icon: <BsFacebook className="w-[45px] h-full fill-white"/>
        }
    ]




    const signupRedirect = () =>{ 
        navigate('/signup')
    }
    const discordRedirect = () => {
        window.location.href = "https://discord.gg/Fv3PTJy9";
        return null;
    }
    return (
        <div>
            <div id="intro" className="fixed top-0 left-0 w-screen h-[350vh] -z-50 bg-landing blur-lg opacity-100">
            </div>
            <div className='px-10 md:px-20 w-full h-fit bg-[#000000] mix-blend-screen'>
                <Navbar links={linkArr} />

                {/* Intro Section */}
                <div className="my-18 flex flex-col gap-10 h-fit px-0 lg:px-[13.5rem] py-16 justify-center items-center" >
                    <div className="flex flex-col justify-center items-center gap-2">
                        <h1 className="font-inter font-bold text-white text-6xl md:text-8xl text-center"> BREACHED 2.0 </h1>
                        <h1 className="font-inter font-bold text-white text-6xl md:text-8xl text-center text-white/60">PATIENT ZERO </h1>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                    <p  className="font-inter font-medium text-white/80 text-center text-xl"> 
                        BIO-ATTACK AT STATION 1. DEADLY PATHOGEN RELEASED!
                    </p>
                    <p className="font-inter font-medium text-white/80 text-center text-xl">
                        IEEE SB MUJ is back with the second edition of its annual Cryptic Hunt! Venture through this mysterious quest, where you just won't be able to get enough of that sweet, sweet feeling of anticipation. So, are you ready for the chase?
                    </p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="w-full py-12 flex flex-col md:flex-row gap-6 justify-center items-center">
                    <button onClick={signupRedirect} className="w-9/12 md:w-3/12 h-12 rounded-sm text-white text-xl font-bold font-inter bg-[#fd7e17] hover:scale-110 transition-all duration-300"> Register </button>
                    <button onClick={discordRedirect}    className="w-9/12 md:w-3/12 h-12 rounded-sm flex flex-row justify-center items-center text-[#5460E6] hover:text-white text-xl font-bold font-inter bg-transparent outline-1 outline-[#5460E6] outline-double transition-all duration-300 hover:bg-[#5460E6]">
                        <FaDiscord className="w-fit h-full m-3" /> Join Discord
                    </button> 
                </div>
                
                {/* Rules */}
                <div className="my-40 w-full h-fit flex flex-col justify-center items-center">
                <div className="w-full px-auto lg:pl-[10.5rem] flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-2">
                    <div className="lg:row-span-2 p-5  flex flex-col justify-center items-center lg:justify-start lg:items-start">
                        <h1 className="text-white text-5xl lg:text-7xl font-inter font-bold"> Rules </h1>
                    </div>
                    { 
                        rules.map((element, index) => {
                            return (
                            <div className="p-4 flex flex-col justify-center items-center lg:justify-start lg:items-start">
                                <h1 className="hidden lg:flex text-white text-4xl font-inter font-bold">
                                    {index+1}.
                                </h1>
                                <p className="text-white/80 lg:text-white/40 text-xl font-roboto font-light"><span className="inline lg:hidden text-white font-bold">{index+1}.</span> {element} </p>
                            </div>
                            )
                        })
                    }
                </div>
                </div>

                {/* FAQ */}
                <div id="faq" className="w-full h-fit py-30 flex flex-col gap-5 items-center">
                    <h1 className="hidden sm:block text-white text-5xl md:text-5xl font-bold font-inter ">Frequently Asked Questions</h1>
                    <h1 className="block sm:hidden text-white text-5xl md:text-7xl font-bold font-inter ">FAQ's</h1>

                    <div className="w-screen px-10 my-10 md:w-[60vw] flex flex-col justify-center items-center gap-3">
                        {faqData.map((data) => <FaqCard data={data} />)}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="w-full h-fit py-20 pl-4 px-[10%] bg-[#181823]">
                <div className="p-2 flex flex-col justify-center items-center lg:grid lg:grid-cols-2 gap-20">
                    <div className="flex flex-col justify-start items-start">
                        {/* <IeeeLogo className=""/> */}
                        <IeeeDomeLogo onClick={() => {
                            window.location.href = "https://ieeemuj.com/";
                            return null;
                        }} className="w-full lg:w-[80%] h-full" />
                    </div>

                    {/* Contact Us */}
                    <div className="my-12 lg:my-0 grid grid-cols-2 gap-24 lg:gap-10" >
                        <div className="flex flex-col gap-1">
                            <h1 className="text-white text-xl font-inter font-bold"> 
                                Contact Us 
                            </h1>

                            <div className="mt-2">
                            {
                                contactInfo.map((element) => {
                                    return (
                                        <div className="my-2 flex flex-col">
                                            <h1 className="text-white font-inter font-medium"> {element.name} </h1>
                                            <div className="flex flex-row gap-2">
                                                <span className="flex justify-center items-center"> <IoIosCall className="fill-white"/> </span>
                                                <p className="text-white font-roboto font-light">  {element.contact} </p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            </div>
                            
                        </div>

                        {/* Socials */}
                        <div className="flex flex-col justify-start items-start gap-5">
                            <h1 className="text-white text-xl font-inter font-bold"> 
                                Socials
                            </h1>

                            <div className="w-full h-fit px-2 grid grid-cols-1 grid-rows-4 sm:grid-cols-4 sm:grid-rows-1 lg:gap-20 gap-4">
                            {
                                socials.map((element) => {
                                    return (
                                        <div className="flex flex-row justify-center items-center">
                                            <a href={element.url} >{element.Icon}</a>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}