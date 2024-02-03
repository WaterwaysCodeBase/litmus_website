import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import { CustomButton } from "./Buttons";

// Configure PDF.js worker to work with create-react-app
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({ pdfUrl }) => {
  return (
    <div>
      {/* <Document file={pdfUrl}>
        <Page pageNumber={1} />
      </Document> */}
      <CustomButton
        label="View Document"
        as={"a"}
        link={pdfUrl}
        // target="_blank"
        isExternal 
      />
    </div>
  );
};

export default PdfViewer;
