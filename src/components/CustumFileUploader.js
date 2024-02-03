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
  Link,
} from "@chakra-ui/react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { motion } from "framer-motion"; // Import motion from framer-motion
import Cookies from "js-cookie";
import { API_BASE_URL } from "./APIs";

const MAX_FILE_SIZE = 2028 * 1024; // 500KB

function CustomFileUploader({ onFileUpload, label, uid, doc_type, file_status, tag, file_link, acceptedFiles }) {
  const [uploadedFileMessage, setUploadedFileMessage] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Add a key state
  const handleFileUpload = useCallback((acceptedFiles) => {
    setUploadedFileMessage(null);
    setLoading(true);

    const file = acceptedFiles[0];

    if (!file) {
      setUploadError("Invalid file format. Please upload an image, docx, doc, or pdf file.");
      setLoading(false);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setUploadError("File size exceeds the maximum allowed (500KB).");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", uid);
    formData.append("doc_type", doc_type);

    const uploadUrl = `${API_BASE_URL}/uploads/offer/fileUpload`;

    axios.post(uploadUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        setUploadedFileMessage("File Uploaded Successfully");
        setLoading(false);
        setUploadError(null);
        onFileUpload(response.data.status);
        // Increment the key to trigger a re-mount
        setRefreshKey((prevKey) => prevKey + 1);
      })
      .catch((error) => {
        setLoading(false);
        setUploadError(`File upload failed. ${error.message}`);
      });
  }, [onFileUpload, uid, doc_type]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileUpload,
    accept: acceptedFiles,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
  });

  return (
    <div key={refreshKey}>
      {loading ? (
        <Box bg="blue.100" py="5" px="5" w="100%">
          <Spinner color="blue.600" />
        </Box>
      ) : (
        <>
          {label}
          {!uploadedFileMessage && (
            <>
              <motion.div // Apply motion to create transitions
                initial={{ opacity: 0, y: -20 }} // Initial state
                animate={{ opacity: 1, y: 0 }} // Animated state
                exit={{ opacity: 0, y: -20 }} // Exit state
                transition={{ duration: 0.3 }} // Transition duration
              >
                {file_status && (
                  <Alert gap={2} justifyContent={'start'} status="success" py="2" px="2" w="100%" fontWeight={700}>
                    <AlertIcon /><Text>
                    </Text> <Link target="_blank" href={file_link}>View Uploaded File</Link>
                  </Alert>

                )}
                {!file_status && (
                  <Flex
                    {...getRootProps()}
                    className={`dropzone ${isDragActive ? "active" : ""}`}
                    bg="blue.600"
                    py="5"
                    px="5"
                    w="100%"
                    color="white"
                    align="center"
                    justify="space-between"
                    pointerEvents="all"
                    _hover={{ cursor: "pointer" }}
                  >
                    <Input {...getInputProps()} />
                    <Text fontWeight={600} fontSize="12pt">
                      {isDragActive ? "Drop the file here" : "Click to upload a file ( " + acceptedFiles + ") not more than 500kb"}
                    </Text>
                    <FaCloudUploadAlt justifySelf="flex-end" size="2em" />
                  </Flex>

                )}

              </motion.div>
            </>
          )}

        </>
      )}
      <motion.div // Apply motion to create transitions
        initial={{ opacity: 0, y: -20 }} // Initial state
        animate={{ opacity: 1, y: 0 }} // Animated state
        exit={{ opacity: 0, y: -20 }} // Exit state
        transition={{ duration: 0.3 }} // Transition duration
      >
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
      </motion.div>
    </div>
  );
}

export default CustomFileUploader;
