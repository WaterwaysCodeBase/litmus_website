import React, { useEffect } from "react";

const DynamicPageTitle = ({ pageTitle }) => {
  useEffect(() => {
    // Set the page title by appending pageTitle to the default title
    document.title = `Litmus Services | ${pageTitle}`;
  }, [pageTitle]);

  return null; // This component doesn't render anything to the DOM
};

export default DynamicPageTitle;
