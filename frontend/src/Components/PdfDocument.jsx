import { useState, useEffect, useRef } from "react";
import { Document, Page } from "react-pdf";

export default function PdfDocument(props) {
    let {url, parentReference} = props;

    let parentRef = useRef(null);

    let [pdfWidth, setPdfWidth] = useState(300);
    let [pdfHeight, setPdfHeight] = useState(300);

    useEffect(() => {
        if(parentRef.current) {
            console.log("Available");
            setPdfWidth(parentRef.current.offsetWidth);
            setPdfHeight(parentRef.current.offsetHeight);

            console.log("Width: " + parentRef.current.offsetWidth);
            console.log("Height: " + parentRef.current.offsetHeight);
        }
    }, [parentRef]);

    console.log(parentRef);
    window.onresize = () => {
        if(parentRef.current) {
            // setPdfWidth(parentRef.current.getBoundingClientRect().width);
            // setPdfHeight(parentRef.current.getBoundingClientRect().height);
            setPdfWidth(parentRef.current.offsetWidth);
            setPdfHeight(parentRef.current.offsetHeight);
        } else {
            console.log("Tried to reset but parentRef is empty");
        }
    }

    return (
        <div ref={parentRef} className="w-full h-full">
        <Document 
            file={{url}}
            onLoadSuccess={({numPages}) => {
            }}
            onLoadProgress={() => {
                // console.log("Progress");
            }}
            onLoadError={() => {
                // console.log("ERROR loading pdf");
            }}>
            <Page pageNumber={1} width={pdfWidth + 100} height={pdfHeight + 100} />
        </Document>
        </div>
    )
}