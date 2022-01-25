
// services and meta
import axios from "./../Utils/axios_setup"
import backend from "./../backend_settings";



export default function ContestCard(props) {
    let {contest, registerSignal, failSignal, successSignal} = props;

    let registerContest = async function() {
        registerSignal(true);

        try {
            let response = await axios.post(backend.register, {contestID: contest._id}, {
                headers: {
                    'x-access-token': localStorage.getItem(process.env.REACT_APP_USER_TOKEN)
                }
            });
            if(response.data.complete) {
                console.log("Registration successful");
                failSignal({status: false})
                successSignal(true);
                registerSignal(false);
            }
            else {
                console.log("Registration could not be completed")
                failSignal((prev) => {
                    prev.status = true;
                    prev.message = response.data.message;
                    return prev;
                })
            }
            registerSignal(false);
        } catch (err) {
            console.log("Registration Failed")
            console.log(err);
            failSignal((prev) => {
                prev.status = true;
                prev.message = err.response.data.message;
                return prev;
            })
            registerSignal(false);
        }
    }

    let startDate = new Date(contest.startTime);
    let endDate = new Date(contest.endTime);

    let backgroundColor = ' hover:bg-contest-card-hover bg-contest-card hover:shadow-2xl hover:shadow-white/20 backdrop-blur-3xl ' // bg-gradient-to-b from-[#009ffd] via-[#1b64b7] to-[#2288fd]';
    // from-[#009ffd] via-[#1b64b7] to-[#2288fd]
    return (
    <div className={`group w-full h-full px-10 p-5 bg-size-200 bg-pos-0 hover:bg-pos-100 ${backgroundColor}  transition-all rounded-xl`}>
        <h1 className="text-white text-xl font-inter font-extrabold transition-all"> {contest.name} </h1>
        <div className="my-4">
        <p className="text-white font-inter font-bold"> Questions: <span className="pl-2 font-light"> {contest.question.length}</span></p>
            <p className="text-white font-inter font-bold">  Starts at: <span className="pl-2 font-light"> {`${startDate.toDateString()} - ${startDate.toLocaleTimeString()}`} </span> </p>
            <p className="text-white font-inter font-bold">  Ends at: <span className="pl-2 font-light"> {`${endDate.toDateString()} - ${endDate.toLocaleTimeString()}`} </span> </p>
        </div>

        <div className="flex justify-left">
            <button className="w-[60%] px-4 py-2 hover:bg-white rounded hover:text-black border-2 border-white text-white transition-all bg-transparent" 
                    onClick={registerContest}>
                Register
            </button>
        </div>
    </div>
    )
}
