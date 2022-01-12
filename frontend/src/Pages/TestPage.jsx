import { ChartBarIcon, DocumentIcon, HomeIcon } from "@heroicons/react/solid"
import MyPopover from "../Components/TestPopover"
import {ReactComponent as IeeeLogo } from "./../Assets/svg/ieee_logo.svg" 
import Login from "./Login"

import axios from "axios";

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

    return (
        <div>
            <MyPopover screens={screens} HomeLogo={IeeeLogo}/>
        </div>
    )
}