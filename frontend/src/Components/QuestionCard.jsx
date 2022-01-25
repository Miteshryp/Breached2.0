// Library imports
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { Document,Page,pdfjs } from "react-pdf";
import {IoIosDocument as DocumentIcon} from "react-icons/io"

// import { pdfjs } from 'react-pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// Utility features
import axios from "./../Utils/axios_setup";
import services from "../Utils/services";

// Meta data
import backend_settings from "../backend_settings";
// import PdfDocument from "./PdfDocument";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function QuestionCard(props) {
    let {question, signalSubmit, signalSuccess, signalFail, signalWrongAnswer} = props;
    // let answer = useRef()
    let [answer, setAnswer] = useState("")

    // for pdf
    let [page, setPage] = useState(0);

    // let parentRef = useCallback((node) => {
    //     console.log("Called memo")
    //     if(node) {
    //         setPdfWidth(node.getBoundingClientRect().width);
    //         setPdfHeight(node.getBoundingClientRect().height);
    //     }
    // });

    let parentRef = useRef(null);

    // let [pdfWidth, setPdfWidth] = useState(200);
    // let [pdfHeight, setPdfHeight] = useState(200);

    useEffect(() => {
    }, [parentRef]);
    

    const handleAnswerChange = (event) => {
        setAnswer(event.target.value);
    }

    const submitAnswer = async () => {
        console.log("Submitting")
        signalSubmit(true);
        try {
            let fetch = await axios.post(backend_settings.submit, {answer},  services.auth.getNoCacheCredentialHeaders());
            if(fetch.data.complete) {
                console.log("Submission Successful");
                signalSuccess(true);
                signalFail({ message: '', status: false});
                signalWrongAnswer(false);
                setAnswer("");
            } else {
                console.log("Submission Failed");
                signalSuccess(false);
                // signalFail({title: "Submission Failed",message: fetch.data.message, status: true});
                signalWrongAnswer(true);
            }

            signalSubmit(false);
        } catch(err) {
            console.log("Request Failed");
            console.log(err);
            if(err.response.status === 500 || err.response.status === 300) {
                console.log(err.response.data.message)
                signalSuccess(false);
                signalWrongAnswer(false);
                signalFail({title: "Submission Failed",message: err.response.data.message, status:true});
            } else {
                signalSuccess(false);
                signalFail({title: "Submission Failed",message: err.message, status: true});
            }
        } finally {
            signalSubmit(false);
        }
    }

    // window.onresize = () => {
    //     if(parentRef.current) {
    //     setPdfWidth(parentRef.current.getBoundingClientRect().width);
    //     setPdfHeight(parentRef.current.getBoundingClientRect().height);
    //     } else {
    //         console.log("Tried to reset but parentRef is empty");
    //     }
    // }
    

    return (
        <div className="w-full h-fit lg:h-full p-10 md:p-20  rounded-2xl bg-card">
            <div className="h-[90%] p-2 my-10 lg:my-0 flex flex-col lg:flex-row justify-start lg:justify-center gap-10 lg:gap-5">
                <div className="w-full lg:w-7/12 h-auto flex flex-col gap-4 lg:justify-start" ref={parentRef}>
                    <h1 className="text-white text-4xl font-medium font-roboto">{question.title ? question.title : "No Title"}</h1>

                    <div className="w-full h-fit lg:h-[80%] lg:overflow-y-auto scrollbar-none">
                        {
                            question.statement.map((element) => {
                                return (
                                <p className="mb-3 text-white text-xl md:text-lg font-light font-roboto">
                                    {/* {question.statement ? question.statement : "No statement"} */}
                                    {element}
                                </p>
                                )
                            })
                        }  
                    </div>
                    

                </div>

                <div className="h-full w-full lg:w-4/12 flex flex-col justify-center items-center">
                    <div className="h-full w-full flex flex-col mx-auto justify-center items-center">
                        { question.clueMedia && (
                            question.clueMedia.map((element) => {
                                if(element.contentType === "audio") {
                                    return (
                                    <audio controls>
                                        <source src={element.url} type="audio/mpeg" />
                                    </audio>
                                    )
                                } else if(element.contentType === "image") {
                                    return <img src={element.url} ></img>
                                } else  {
                                    return (
                                    // <Document 
                                    //     className={"w-full"}
                                    //     file={{url: element.url}}
                                    //     onLoadSuccess={({numPages}) => {
                                    //         console.log("PDF loaded");
                                    //         console.log(numPages);
                                    //         setPage(1);
                                    //     }}
                                    //     onLoadProgress={() => {
                                    //         console.log("Progress");
                                    //     }}
                                    //     onLoadError={() => {
                                    //         console.log("ERROR loading pdf");
                                    //     }}>
                                    //     <Page pageNumber={page} width={pdfWidth - 300} height={pdfHeight - 200} />
                                    // </Document>
                                    // <PdfDocument url={element.url} parentReference={parentRef}></PdfDocument>
                                    <button
                                        onClick={() => {
                                            window.open(element.url);
                                        }}
                                        className="w-fit h-fit p-3 group flex flex-row justify-center items-center gap-3 hover:bg-emerald-500 bg-transparent outline-1 outline-double outline-emerald-500 backdrop-blur-3xl rounded transition-all ease-in-out duration-300">
                                            <DocumentIcon className="w-auto h-full group-hover:fill-white fill-emerald-500" />
                                            <p className="group-hover:text-white text-2xl font-light font-roboto text-emerald-500"> Open {element.contentType}</p>
                                    </button>
                                    )
                                }
                            })
                            )
                        }
                    </div>
                </div>
            </div>

            <div className="w-full h-fit flex flex-col lg:ml-10 lg:flex-row justify-center items-center lg:justify-start lg:items-start">
                <div  >
                    <form className="h-fit flex flex-col justify-center items-center lg:flex-row lg:justify-start lg:items-start" onSubmit={(e) => {
                        e.preventDefault();
                        submitAnswer();
                    }}>
                        <input className="w-full h-14  lg:h-14 m-2 p-2 lg:my-0 rounded text-center text-3xl font-inter font-bold" type="text" value={answer} onChange={handleAnswerChange} />
                        <input className="w-full h-14          m-2 p-2 lg:my-0 rounded text-center text-xl text-white font-roboto font-light bg-[#1088FF] transition-all ease-in-out hover:text-[#1088FF] hover:border-2 hover:border-[#1088FF] hover:bg-transparent" type="submit" value="Submit" />
                    </form>
                    
                </div>
            </div>
        </div>


        // <div className="w-full h-fit lg:h-full p-20  rounded-2xl bg-card">
        //     <div className="h-[90%] p-4 my-10 lg:my-0 flex flex-col lg:flex-row justify-start lg:justify-center gap-10 lg:gap-5">
        //         <div className="w-full lg:w-7/12 h-auto flex flex-col gap-4 lg:justify-start">
        //             <h1 className="text-white text-4xl font-medium font-roboto">Sample 1</h1>

        //             <div className="w-full h-fit lg:h-[80%] lg:overflow-y-auto scrollbar-none">
        //                 <p className="text-white text-xl md:text-lg font-light font-roboto">
        //                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula, massa ac rutrum imperdiet, nisi nibh bibendum sem, nec condimentum velit tortor id nunc. Nunc a erat eget felis viverra rutrum nec sed ligula. Vestibulum commodo massa sed magna malesuada mollis. Sed imperdiet nunc quam, a congue nibh finibus vel. Donec ac neque faucibus, convallis velit quis, accumsan quam. Nullam nec nisi erat. Aliquam in congue risus, non mollis tortor. Donec tincidunt mattis neque vitae mollis. Proin scelerisque, nibh non ullamcorper bibendum, erat arcu blandit ipsum, ac malesuada tellus nibh sit amet ipsum. Cras nec metus vehicula, porta mi sed, maximus diam. Vivamus vitae tellus lorem. Aliquam erat volutpat.
        //                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula, massa ac rutrum imperdiet, nisi nibh bibendum sem, nec condimentum velit tortor id nunc. Nunc a erat eget felis viverra rutrum nec sed ligula. Vestibulum commodo massa sed magna malesuada mollis. Sed imperdiet nunc quam, a congue nibh finibus vel. Donec ac neque faucibus, convallis velit quis, accumsan quam. Nullam nec nisi erat. Aliquam in congue risus, non mollis tortor. Donec tincidunt mattis neque vitae mollis. Proin scelerisque, nibh non ullamcorper bibendum, erat arcu blandit ipsum, ac malesuada tellus nibh sit amet ipsum. Cras nec metus vehicula, porta mi sed, maximus diam. Vivamus vitae tellus lorem. Aliquam erat volutpat.
        //                 </p>
        //             </div>
                    

        //         </div>

        //         <div className="h-full w-full lg:w-5/12 flex flex-col justify-center items-center">
        //             <div className="h-fit w-fit flex flex-col mx-auto justify-center items-center">
        //                 <img src="loading.gif"></img>
        //             </div>
        //         </div>
        //     </div>

        //     <div className="w-full h-fit flex flex-col lg:flex-row justify-center items-center lg:justify-start lg:items-start">
        //         <form className="h-fit flex flex-col justify-center items-center lg:flex-row lg:justify-start lg:items-start">
        //             <input className="w-full lg:w-80 h-14  lg:h-14 p-2 mx-6 lg:my-0 rounded text-center text-3xl font-inter font-bold" type="text" />
        //             <input className="w-full lg:w-40 h-full        p-4 my-4 lg:my-0 rounded text-center text-md font-roboto font-medium bg-sky-400  transition-all ease-in-out hover:scale-110 hover:text-white " type="button" value="Submit" />
                    
        //         </form>
        //     </div>
        // </div>
    )
}