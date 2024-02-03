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
  useToast,
  Spinner,
} from "@chakra-ui/react";

import { OnboardingLayout } from "../layout/OnboardingLayout";
import {
  CustomInput,
  CustumSelect,
  CustumSelectPosition,
} from "../components/Input";
import { CustomButton } from "../components/Buttons";
import FileInput from "../components/FIleInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ListCountries } from "../components/SelectCountry";
import { useUserInfo } from "../components/GetUserInfo";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../components/APIs";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";
import SubmitApplication from "./SubmitApplication";
import DynamicPageTitle from "../components/PageTitle ";
import PhoneNumberInput from "../components/PhoneNumberInput";

import { useNavigate } from "react-router-dom";
import useUserContext from "../components/UserContext";
import Cookies from "js-cookie";

export default function PersonalInfo() {
  const navigate = useNavigate();

  const { userDetails, loading, getUsersInfo, user } = useUserContext();
  const [vacancies, setVacancy] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    getUsersInfo();
    axios.get(API_BASE_URL + "career/getVacancy").then(
      (response) => {
        setVacancy(response?.data);
      },
      (error) => { }
    );
  }, []);
  const toast = useToast();
  const titles = [
    { value: "Mr", label: "Mr" },
    { value: "Mrs", label: "Mrs" },
    { value: "Ms", label: "Ms" },
    { value: "Miss", label: "Miss" },
    { value: "Dr", label: "Dr" },
    { value: "Prof", label: "Prof" },
    { value: "Rev", label: "Rev" },
    { value: "Pastor", label: "Pastor" },
    { value: "Sir", label: "Sir" },
    { value: "Madam", label: "Madam" },
    { value: "Lord", label: "Lord" },
    // Add more titles as needed
  ];
  const genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "non-binary", label: "Non-binary" },
    { value: "genderqueer", label: "Genderqueer" },
    { value: "transgender", label: "Transgender" },
    { value: "genderfluid", label: "Genderfluid" },
    { value: "agender", label: "Agender" },
    { value: "bigender", label: "Bigender" },
    // Add more gender options as needed
  ];
  const maritalStatusOptions = [
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "divorced", label: "Divorced" },
    { value: "widowed", label: "Widowed" },
    { value: "separated", label: "Separated" },
    // Add more marital status options as needed
  ];

  const handleFileChange = (files) => {
    console.log("Selected files:", files);
    // You can perform actions with the selected files here
  };
  const uid = Cookies.get("uid");
  const formik = useFormik({
    initialValues: {
      title: "",
      fname: "",
      lname: "",
      email: "",
      phone: "",
      oname: "",
      gender: "",
      nationality: "",
      dob: "",
      country_of_residence: "none",
      marital_status: "",
      position: "",
      user_id: uid,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please select your title"),
      gender: Yup.string().required("Please select your gender"),
      marital_status: Yup.string().required("Please select your gender"),
      phone: Yup.string().required("Please enter your phone number"),
      nationality: Yup.string().required("Please select your nationality"),
      dob: Yup.string().required("PLease Select your Date of Birth"),
      position: Yup.string().required("PLease Select te position applying for"),
    }),
    onSubmit: (data) => {
      console.log(data);
      setLoading(true);
      const url = API_BASE_URL + "application/savePersonalInfo";
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
            navigate('/application/address');
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
    if (userDetails) {
      formik.setValues({
        position: userDetails.pos_applying_for || "",
        title: userDetails.title || "",
        email: userDetails.email || "",
        fname: userDetails.fname || "",
        lname: userDetails.lname || "",
        oname: userDetails.oname || "",
        gender: userDetails.gender || "",
        dob: userDetails.dob || "",
        marital_status: userDetails.marital_status || "",
        phone: userDetails.phone_number || "",
        user_id: userDetails.user_id || "",
        nationality: userDetails.nationality || "",
        country_of_residence: userDetails.country_of_residence || "",
      });
    }
    setLoading(false);
  }, [userDetails]);
  if (loading) {
    return <LoadingSpinner />;
  }
  function isAgeValid(dateString) {
    let today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();

    // Check if the birthdate has occurred already this year
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age >= 16;
  }

  return (
    <>
      <DynamicPageTitle pageTitle={"Personal Info"} />
      {userDetails && (
        <OnboardingLayout
          pageTitle="Let's get to know you more!"
          mainContent={
            <Stack
              gap={4}
              direction={{ base: "column", md: "column", sm: "column" }}
              as={"form"}
              onSubmit={formik.handleSubmit}
            >
              <input
                value={formik.values.user_id}
                onChange={formik.handleChange}
                type="hidden"
                name="user_id"
              />
              {/* Names */}
              <CustumSelectPosition
                value={formik.values.position}
                isInvalid={formik.errors.position && formik.touched.position}
                onChange={formik.handleChange}
                name="position"
                placeholder="Select Position"
                formLabel="Position applying for:"
                options={vacancies}
                label={vacancies.job_title}
                disabled={user.agree == 1 && 'disabled'}
              />
              <Stack gap={2} direction={["column", "row"]}>
                <CustumSelect
                  value={formik.values.title}
                  isInvalid={formik.errors.title && formik.touched.title}
                  onChange={formik.handleChange}
                  name="title"
                  placeholder="Select"
                  formLabel="Title"
                  options={titles}
                  label={titles.label}
                />

                <CustomInput
                  value={formik.values.fname}
                  isInvalid={formik.errors.fname && formik.touched.fname}
                  onChange={formik.handleChange}
                  formLabel="First Name"
                  type="text"
                  placeholder="First Name"
                  name="fname"
                  disabled={"disabled"}
                />
              </Stack>
              <Stack gap={2} direction={["column", "row"]}>
                <CustomInput
                  value={formik.values.lname}
                  isInvalid={formik.errors.lname && formik.touched.lname}
                  onChange={formik.handleChange}
                  formLabel="Last name"
                  type="text"
                  placeholder="Last name"
                  name="lname"
                  disabled={"disabled"}
                />
                <CustomInput
                  formLabel="Email"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  disabled={"disabled"}
                />
              </Stack>
              <Stack gap={2} direction={["column", "row"]}>
                <CustomInput
                  value={formik.values.oname}
                  isInvalid={formik.errors.oname && formik.touched.oname}
                  onChange={formik.handleChange}
                  formLabel="Other Names"
                  type="text"
                  placeholder="Other Names"
                  name="oname"
                />
                <CustumSelect
                  value={formik.values.gender}
                  isInvalid={formik.errors.gender && formik.touched.gender}
                  onChange={formik.handleChange}
                  name="gender"
                  placeholder="Select"
                  formLabel="Gender"
                  options={genders}
                  label={genders.label}
                />
              </Stack>
              <Stack gap={2} direction={["column", "row"]}>
                <CustumSelect
                  value={formik.values.marital_status}
                  isInvalid={
                    formik.errors.marital_status &&
                    formik.touched.marital_status
                  }
                  onChange={formik.handleChange}
                  name="marital_status"
                  placeholder="Select"
                  formLabel="Marital Status"
                  options={maritalStatusOptions}
                  label={maritalStatusOptions.label}
                />
                <CustomInput
                  value={formik.values.dob}
                  isInvalid={
                    (formik.errors.dob && formik.touched.dob) ||
                    !isAgeValid(formik.values.dob)
                  }
                  onChange={formik.handleChange}
                  formLabel="Date of Birth"
                  type="date"
                  placeholder="Date of Birth"
                  name="dob"
                />
              </Stack>
              <Stack gap={2} direction={["column", "row"]}>

                <PhoneNumberInput value={formik.values.phone}
                  isInvalid={
                    formik.errors.phone && formik.touched.phone
                  }
                  onChange={(value) => formik.setFieldValue('phone', value)}
                  formLabel="Next of Kin Mobile number"
                  type="text"
                  placeholder="Enter Next of Kin Mobile number"
                  name="phone" />
                <ListCountries
                  value={formik.values.nationality}
                  isInvalid={
                    formik.errors.nationality && formik.touched.nationality
                  }
                  onChange={(selectedOption) => {
                    formik.handleChange("nationality")(selectedOption.value); // Update "nationality" field in Formik
                  }}
                  formLabel="Nationality"
                  name="nationality"
                />
              </Stack>

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
                <Box justifySelf={'center'}>
                  <CustomButton
                    as={'a'}
                    type="submit"
                    bg={"blue.400"}
                    colorScheme="blue"
                    label="Next"
                    link="/application/address"
                  />
                </Box>
              </Box>
            </Stack>
          }
        />
      )}
    </>
  );
}
