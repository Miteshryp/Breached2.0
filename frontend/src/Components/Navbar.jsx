import ieeeLogo from "./../Assets/svg/ieee_logo.svg"
import accountLogo from "./../Assets/svg/account_logo.svg";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function ListItem(props) {
    let {redirect, className, value} = props;

    return <li className={className}> 
        <Link to={redirect}> {value} </Link>
     </li> 
}


export default function Navbar(props) {
    
    let {links} = props;
    let navigate = useNavigate();

    let loginPath = "/login";
    
    const isSignedIn = () =>{
        let token = localStorage.getItem("token");
        if(token) return true;
        return false;
    }
    
    const buttonClick = () => {
        navigate("/login");
    }

    const clickHandler = () => {
        navigate()
    }

    return (
        <div className=" sticky top-0 flex h-20 mx-0 md:mx-8 py-4 w-auto border-white/10 border-b-4 border-solid z-50 bg-transparent backdrop-blur-lg drop-shadow-2xl">
            
            
            {/* logo */}
            <div className="mx-4 my-auto flex-auto justify-start bg-transparent">
                <img src={ieeeLogo} className="w-auto h-9" />
            </div>



            {/* List of components */}
            <div className="flex flex-end">

                <ul className="hidden md:flex md:flex-start mx-8">
                    { links.map((elem) => {
                        // return <li redirect={redirect} className="w-fit mx-4 my-auto text-white transition duration-300 hover:text-[#667EEA]"> {elem.heading} </li>
                        return <ListItem redirect={elem.redirect} className="w-fit mx-4 my-auto text-white transition duration-300 hover:text-[#667EEA]" value={elem.heading}/>
                    })}
                </ul>

                
            {/* Account */}
            {isSignedIn() ? ( 
                <div className="grid grid-cols-3 my-auto mx-12">
                    <div className="p-4 h-auto rounded-full bg-[#181823]/40 justify-center align-center" >
                        <img className="text-right" src={accountLogo} className="mx-auto my-auto w-full h-full"></img>
                    </div>
                    <span className="col-span-2 text-white/70 my-auto ml-2"> Account </span> 
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