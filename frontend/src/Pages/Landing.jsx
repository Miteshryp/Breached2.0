// Libraries
import { useNavigate } from "react-router";

// Components
import FaqCard from "../Components/FAQCard";
import Navbar from "../Components/Navbar";

// services/metadata
import faqData from "./../Assets/data/faqData"
import contactData from "./../Assets/data/contactData"
import {ReactComponent as backgroundSvg} from "./../Assets/svg/tempBackground.svg"





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
            <div id="intro" className="fixed top-0 left-0 w-screen h-[300vh] -z-50 bg-landing blur-lg opacity-100">
            </div>
            <div className='px-10 md:px-20 w-full h-[300vh] bg-[#000000] mix-blend-screen'>
                <Navbar links={linkArr} />

                {/* Intro Section */}
                <div className="flex flex-col gap-10 h-[70vh] px-0 lg:px-[13.5rem] justify-center items-center" >
                    <h1 className=" font-bold text-white text-6xl md:text-8xl text-center [font-family: inter]"> BREACHED 2.0 PATIENT ZERO</h1>
                    <p  className=" font-medium [font-family: Inter] text-white/80 text-center text-xl"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo </p>
                </div>

                <div className="w-full mb-24 flex flex-col md:flex-row gap-6 justify-center items-center">
                    <button onClick={signupRedirect} className="w-9/12 md:w-3/12 h-12 rounded-sm text-white text-xl font-bold font-inter bg-[#fd7e17] hover:scale-110 transition-all duration-300"> Register </button>
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

            {/* Footer */}
            <div className="w-full h-fit p-14 px-[10%] bg-[#181823]">
                <div className="grid grid-cols-3 p-2 justify-start border-solid border-b-2 border-white/20">
                    <div className="flex flex-col justify-start gap-2">
                        <h1 className="m-1 text-3xl text-white font-medium font-inter"> Contact Us </h1>
                        <div className="ml-1 flex flex-col justify-start gap-1">
                            { contactData.map((element) => {
                                return <p className="ml-2 text-white "> {element.name} ({element.phone}) </p>
                            })}
                        </div>
                    </div>

                    <div className=" col-span-2 grid grid-cols-3" >
                        <div><h1 className="text-white font-inter"> Something </h1></div>
                        <div><h1 className="text-white font-inter"> Something </h1></div>
                        <div><h1 className="text-white font-inter"> Something </h1></div>
                    </div>
                </div>
            </div>
        </div>
    )
}