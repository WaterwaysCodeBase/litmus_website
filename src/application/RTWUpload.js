"use client";

import { Stack, Box, useToast, Badge, Spinner } from "@chakra-ui/react";

import { OnboardingLayout } from "../layout/OnboardingLayout";
import { CustomInput, CustumSelect } from "../components/Input";
import { CustomButton } from "../components/Buttons";
import FileInput from "../components/FIleInput";
import UploadCareWidget from "../components/UploadCareWidget";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API_BASE_URL } from "../components/APIs";
import axios from "axios";
import { useApiData } from "../components/GetData";
import { LoadingSpinner } from "../components/LoadingSpinner";
import SubmitApplication from "./SubmitApplication";
import FileUpload from "../components/FileUpload";
import PdfViewer from "../components/PDFViewer";
import Cookies from "js-cookie";

export default function RTWUpload() {
  const {
    data: userRTW,
    loading,
    fetchData,
  } = useApiData("application/getUserRTW");
  useEffect(() => {
    fetchData();
  }, []);
  const uid = Cookies.get("uid");
  const toast = useToast();
  const [isLoading, setLoading] = useState();
  const [pdfFile, setpdfFile] = useState();
  const formik = useFormik({
    initialValues: {
      update: "create",
      visa_type: "",
      visa_number: "",
      visa_issue_date: "",
      visa_expiry_date: "",
      visa_file: "",
      share_code: "",
      dob: "",
      user_id: uid,
    },
    validationSchema: Yup.object({
      visa_type: Yup.string().required("This field is required"),
      visa_number: Yup.string().required("This field is required"),
      visa_issue_date: Yup.string().required("This field is required"),
      visa_expiry_date: Yup.string().required("This field is required"),
      visa_file: Yup.string().required("This field is required"),
    }),
    onSubmit: (data) => {
      setLoading(true);
      const url = API_BASE_URL + "application/saveRTW";
      axios
        .post(url, data)
        .then((response) => {
          if (response.data.status === 200) {
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
        .catch((error) => {
          toast({
            title: "error",
            description: error.message,
            position: "top",
            status: "error",
            isClosable: true,
          });
          setLoading(false);
        });
    },
  });
  const visat_type = [
    { value: "UK Passport", label: "UK Passport" },
    { value: "Student VISA", label: "Student VISA" },
    { value: "Work VISA ", label: "Work VISA" },
    { value: "Dependent VISA", label: "Dependent VISA" },
    { value: "Indefinite Leave to Remain", label: "Indefinite Leave to Remain" },
    // { value: "Others", label: "Others" },
    ,
  ];
  useEffect(() => {
    if (userRTW) {
      setpdfFile(API_BASE_URL + "uploads/" + userRTW.visa_file || null);
      formik.setValues({
        visa_type: userRTW.visa_type || "",
        visa_number: userRTW.visa_number || "",
        visa_expiry_date: userRTW.visa_expiry_date || "",
        visa_issue_date: userRTW.visa_issue_date || "",
        user_id: userRTW.user_id || "",
        update: "create"
      });
    }
    setLoading(false);
  }, [userRTW]);
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <OnboardingLayout
      pageTitle="RIGHT TO WORK"
      description="We need to confirm you're eligible to work in the UK so we'll use your following details to perform a right to work check."
      mainContent={
        <Stack
          direction={{ base: "column", md: "column", sm: "row" }}
          as={"form"}
          onSubmit={formik.handleSubmit}
        >
          {/* Names */}
          <Stack gap={4} direction={["column", "row"]}>
            <CustumSelect
              value={formik.values.visa_type}
              isInvalid={formik.errors.visa_type && formik.touched.visa_type}
              onChange={formik.handleChange}
              name="visa_type"
              placeholder="Select"
              formLabel="Visa Type "
              options={visat_type}
              label={visat_type.label}
            />
            <CustomInput
              value={formik.values.visa_number}
              isInvalid={
                formik.errors.visa_number && formik.touched.visa_number
              }
              onChange={formik.handleChange}
              formLabel="Document number"
              type="text"
              placeholder="Document number"
              name="visa_number"
            />
          </Stack>
          <Stack gap={2} direction={["column", "row"]}>
            <CustomInput
              value={formik.values.visa_issue_date}
              isInvalid={
                formik.errors.visa_issue_date && formik.touched.visa_issue_date
              }
              onChange={formik.handleChange}
              formLabel="Document Issue Date"
              type="date"
              placeholder="Document Issue Date"
              name="visa_issue_date"
            />
            <CustomInput
              value={formik.values.visa_expiry_date}
              isInvalid={
                formik.errors.visa_expiry_date &&
                formik.touched.visa_expiry_date
              }
              onChange={formik.handleChange}
              formLabel="Document Expiry Date"
              type="date"
              placeholder="Document Expiry Date"
              name="visa_expiry_date"
            />
          </Stack>
          <Stack gap={2} direction={["column", "row"]}>
            <FileUpload
              // onFileUpload={setUploadedFiles}
              onFileUpload={(file) => formik.setFieldValue("visa_file", file)}
            />
          </Stack>
          <Stack gap={2} direction={["column", "column"]}>
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
              
              <CustomButton
                as={'a'}

                colorScheme="yellow"
                label="Back"
                link="/application/id-upload"
              />
              <Box justifySelf={'center'} gap={'5'} >
                <CustomButton
                  as={'a'}
                  bg={"blue.400"}
                  colorScheme="blue"
                  label="Next"
                  link="/application/next-of-kin"
                />

              </Box>
            </Box>

          </Stack>
        </Stack>
      }
    />
  );
}
