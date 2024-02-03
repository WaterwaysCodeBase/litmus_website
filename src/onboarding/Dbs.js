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

import FileUpload from "../components/FileUpload";
import PdfViewer from "../components/PDFViewer";
import SubmitApplication from "../application/SubmitApplication";
import { dbst_type } from "../util/data";
import Cookies from "js-cookie";

export const Dbs = () => {
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
      dbs_type: "",
      dbs_number: "",
      dbs_issue_date: "",
      dbs_expiry_date: "",
      dbs_file: "",
      user_id: uid,
    },
    validationSchema: Yup.object({
      dbs_type: Yup.string().required("This field is required"),
      dbs_number: Yup.string().required("This field is required"),
      dbs_issue_date: Yup.string().required("This field is required"),
      dbs_expiry_date: Yup.string().required("This field is required"),
      dbs_file: Yup.string().required("This field is required"),
    }),
    onSubmit: (data) => {
      setLoading(true);
      const url = API_BASE_URL + "application/saveRTW";
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

  useEffect(() => {
    if (userRTW) {
      setpdfFile(API_BASE_URL + "uploads/" + userRTW.dbs_file || null);
      formik.setValues({
        dbs_type: userRTW.dbs_type || "",
        dbs_number: userRTW.dbs_number || "",
        dbs_expiry_date: userRTW.dbs_expiry_date || "",
        dbs_issue_date: userRTW.dbs_issue_date || "",
        user_id: userRTW.user_id || "",
      });
    }
    setLoading(false);
  }, [userRTW]);
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <Stack
        direction={{ base: "column", md: "column", sm: "row" }}
        as={"form"}
        onSubmit={formik.handleSubmit}
      >
        {/* Names */}
        <Stack gap={4} direction={["column", "column"]}>
          <CustumSelect
            value={formik.values.dbs_type}
            isInvalid={formik.errors.dbs_type && formik.touched.dbs_type}
            onChange={formik.handleChange}
            name="dbs_type"
            placeholder="Select"
            formLabel="DBS Type "
            options={dbst_type}
            label={dbst_type.label}
          />
          <CustomInput
            value={formik.values.dbs_number}
            isInvalid={formik.errors.dbs_number && formik.touched.dbs_number}
            onChange={formik.handleChange}
            formLabel="DBS Issue number"
            type="text"
            placeholder="Enter DBS Issue number"
            name="dbs_number"
          />
          <CustomInput
            value={formik.values.dbs_issue_date}
            isInvalid={
              formik.errors.dbs_issue_date && formik.touched.dbs_issue_date
            }
            onChange={formik.handleChange}
            formLabel="DBS Issue Date"
            type="date"
            placeholder="Enter DBS Issue Date"
            name="dbs_issue_date"
          />
          <CustomInput
            value={formik.values.dbs_expiry_date}
            isInvalid={
              formik.errors.dbs_expiry_date && formik.touched.dbs_expiry_date
            }
            onChange={formik.handleChange}
            formLabel="DBS Expiry Date"
            type="date"
            placeholder="Enter DBS  Expiry Date"
            name="dbs_expiry_date"
          />
          <FileUpload
            // onFileUpload={setUploadedFiles}
            onFileUpload={(file) => formik.setFieldValue("dbs_file", file)}
          />
        </Stack>

        <Stack gap={2} direction={["column", "column"]}>
          <Box py={3}>
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
                label="Upload"
              />
            )}
          </Box>
        </Stack>
      </Stack>
    </>
  );
};
