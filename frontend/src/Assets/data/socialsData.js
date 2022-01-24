import {AiFillLinkedin, AiOutlineInstagram, AiFillMediumCircle} from "react-icons/ai"
import {BsFacebook} from "react-icons/bs"

export default [
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