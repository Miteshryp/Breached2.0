// Library
import { useState } from "react"

// Assets
import {ReactComponent as Dropdown} from "./../Assets/svg/dropdown.svg"

export default function FaqCard(props) {
   let [extended, setExtended] = useState(false);
   let {data} = props;
    return (
      <div className="w-full p-7 flex rounded-lg items-start justify-start bg-[#181823] gap-3" >
            
            <div  onClick={() => {
                  setExtended(prev => !prev)
               }} 
               className={`group w-fit h-fit p-2 flex-grow-0 flex flex-col justify-center rounded-full hover:bg-white/50 ${extended ? "bg-white/50" : ""} backdrop-blur-sm`}>
               <Dropdown className={`h-[18px] w-[24px] flex-shrink flex-grow-0 flex-grow-0 bg-transparent stroke-2 stroke-white ${extended ? 'rotate-90' : ''} 
                     group-hover:stroke-black
                        transition-all ease-in-out duration-300 ` }/> 

            </div>
         <div className="w-full h-full flex flex-col flex-grow gap-2">
            <h1 className="text-white font-roboto text-xl font-bold"> 
               {data.question} 
            </h1>
            <p className={`${extended ? "block translate-y-0 opacity-70" : "hidden translate-y-4 opacity-0"} text-white transition-all transform transform-all ease-in-out duration-300`} >
               {data.answer}
            </p>
         </div>
      </div>
    )
         /* 


       </div>*/
}