import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import {
  Input,
  Box,
  Alert,
  AlertIcon,
  Spinner,
  Flex,
  Text,
} from "@chakra-ui/react";
import { FaCloudUploadAlt, FaFileUpload, FaUpload } from "react-icons/fa";

function FileUpload({ onFileUpload, label }) {
  const [uploadedFileMessage, setuploadedFileMessage] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [loading, setLoading] = useState();
  const MAX_FILE_SIZE = 700 * 1024; // 500KB
  const handleFileUpload = useCallback(
    (acceptedFiles) => {
      setuploadedFileMessage(null);
      setLoading(true);
      const file = acceptedFiles[0]; // Get the first accepted file (single file upload)
      if (!file) {
        setUploadError("Invalid file format. Please upload an image, docx, doc, or pdf file. <br/> File must be lesser than 700KB");
        setLoading(false);
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setLoading(false);
        setUploadError("File size exceeds the maximum allowed (500KB).");
        return;
      }

      const formData = new FormData();
      formData.append("file", file); // Append the file to the form data

      axios
        .post(
          "https://litmusapi.litmusservices.co.uk/uploads/fileUpload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          setuploadedFileMessage(
            "File Uploaded! Please click save to complete your upload"
          );
          setLoading(false);
          setUploadError(null);

          onFileUpload(response.data.file); // Pass the entire response to the parent component
        })
        .catch((error) => {
          setLoading(false);
          setUploadError("File upload failed. Please try again.");
        });
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileUpload,
    accept: ".jpg, .jpeg, .png, .gif, .pdf", // Allow specific file types
    maxFiles: 1, // Limit to a single file
    maxSize: 750 * 1024, // 500KB maximum file size\
  });

  return (
    <div>
      {loading ? (
        <Box bg="blue.100" py="5" px="5" w="100%">
          <Spinner color="blue.600" />
        </Box>
      ) : (
        <>
          {label}
          {!uploadedFileMessage && (
            <>
              <Flex
                {...getRootProps()}
                className="dropzone"
                bg="blue.600"
                py="5"
                px="5"
                w="100%"
                color="white"
                align={"center"}
                justify={'space-between'}
                pointerEvents={'all'}
              >
                <Input {...getInputProps()} />
                <Text>
                  Drag and drop a file here, or click to select a file ( image or pdf)
                </Text>
                <FaCloudUploadAlt justifySelf="flex-end" size={"2em"} />
              </Flex>
            </>
          )}
        </>
      )}

      {uploadError && (
        <p className="error">
          <Alert status="error">
            <AlertIcon />
            {uploadError}
          </Alert>
        </p>
      )}
      {uploadedFileMessage && (
        <Alert status="success" py="5" px="5" w="100%">
          <AlertIcon />
          {uploadedFileMessage && uploadedFileMessage}
        </Alert>
      )}
    </div>
  );
}

export default FileUpload;
