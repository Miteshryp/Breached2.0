import axios from "axios";
import { useEffect } from "react"
import backend_settings from "./../../backend_settings";
import services from "./../../Utils/services"
import QuestionCard from "../../Components/QuestionCard"

export default function QuestionScreen() {

    useEffect(async () => {
        try {
            let fetch = await axios.get(backend_settings.getCurrentQuestion, services.auth.getNoCacheCredentialHeaders());
            console.log(fetch)
        } catch(err) {
            console.log("Failed")
            console.log(err)
        }
    });

    return (
        <div className="px-14 py-10 w-full h-screen">
            <QuestionCard />
        </div>
    )
}