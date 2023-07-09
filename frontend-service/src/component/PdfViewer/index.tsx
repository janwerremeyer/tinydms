import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import {Document, Page} from 'react-pdf';
import {useEffect, useRef, useState} from "react";
import styled from "@emotion/styled";

type TPdfViewerProps = {
    file: string,
    onClose: () => void
}


const Body = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgb(55, 55, 55);
  width: 100vw;
  height: 100vw;
  z-index: 100;
`

const Inner = styled.div`
  display: grid;
  grid-template-columns: auto 400px;

`

const DocumentWrapper = styled.div`
  margin: auto;
  max-width: 90%;
  max-height: 100vh;

  .tinydms--pdf-page {
    margin-top: 2rem;
    background: transparent !important;
    
  }

`

export const PdfViewerWrapper = ({open, children}: {open: boolean, children: React.ReactNode}) => {
    if(open){
        return children
    }
    return  <></>
}

export const PdfViewer = ({file, onClose}: TPdfViewerProps) => {
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const docWrapper = useRef(null)

    const [scale, setScale ] = useState(1)

    const eccv = (event: WheelEvent) => {
        if(event.ctrlKey){
            event.preventDefault()
            if(event.deltaY < 0 ){
                // console.log(event.deltaY / 100 * -1)
                //setScale(event.deltaY * -1)
                console.log("zooming in")
                setScale((current) => current * 1.1)
            }else {
                setScale((current) => current * 0.9)
            }
        }
    }

    console.log("scale",scale)

    useEffect(() => {
        if (docWrapper.current) {
            const wrapper = docWrapper.current as HTMLDivElement
            const width = wrapper.style.width
        }

        document.getElementById('root')?.addEventListener("wheel", eccv, true)

        return () => document.getElementById('root')?.removeEventListener("wheel", eccv, true)

    }, [])

    function onDocumentLoadSuccess({numPages}: any) {
        setNumPages(numPages);
        setPageNumber(0);
    }




    return <Body>
        <div style={{position: "relative"}}>
            <Inner>
                <div style={{maxHeight: "100vh", overflow: "scroll"}}>
                    <DocumentWrapper ref={docWrapper}>
                        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                            {Array.from(new Array(numPages), (el, index) => (
                                <Page scale={scale} className={"tinydms--pdf-page"} key={`page_${index + 1}`}
                                      pageNumber={index + 1}/>
                            ))}
                        </Document>
                    </DocumentWrapper>
                </div>
                <div style={{background: "red"}}>
                    test
                    <button onClick={onClose}>
                        close
                    </button>
                </div>
            </Inner>
        </div>
    </Body>
}