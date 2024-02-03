"use client";

import {
  Stack,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Alert,
  Heading,
  Box,
  Divider,
  Text,
  Badge,
  Spinner,
  useToast,
} from "@chakra-ui/react";

import { OnboardingLayout } from "../layout/OnboardingLayout";
import { CustomInput, CustumSelect } from "../components/Input";
import { CustomButton } from "../components/Buttons";
import FileInput from "../components/FIleInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ListCountries } from "../components/SelectCountry";
import UploadCareWidget from "../components/UploadCareWidget";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../components/APIs";
import axios from "axios";
import { useUserPOI } from "../components/getUserPOI";
import { LoadingSpinner } from "../components/LoadingSpinner";
import SubmitApplication from "./SubmitApplication";
import FileUpload from "../components/FileUpload";
import PdfViewer from "../components/PDFViewer";

export default function UploadPOI() {
  const [isLoading, setLoading] = useState();

  const poiType = [
    { value: "International Passport", label: "International Passport" },
    { value: "UK Driver's Licence", label: "UK Driver's Licence" },
    { value: "UK Passport", label: "UK Passport" },
    { value: "National Identity Card(UK)", label: "National Identity Card (UK)" },
    { value: "Proof of Age Card(UK)", label: "Proof of Age Card (UK)" },
  ];
  const uid = sessionStorage.getItem("uid");
  const toast = useToast();
  const { userPOI, loading, getUsersPOI } = useUserPOI();
  useEffect(() => {
    getUsersPOI();
  }, []);
  const formik = useFormik({
    initialValues: {
      poi_file: "",
      poi_type: "",
      user_id: uid,
    },
    validationSchema: Yup.object({
      poi_file: Yup.string().required("This field is required"),
      poi_type: Yup.string().required("This field is required"),
    }),
    onSubmit: (data) => {
      setLoading(true);
      const url = API_BASE_URL + "/application/savePOI";
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
    if (userPOI) {
      setpdfFile(API_BASE_URL + "uploads/" + userPOI.poi_file || null);
      formik.setValues({
        poi_file: userPOI.poi_file || "",
        poi_type: userPOI.poi_type || "",
        user_id: userPOI.user_id || "",
      });
    }
    setLoading(false);
  }, [userPOI]);
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <OnboardingLayout
      pageTitle="Let's get to know you more!"
      mainContent={
        <Stack
          gap={4}
          direction={{ base: "column", md: "column", sm: "row" }}
          as={"form"}
          onSubmit={formik.handleSubmit}
        >
          <Text fontWeight={"bold"} textTransform={"uppercase"}>
            <br />
            Proof of Identity
          </Text>
          <Divider />
          <Stack gap={2} direction={["column", "row"]}>
            <CustumSelect
              value={formik.values.poi_type}
              isInvalid={formik.errors.poi_type && formik.touched.poi_type}
              onChange={formik.handleChange}
              name="poi_type"
              placeholder="Select Identity Document"
              formLabel="Upload Identity document Type"
              options={poiType}
              label={poiType.label}
            />
          </Stack>

          <Text fontWeight={"bold"} fontStyle={"uppercase"}>
            <br />
            REQUIRED DOCUMENT
          </Text>
          <Divider />
          <Stack gap={2} direction={["column", "row"]}>
            <FileUpload
              // onFileUpload={setUploadedFiles}
              onFileUpload={(file) => formik.setFieldValue("poi_file", file)}
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
                link="/application/address"
              />
               <Box justifySelf={'center'} gap={'5'} >
                <CustomButton
                  as={'a'}
                  bg={"blue.400"}
                  colorScheme="blue"
                  label="Next"
                  link="/application/right-to-work"
                />

              </Box>
            </Box>


          </Stack>
        </Stack>
      }
    />
  );
}
