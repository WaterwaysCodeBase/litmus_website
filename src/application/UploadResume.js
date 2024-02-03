"use client";

import {
  Stack,
  Box,
  Divider,
  Badge,
  Spinner,
  useToast,
} from "@chakra-ui/react";

import { OnboardingLayout } from "../layout/OnboardingLayout";
import { CustomButton } from "../components/Buttons";

import { useFormik } from "formik";
import * as Yup from "yup";

import UploadCareWidget from "../components/UploadCareWidget";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../components/APIs";
import axios from "axios";

import { useApiData } from "../components/GetData";
import { LoadingSpinner } from "../components/LoadingSpinner";
import SubmitApplication from "./SubmitApplication";
import FileUpload from "../components/FileUpload";
import PdfViewer from "../components/PDFViewer";

export default function UploadResume() {
  const [isLoading, setLoading] = useState();

  const uid = sessionStorage.getItem("uid");
  const toast = useToast();
  const {
    data: userResume,
    loading,
    fetchData,
  } = useApiData("application/getUserResume");
  useEffect(() => {
    fetchData();
  }, []);
  const formik = useFormik({
    initialValues: {
      resume_file: "",
      user_id: uid,
    },
    validationSchema: Yup.object({
      resume_file: Yup.string().required("This field is required"),
    }),
    onSubmit: (data) => {
      setLoading(true);
      const url = API_BASE_URL + "/application/saveResume";
      axios
        .post(url, data)
        .then((response) => {
          if (response.data.status === "200") {
            toast({
              title: "Profile Update",
              description: response.data.message,
              position: "top",
              status: "success",
              isClosable: true,
            });
            setLoading(false);
            // navigate('/onboarding/identity');
          } else {
            toast({
              title: "Profile Update Error",
              description: response.data.message,
              position: "top",
              status: "error",
              isClosable: true,
            });
            setLoading(false);
          }
        })
        .catch((error) => { });
    },
  });
  const [pdfFile, setpdfFile] = useState();
  useEffect(() => {
    if (userResume) {
      setpdfFile(API_BASE_URL + "uploads/" + userResume.resume_file || null);
      // setpdfFile(userResume);
    }
    setLoading(false);
  }, [userResume]);
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <OnboardingLayout
      pageTitle="UPLOAD RESUME!"
      mainContent={
        <Stack
          gap={4}
          direction={{ base: "column", md: "column", sm: "column" }}
          as={"form"}
          onSubmit={formik.handleSubmit}
        >
          <Divider />

          <Stack gap={2} direction={["column", "row"]}>
            {/* <UploadCareWidget
              onChange={(info) => {
                formik.setFieldValue("resume_file", info.originalUrl);
              }}
              isInvalid={
                formik.errors.resume_file && formik.touched.resume_file
              }
              formLabel={
                <>
                  Upload your Resume Here{" "}
                  <Badge variant="outline" colorScheme="blue">
                    Click the link below to preview
                  </Badge>
                </>
              }
              value={formik.values.resume_file}
            /> */}
            <FileUpload
              // onFileUpload={setUploadedFiles}
              onFileUpload={(file) => formik.setFieldValue("resume_file", file)}
            />
          </Stack>
          <Stack gap={2} direction={["column", "column"]}>
            <Box py={3}>

            </Box>
            {pdfFile && <PdfViewer pdfUrl={pdfFile} />}
            <Box py={5} gap={5} display={'flex'} flexDir={'row'}>
              {isLoading ? (
                <Spinner
                  thickness="3px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="md"
                />
              ) : (
                <CustomButton
                  type="submit"
                  bg={"blue.400"}
                  colorScheme="blue"
                  label="Save"
                />
              )}
              <Box justifySelf={'center'} gap={'5'} >
                <CustomButton
                  as={'a'}
                  bg={"blue.400"}
                  colorScheme="blue"
                  label="Next"
                  link="/application/training/certificate"
                />

              </Box>
              <CustomButton
                as={'a'}
                 colorScheme="yellow"
                                        label="Back"
                link="application/work-history"
              />
            </Box>
          </Stack>
        </Stack>
      }
    />
  );
}
