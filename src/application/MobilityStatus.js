"use client";

import { Stack, Box, useToast, Spinner } from "@chakra-ui/react";

import { OnboardingLayout } from "../layout/OnboardingLayout";
import { CustomInput, CustomTextarea, CustumSelect } from "../components/Input";
import { CustomButton } from "../components/Buttons";

import * as Yup from "yup";

import { API_BASE_URL } from "../components/APIs";
import { useFormik } from "formik";

import { useEffect, useState } from "react";
import axios from "axios";

import { LoadingSpinner } from "../components/LoadingSpinner";
import SubmitApplication from "./SubmitApplication";


import PhoneNumberInput from "../components/PhoneNumberInput";
import { DataBoolean, DriverLicenseType } from "../util/data";
import Cookies from "js-cookie";
import { useApiData } from "../components/GetData";

const nokRelationship = [
  { label: 'Brother', value: 'Brother' },
  { label: 'Sister', value: 'Sister' },
  { label: 'Father', value: 'Father' },
  { label: 'Mother', value: 'Mother' },
  { label: 'Spouse', value: 'Spouse' },
  { label: 'Child', value: 'Child' },
  { label: 'Friend', value: 'Friend' },
  // Add more relationships as needed
];
export default function MobilityStatus() {
  const {
    data: mobilityStatus,
    loading,
    fetchData,
  } = useApiData("application/getUserMobility");
  useEffect(() => {
    fetchData();
  }, []);
  const uid = Cookies.get("uid");
  const toast = useToast();
  const [isLoading, setLoading] = useState();

  const formik = useFormik({
    initialValues: {
      dl_type: "",
      car_owner: "",

      user_id: uid,
    },
    validationSchema: Yup.object({

      car_owner: Yup.string().required("Please Select an option"),
      dl_type: Yup.string().required("Please Select an option"),

    }),
    onSubmit: (data) => {
      console.log(data);
      setLoading(true);
      const url = API_BASE_URL + "application/saveMobility.php";
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

  useEffect(() => {
    if (mobilityStatus) {
     

      formik.setValues({
        dl_type: mobilityStatus.dl_type || "",
        car_owner: mobilityStatus.car_owner || "",

      });
   
    }
 
  }, [mobilityStatus]);
  // if (loading) {
  //     return <LoadingSpinner />;
  // }
  return (
    <OnboardingLayout
      pageTitle="Mobility Status"
      //   description="Description"
      mainContent={
        <>

          <Stack
            maxW={'2xl'}
            direction={{ base: "column", md: "column", sm: "column" }}
            as={"form"}
            onSubmit={formik.handleSubmit}
          >

            <Stack gap={2} direction={["column", "column"]}>
              <CustumSelect
                value={formik.values.car_owner}
                isInvalid={formik.errors.car_owner && formik.touched.car_owner}
                onChange={formik.handleChange}
                name="car_owner"
                placeholder="Select"
                formLabel="Have access to own car?"
                options={DataBoolean}
                label={DataBoolean.label}
              />
              <CustumSelect
                value={formik.values.dl_type}
                isInvalid={formik.errors.dl_type && formik.touched.dl_type}
                onChange={formik.handleChange}
                name="dl_type"
                placeholder="Select Driver License type"
                formLabel="Nature of Driving Licence"
                options={DriverLicenseType}
                label={DriverLicenseType.label}
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
                <CustomButton
                  as={'a'}
                  colorScheme="yellow"
                  label="Back"
                  link="/application/next-of-kin"
                />
                <Box justifySelf={'center'} gap={'5'} >
                  <CustomButton
                    as={'a'}
                    bg={"blue.400"}
                    colorScheme="blue"
                    label="Next"
                    link="/application/work-history"
                  />

                </Box>

              </Box>


            </Stack>
          </Stack></>
      }
    />
  );
}
