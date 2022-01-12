import { useNavigate } from "react-router";
import FaqCard from "../Components/FAQCard";
import Navbar from "../Components/Navbar";

import faqData from "./../faqData"

export default function LandingPage(props) {
    let navigate = useNavigate();

    let linkArr = [
    {
        heading: "Link 1",
        redirect: "/test"
    },
    {
        heading: "Link 2",
        redirect: "/test"
    },
    {
        heading: "Link 3",
        redirect: "/test"
    },
    {
        heading: "Link 4",
        redirect: "/test"
    }
    ];


    const signupRedirect = () =>{ 
        navigate('/signup')
    }

    const faqRedirect = ()  =>{
        navigate("#intro");
    }
    return (
        <div>
        <div id="intro" className="absolute w-screen h-[300vh] bg-landing blur-lg opacity-40">
        </div>
        <div className='px-10 md:px-20 w-screen h-[300vh] bg-[#000000] mix-blend-screen'>
            <Navbar links={linkArr} />

            {/* Intro Section */}
            <div className="flex flex-col gap-10 h-screen px-0 lg:px-[13.5rem] justify-center items-center" >
                <h1 className=" font-bold text-white text-6xl md:text-8xl text-center [font-family: inter]"> BREACHED 2.0 WITH IEEE SB MUJ</h1>
                <p  className=" font-medium [font-family: Inter] text-white/80 text-center text-xl"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo </p>
            </div>

            <div className="w-full mb-20 flex flex-col md:flex-row gap-6 justify-center items-center">
                <button onClick={signupRedirect} className="w-9/12 md:w-3/12 h-12 rounded-sm text-white text-xl font-bold font-inter bg-[#ED8936] hover:scale-110 transition-all duration-300"> Register </button>
                <button onClick={faqRedirect}    className="w-9/12 md:w-3/12 h-12 rounded-sm text-white text-xl font-bold font-inter bg-transparent outline-1 outline-white outline-double transition-all duration-300 hover:bg-white hover:text-black"> Learn More </button> 
            </div>

            <div id="faq" className="w-full h-[70vh] flex flex-col gap-5 items-center">
                <h1 className="hidden sm:block text-white text-bold font-inter text-3xl md:text-4xl">Frequently Asked Questions</h1>
                <h1 className="block sm:hidden text-white text-bold font-inter text-4xl">FAQ's</h1>
                
                <div className="w-screen px-10 my-10 md:w-[60vw] flex flex-col justify-center items-center gap-3">
                    {faqData.map((data) => <FaqCard data={data} />)}
                </div>
            </div>
        </div>
        </div>
    )
}