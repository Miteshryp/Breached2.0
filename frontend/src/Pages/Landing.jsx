// Libraries
import { useNavigate } from "react-router";

// Components
import FaqCard from "../Components/FAQCard";
import Navbar from "../Components/Navbar";

// services/metadata
import faqData from "./../Assets/data/faqData"
import rulesInfo from "./../Assets/data/rulesData"
import socialsInfo from "./../Assets/data/socialsData"
import contactInfo from "./../Assets/data/contactData"
import {ReactComponent as IeeeDomeLogo} from "./../Assets/svg/IeeeDomeLogo.svg"


// Icons
import {IoIosCall} from "react-icons/io"
import {FaDiscord} from "react-icons/fa" 

export default function LandingPage(props) {
    let navigate = useNavigate();

    let linkArr = [];






    const signupRedirect = () =>{ 
        navigate('/signup')
    }
    const discordRedirect = () => {
        window.open("https://discord.gg/Fv3PTJy9");
        return null;
    }
    return (
        <div>
            <div id="intro" className="fixed top-0 left-0 w-screen h-[350vh] -z-50 bg-landing">
            </div>
            <Navbar links={linkArr} />
            <div className='px-10 md:px-20 w-full h-fit'>

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
                <div className="w-full py-12 flex flex-col lg:flex-row gap-6 justify-center items-center">
                    <button onClick={signupRedirect} className="w-full lg:w-4/12 h-12 rounded-sm text-white hover:text-[#fd7e17] text-xl font-bold font-inter bg-[#fd7e17] hover:bg-transparent hover:border-2 hover:border-[#fd7e17] transition-all duration-300"> Register </button>
                    <button onClick={discordRedirect}    className=" group w-full lg:w-4/12 h-12 rounded-sm flex flex-row justify-center items-center bg-transparent outline-1 outline-[#5460E6] outline-double transition-all duration-300 hover:bg-[#5460E6]">
                        <div className="mx-auto w-full h-full flex flex-row justify-center items-center gap-3">
                            <FaDiscord className="basis-10 h-4/6 fill-[#5460E6] group-hover:fill-white" /> 
                            <h1 className="basis-30 text-[#5460E6] group-hover:text-white font-bold font-inter text-xl ">Join Discord </h1>
                        </div>
                    </button> 
                </div>
                
                {/* Rules */}
                <div className="my-40 w-full h-fit flex flex-col justify-center items-center">
                <div className="w-full px-auto lg:pl-[10.5rem] flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-2">
                    <div className="lg:row-span-2 p-5  flex flex-col justify-center items-center lg:justify-start lg:items-start">
                        <h1 className="text-white text-5xl lg:text-7xl font-inter font-bold"> Rules </h1>
                    </div>
                    { 
                        rulesInfo.map((element, index) => {
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

                    <div className="w-screen px-10 my-10 lg:w-[60vw] flex flex-col justify-center items-center gap-3">
                        {faqData.map((data) => <FaqCard data={data} />)}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="w-full h-fit py-20 pl-4 px-[10%] bg-[#181823]">
                <div className="p-2 flex flex-col justify-center items-center lg:grid lg:grid-cols-2 gap-20">
                    <div className="w-full h-full flex flex-col justify-start items-start">
                        {/* <IeeeLogo className=""/> */}
                        <a className="w-full h-fit justify-start items-start" href="https://ieeemuj.com/" >
                            <IeeeDomeLogo className="w-full lg:w-[80%] h-full" />
                        </a>
                    </div>

                    {/* Contact Us */}
                    <div className="my-12 lg:my-0 grid md:grid-cols-2 gap-24 lg:gap-10" >
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

                            <div className="w-full h-fit px-2 grid grid-cols-4 grid-rows-1 lg:gap-20 gap-4">
                            {
                                socialsInfo.map((element) => {
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