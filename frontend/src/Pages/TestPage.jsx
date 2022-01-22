import { ChartBarIcon, DocumentIcon, HomeIcon } from "@heroicons/react/solid"
import MyPopover from "../Components/TestPopover"
import {ReactComponent as IeeeLogo } from "./../Assets/svg/ieee_logo.svg" 
import Login from "./Login"
import Particles from "react-tsparticles"

import axios from "axios";
import { useState, useCallback } from "react"

export default function TestPage() {

    let readURL = (event) => {
        let file_name = event.target.files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
            console.log(String(e.target.result));
            // await axios.post("/image", 
        }

        // console.log(input);
        reader.readAsDataURL(file_name);
    }

    let screens = [
        { 
            screenComponent: () => {
                return <h1>Element 1</h1>
            },
            iconComponent: HomeIcon
        },
        {
            screenComponent: () => {
                let content = null;
                const handleChange = (event) => {
                    
                }
                return (
                    <div>
                        <div className="w-screen h-screen bg-testImg">
                        </div>
                        {/* <form>
                            <input type="file" onChange={readURL} />
                        </form> */}
                    </div>
                )
            },
            iconComponent: DocumentIcon
        },
        {
            screenComponent: () => {
                return <h1> Element 3</h1>
            },
            iconComponent: ChartBarIcon
        },
    ]
    const particlesInit = (main) => {
        console.log(main);
    
        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
      };
    
      const particlesLoaded = (container) => {
        console.log(container);
      };

      const [height, setHeight] = useState(0);
        
      const measuredRef = useCallback(node => {
        if (node !== null) {
          setHeight(node.getBoundingClientRect().width);
        }
      }, []);
  
          // return (
          //   <>
          //     <h1 ref={measuredRef}>Hello, world</h1>
          //     <h2>The above header is {Math.round(height)}px wide</h2>
          //   </>
          // );

          return (
            <MyPopover />
          )
        

        // return (
        //   <div className="w-20 h-20">
        // <Particles
        //   init={particlesInit}
        //   loaded={particlesLoaded}
        //   options={{
        //     background: {
        //     //   color: {
        //     //     value: "#0d47a1",
        //     //   },
        //       image: {
        //           value: "url('sampleBackground.png')"
        //       }
        //     },
        //     fpsLimit: 60,
        //     interactivity: {
        //       events: {
        //         onClick: {
        //           enable: true,
        //           mode: "push",
        //         },
        //         onHover: {
        //           enable: true,
        //           mode: "repulse",
        //         },
        //         resize: true,
        //       },
        //       modes: {
        //         bubble: {
        //           distance: 400,
        //           duration: 2,
        //           opacity: 0.8,
        //           size: 40,
        //         },
        //         push: {
        //           quantity: 4,
        //         },
        //         repulse: {
        //           distance: 50,
        //           duration: 0.9,
        //         },
        //       },
        //     },
        //     particles: {
        //       color: {
        //         value: "#ffffff",
        //       },
        //       links: {
        //         color: "#aaaaaa",
        //         distance: 150,
        //         enable: true,
        //         opacity: 0.5,
        //         width: 1,
        //       },
        //       collisions: {
        //         enable: true,
        //       },
        //       move: {
        //         direction: "none",
        //         enable: true,
        //         outMode: "bounce",
        //         random: false,
        //         speed: 2,
        //         straight: false,
        //       },
        //       number: {
        //         density: {
        //           enable: true,
        //           area: 1000,
        //         },
        //         value: 100,
        //       },
        //       opacity: {
        //         value: 0.5,
        //       },
        //       shape: {
        //         type: "circle",
        //       },
        //       size: {
        //         random: true,
        //         value: 5,
        //       },
        //     },
        //     detectRetina: true,
        //   }}
        // />
        // </div>
      // );

    // return (
    //     // <div>
    //     //     <MyPopover screens={screens} HomeLogo={IeeeLogo}/>
    //     // </div>
    // )
}