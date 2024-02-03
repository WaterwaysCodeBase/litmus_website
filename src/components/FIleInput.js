import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  VisuallyHidden,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

const FileInput = ({ buttonText, onChange, accept, multiple, label, w }) => {
  const inputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    onChange(files);
  };

  const openFileInput = () => {
    inputRef.current.click();
  };

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <VisuallyHidden>
        <Input
          py={6}
          height={"18px"}
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          accept={accept}
          // multiple={multiple}
        />
      </VisuallyHidden>
      <Flex alignItems="center">
        <Button onClick={openFileInput} mr={2}>
          {buttonText}
        </Button>
        <Text>{selectedFiles.length} file(s) selected</Text>
      </Flex>
    </FormControl>
  );
};

export default FileInput;
