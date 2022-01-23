import { useState, useEffect, useRef } from "react";
// import { Document, Page } from "react-pdf";

export default function PdfDocument(props) {
    // let {url, parentReference} = props;

    // let parentRef = useRef(null);

    // let [pdfWidth, setPdfWidth] = useState(300);
    // let [pdfHeight, setPdfHeight] = useState(300);

    // useEffect(() => {
    //     if(parentRef.current) {
    //         setPdfWidth(parentRef.current.offsetWidth);
    //         setPdfHeight(parentRef.current.offsetHeight);
    //     }
    // }, [parentRef]);

    // window.onresize = () => {
    //     if(parentRef.current) {
    //         // setPdfWidth(parentRef.current.getBoundingClientRect().width);
    //         // setPdfHeight(parentRef.current.getBoundingClientRect().height);
    //         setPdfWidth(parentRef.current.offsetWidth);
    //         setPdfHeight(parentRef.current.offsetHeight);
    //     } else {
    //         console.log("Tried to reset but parentRef is empty");
    //     }
    // }

    return (
        // <div ref={parentRef} className="w-full h-full">
    //     <Document 
            
    //         file={
    //             {
    //                 url: url,
    //                 httpHeaders: {
    //                     'Access-Control-Allow-Origin': "*"
    //                     // 'X-Amz-Signature': '9b85617fc3918f3103bf17e0abb61650b6c414e32da8caaf9662c018cf220f00',
    //                     // 'X-Amz-Credential':'AKIAZ5A3K6VY7LDWGOX4%2F20220122%2Fus-east-1%2Fs3%2Faws4_request',
    //                     // 'X-Amz-SignedHeaders':'host',
    //                     // 'X-Amz-Algorithm':'AWS4-HMAC-SHA256'
    //                 }
    //             }
    //         }
    //         onLoadSuccess={({numPages}) => {
    //         }}
    //         onLoadProgress={() => {
    //             // console.log("Progress");
    //         }}
    //         onLoadError={() => {
    //             // console.log("ERROR loading pdf");
    //         }}>
    //         <Page pageNumber={1} width={pdfWidth - 50} />
    //     </Document>
        // </div>
        <div></div>
    )
}