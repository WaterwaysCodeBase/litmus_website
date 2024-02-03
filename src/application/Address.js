"use client";

import { Stack, Box, useToast, Spinner, Badge, FormControl, FormLabel, Select, Text, Divider, Heading } from "@chakra-ui/react";

import { OnboardingLayout } from "../layout/OnboardingLayout";
import { CustomInput, CustomTextarea, CustumSelect } from "../components/Input";
import { CustomButton } from "../components/Buttons";
import FileInput from "../components/FIleInput";
import * as Yup from "yup";
import { ListCountries } from "../components/SelectCountry";
import { API_BASE_URL } from "../components/APIs";
import { useFormik } from "formik";
import { useAddressInfo } from "../components/getAddress";
import { useEffect, useState } from "react";
import axios from "axios";
import UploadCareWidget from "../components/UploadCareWidget";
import { LoadingSpinner } from "../components/LoadingSpinner";
import SubmitApplication from "./SubmitApplication";
import FileUpload from "../components/FileUpload";
import PdfViewer from "../components/PDFViewer";
import useUserContext from "../components/UserContext";
import Cookies from "js-cookie";
import { useApiData } from "../components/GetData";
export default function Address() {
  // const { userAddress, loading, getUserAddress } = useAddressInfo();
  const {
    data: userAddress,
    loading,
    fetchData,
  } = useApiData("application/getUserAddress");
  useEffect(() => {
    fetchData();
  }, []);
  const uid = Cookies.get("uid");
  const toast = useToast();
  const [isLoading, setLoading] = useState();
  // useEffect(() => {
  //   getUserAddress();
  //   // getUsersInfo()
  //   // const uid = sessionStorage.getItem("uid");
  // }, []);
  const formik = useFormik({
    initialValues: {
      house_number: "",
      address_line1: "",
      address_line2: "",
      town_city: "",
      country: "",
      county: "",
      post_code: "",
      poa_file: "",
      user_id: uid,
      application_type: ""
    },
    validationSchema: Yup.object({
      house_number: Yup.string().required("Please select your title"),
      address_line1: Yup.string().required("Please enter your Address"),
      // address_line2: Yup.string().required(""),
      country: Yup.string().required("This Field is required"),
      town_city: Yup.string().required("This Field is required"),
      county: Yup.string().required("This Field is required"),
      post_code: Yup.string().required("This Field is required"),
      poa_file: Yup.string().required("This Field is required"),
    }),
    onSubmit: (data) => {
      console.log(data);
      setLoading(true);
      const url = API_BASE_URL + "application/saveAddress.php";
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
  const [pdfFile, setpdfFile] = useState(null);

  useEffect(() => {
    if (userAddress) {
      setpdfFile(API_BASE_URL + "uploads/" + userAddress.poa_file || null);

      formik.setValues({
        house_number: userAddress.house_number || "",
        address_line1: userAddress.address_line1 || "",
        address_line2: userAddress.address_line2 || "",
        town_city: userAddress.town_city || "",
        country: userAddress.country || "",
        from: userAddress.address_from || "",
        to: userAddress.address_to || "",
        poa_file: userAddress.poa_file || "",
        poa_created_at: userAddress.phone_number || "",
        county: userAddress.county || "",
        post_code: userAddress.post_code || "",
        user_id: userAddress.user_id || "",
        application_type: userAddress.application_type || ""

      });
      setLocation(userAddress.application_type || "");
    }
    setLoading(false);
  }, [userAddress]);
  // if (loading) {
  //   return <LoadingSpinner />;
  // }
  const [location, setLocation] = useState(null); // Default value for local

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  return (
    <OnboardingLayout
      pageTitle="ADD ADDRESS DETAILS"
      //   description="Description"
      mainContent={
        <>
          {loading && <LoadingSpinner />}
          <Stack maxW={'3xl'} m='auto' p={'.5em'} as={"form"}

            onSubmit={formik.handleSubmit}>
            <FormControl>
              <FormLabel fontSize={{ base: '16pt', md: '24pt' }} textAlign={'center'}>Do you reside in the United Kingdom(UK)</FormLabel>
              <Select
                fontSize={{ base: '16pt', md: '20pt' }}
                height={'2em'}
                name="application_type"
                onChange={(event) => {
                  formik.handleChange('application_type')(event.target.value)
                  setLocation(event.target.value);
                }}
                value={formik.values.application_type}
                placeholder={"Select where you're applying from"}
              >
                <option value={'Local'}>Yes</option>
                <option value={'International'}>No</option>
              </Select>
            </FormControl>
          </Stack>
          <Divider py={5} />
          {location === '' && (
            <OustdeUK />
          )}
          {location === null && (
            <OustdeUK />
          )}
          {location === 'Local' && (
            <Stack
              py={5}
              direction={{ base: "column", md: "column", sm: "column" }}
              as={"form"}
              onSubmit={formik.handleSubmit}
            >

              {/* Names */}

              <Stack gap={2} direction={["column", "row"]}>
                <CustomInput
                  value={formik.values.house_number}
                  isInvalid={
                    formik.errors.house_number && formik.touched.house_number
                  }
                  onChange={formik.handleChange}
                  formLabel="House Number"
                  type="text"
                  placeholder="House Number"
                  name="house_number"
                />
              </Stack>
              <Stack gap={2} direction={["column", "row"]}>
                <CustomTextarea
                  value={formik.values.address_line1}
                  isInvalid={
                    formik.errors.address_line1 && formik.touched.address_line1
                  }
                  onChange={formik.handleChange}
                  formLabel="Address Line 1"
                  type="text"
                  placeholder="Address Line 1"
                  name="address_line1"
                  row="3"
                />
              </Stack>
              <Stack gap={2} direction={["column", "row"]}>
                <CustomTextarea
                  value={formik.values.address_line2}
                  isInvalid={
                    formik.errors.address_line2 && formik.touched.address_line2
                  }
                  onChange={formik.handleChange}
                  formLabel="Address Line 2"
                  type="text"
                  placeholder="Address Line 2"
                  name="address_line2"
                  row="3"
                />
              </Stack>
              <Stack gap={2} direction={["column", "row"]}>

                <CustomInput
                  value={formik.values.town_city}
                  isInvalid={formik.errors.town_city && formik.touched.town_city}
                  onChange={formik.handleChange}
                  formLabel="Town/City"
                  type="text"
                  placeholder="Town/City"
                  name="town_city"
                />
                <CustomInput
                  value={formik.values.county}
                  isInvalid={formik.errors.county && formik.touched.county}
                  onChange={formik.handleChange}
                  formLabel="County"
                  type="text"
                  placeholder="County"
                  name="county"
                />

              </Stack>

              <Stack gap={2} direction={["column", "row"]}>
                <CustomInput
                  value={formik.values.post_code}
                  isInvalid={formik.errors.post_code && formik.touched.post_code}
                  onChange={formik.handleChange}
                  formLabel="Post Code"
                  type="text"
                  placeholder="Post Code"
                  name="post_code"
                />
                <ListCountries
                  value={formik.values.country}
                  isInvalid={formik.errors.country && formik.touched.country}
                  onChange={(selectedOption) => {
                    formik.handleChange("country")(selectedOption.value); // Update "nationality" field in Formik
                  }}
                  placeholder="Select"
                  formLabel="Country"
                  name="country"
                />
              </Stack>
              <Stack gap={2} direction={["column", "column"]}>
                <Text fontSize={'lg'} fontWeight={'700'} color={'red'}>Kindly upload your proof of address (Valid Driving Licence, Tenancy Agreement, Utility Bill or a Recent Bank Statement) and save</Text>
                <FileUpload
                  // onFileUpload={setUploadedFiles}
                  onFileUpload={(file) => formik.setFieldValue("poa_file", file)}
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
                  <Box justifySelf={'center'} gap={'5'} >
                    <CustomButton
                      as={'a'}

                      bg={"blue.400"}
                      colorScheme="blue"
                      label="Next"
                      link="/application/id-upload"
                    />

                  </Box>
                  <CustomButton
                    as={'a'}
                    colorScheme="yellow"
                    label="Back"
                    link="/application/personal-info"
                  />
                </Box>
              </Stack>
            </Stack>
          )}

          {location === 'International' && (
            <OustdeUKConfirm />
          )}

        </>
      }
    />
  );
}

function OustdeUK() {
  return <Box maxW={'4xl'} textAlign={'center'} m='auto' p={'1em'}>
    <Text fontSize={{ base: '1em', md: '2em' }}>
      If you reside in the UK or have a valid work permit, select confirm by selecting <b>"YES"</b>, if you are an
      international applicant(doesn't reside in the UK) select <b>"NO"</b></Text>
  </Box>
}

function OustdeUKConfirm() {
  const uid = sessionStorage.getItem("uid");
  const toast = useToast();
  const [isLoading, setLoading] = useState();
  const formik = useFormik({
    initialValues: {
      country_applying_from: "",
      application_type: "International",
      house_number: "",
      address_line1: "",
      town_city: "",
      state: "",
      user_id: uid,
    },
    validationSchema: Yup.object({
      country_applying_from: Yup.string().required("Please select your title"),
      house_number: Yup.string().required("Please select your title"),
      address_line1: Yup.string().required("Please enter your Address"),
      town_city: Yup.string().required("This Field is required"),
      state: Yup.string().required("This Field is required"),
    }),
    onSubmit: (data) => {
      console.log(data);
      setLoading(true);
      const url = API_BASE_URL + "application/saveApplicantLocation.php";
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
  return <Box maxW={'2xl'} p={'1em'} justifyContent={'flex-start'} >
    <Text fontSize={'1.3em'} fontWeight={'bold'}>Please select the country you are applying from</Text >
    <Stack
      py={5}
      direction={{ base: "column", md: "column", sm: "column" }}
      as={"form"}

      onSubmit={formik.handleSubmit}
    >

      {/* Names */}

      <Stack gap={2} direction={["column", "row"]}>
        <CustomInput
          value={formik.values.house_number}
          isInvalid={
            formik.errors.house_number && formik.touched.house_number
          }
          onChange={formik.handleChange}
          formLabel="House Number"
          type="text"
          placeholder="House Number"
          name="house_number"
        />
      </Stack>
      <Stack gap={2} direction={["column", "row"]}>
        <CustomTextarea
          value={formik.values.address_line1}
          isInvalid={
            formik.errors.address_line1 && formik.touched.address_line1
          }
          onChange={formik.handleChange}
          formLabel="Address Line 1"
          type="text"
          placeholder="Address Line 1"
          name="address_line1"
          row="3"
        />
      </Stack>
      <Stack gap={2} direction={["column", "row"]}>
        <CustomInput
          value={formik.values.town_city}
          isInvalid={formik.errors.town_city && formik.touched.town_city}
          onChange={formik.handleChange}
          formLabel="Town/City"
          type="text"
          placeholder="Town/City"
          name="town_city"
        />
        <CustomInput
          value={formik.values.county}
          isInvalid={formik.errors.county && formik.touched.county}
          onChange={formik.handleChange}
          formLabel="State/Province"
          type="text"
          placeholder="State"
          name="state"
        />

      </Stack>


      <Stack gap={2} direction={["column", "row"]}>
        <ListCountries
          value={formik.values.country_applying_from}
          isInvalid={formik.errors.country_applying_from && formik.touched.country_applying_from}
          onChange={(selectedOption) => {
            formik.handleChange("country_applying_from")(selectedOption.value); // Update "nationality" field in Formik
          }}
          placeholder="Select"
          formLabel="Country"
          name="country_applying_from"
        />
      </Stack>
      <Stack gap={2} direction={["column", "column"]}>
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
          <Box justifySelf={'center'} gap={''}>
            <CustomButton
              as={'a'}
              type="submit"
              bg={"blue.400"}
              colorScheme="blue"
              label="Next"
              link="/application/id-upload"
            />
          </Box>
          <CustomButton
            as={'a'}
            colorScheme="yellow"
            label="Back"
            link="/application/personal-info"
          />
        </Box>


      </Stack>
    </Stack>


  </Box>
}