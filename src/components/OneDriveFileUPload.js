import { Input } from "@chakra-ui/react";
import React from "react";

const OneDriveUploadWidget = () => {
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      try {
        const accessToken = "<YOUR_ACCESS_TOKEN>"; // Replace with your access token
        const folderPath = "/me/drive/root:/FolderName"; // Replace with the desired folder path
        const uploadUrl = `https://graph.microsoft.com/v1.0${folderPath}/${file.name}/content`;

        const headers = new Headers();
        headers.append("Authorization", `Bearer ${accessToken}`);

        const response = await fetch(uploadUrl, {
          method: "PUT",
          headers,
          body: file,
        });

        if (response.ok) {
          console.log("File uploaded successfully.");
        } else {
          console.error("Error uploading file:", response.statusText);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div>
      <h2>Upload to OneDrive</h2>
      <Input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default OneDriveUploadWidget;
