import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function Modal(props) {
   let {visible, sm, md, lg, removable, fullScreen} = props;
   let modalBackgroundName = "modal-back"

   let [sight, setSight] = useState(visible);
   let animationControl = useAnimation();

   let animationVariant = {
      hidden: {
         scale: 0,
         transition: {
            ease: "easeInOut",
            duration: 0.3
         }
      },
      visible: {
         scale: 1,
         transition: {
            ease: "easeInOut",
            duration: 0.3
         }
      }
   }


   useEffect(async () => {
      setSight(visible);
   }, [visible]);

   useEffect(async () => {
      if(sight) animationControl.start("visible");
   }, [sight]);

   let sizeWidth = ((lg | md | sm) ? (lg ? 'md:w-11/12' : ( md ? 'md:w-8/12' : 'w-1/3')) : 'md:w-full') + ' w-full';
   let sizeHeight = ((lg | md | sm) ? ( lg ? 'h-[70%]' : (md ? ('h-50%') : "h-[25%]")) : 'h-[90%]') + ' md:h-[90%]';
   return (
      <div onClick={(e) => {
         if(removable && e.target.getAttribute('name') === modalBackgroundName) {
            animationControl.start("hidden").then(() => {
               setSight(false);
            });

         }
      }} name={modalBackgroundName} className={`fixed top-0 left-0 flex flex-wrap justify-center items-center ${fullScreen ? "w-screen h-screen" : "w-full h-full"} bg-black/60 ${sight ? "block" : "hidden"}`}>
      <motion.div animate={animationControl} variants={animationVariant} className={`relative ${sizeWidth} ${sizeHeight} h-[90%] overflow-y-auto overscroll-x-contain my-10 p-20  rounded-lg bg-gray-900`}>
         {props.children}
      </motion.div> 
  </div>
   )
}