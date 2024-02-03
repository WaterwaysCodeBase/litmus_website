"use client";

import {
  Box,
  Checkbox,
  Spinner,
  Stack, Text, useToast,

} from "@chakra-ui/react";

import { OnboardingLayout } from "../layout/OnboardingLayout";
import { CustomInput, CustumSelect } from "../components/Input";

import { useState, React, useEffect } from "react";


import SingleCertUpload from "./cert/SingleCertUpload";

import SubmitApplication from "./SubmitApplication";
import ViewCert from "./cert/ViewCert";
import { CustomButton } from "../components/Buttons";
import { API_BASE_URL } from "../components/APIs";
import axios from "axios";

export default function Certificate() {

  const toast = useToast();
  const [isLoading, setLoading] = useState();
  const selected = [
    { value: 'no', label: "No" },
    { value: 'yes', label: "Yes" },
  ];
  // const [selection, setSelection] = useState(null);
  // const [showFields, setShowFields] = useState();
  // const handleSelectionChange = (event) => {
  //   const value = event.target.value;
  //   setSelection(value);
  //   setShowFields(value == "yes");
  // };
  const [iHaveCert, setIHaveCert] = useState();
  const [submit, setSubmit] = useState(false);
  const [iNeedTraining, setINeedTraining] = useState(false);
  const handleSelectChange = (value, label) => {
    setIHaveCert(value);

  };
  const handleCheckedTraining = (data) => {
    const uid = sessionStorage.getItem("uid");
    setLoading(true);
    const url = API_BASE_URL + "/application/saveCertificate";
    axios
      .post(url, {
        iNeed: data, user_id: uid, iHave: 0
      })
      .then((response) => {
        if (response.data.status === "200") {
          toast({
            title: "Certificate Update",
            description: response.data.message,
            position: "top",
            status: "success",
            isClosable: true,
          });

          // navigate('/onboarding/identity');
        } else {
          toast({
            title: "Profile Update Error",
            description: response.data.message,
            position: "top",
            status: "error",
            isClosable: true,
          });

        }
      })
      .catch((error) => {

        toast({
          title: "Profile Update Error",
          description: error.message,
          position: "top",
          status: "error",
          isClosable: true,
        });
      }).finally(() => {
        // This block will be executed regardless of success or failure
        setLoading(false);
      });

  };
  // useEffect(() => {
  //   // This will run whenever iHaveCert changes
  //   alert(iHaveCert);
  // }, [iHaveCert]);
  return (
    <OnboardingLayout
      pageTitle="YOUR TRAINING CERTIFICATES"
      mainContent={
        <Stack gap={4} direction={{ base: "column", md: "column", sm: "row" }}>
          {/* Names */}

          <Stack gap={2} direction={["column", "row"]}>
            <CustumSelect
              value={iHaveCert}
              onChange={(event) => {
                setIHaveCert(event.target.value); // This will update your additional state
              }}
              name="data_type"
              placeholder="Select"
              formLabel="Do you have training certificate(s)?"
              options={selected} // Make sure to provide the correct options array
              label={selected.label} // Make sure to provide the correct label
            />
            {/* <CustumSelect
              onChange={handleSelectionChange}
              value={selection}
              // value={formik.values.data_type}
              // isInvalid={formik.errors.data_type && formik.touched.data_type}
              // onChange={formik.handleChange}
              name="data_type"
              placeholder="Select"
              formLabel="Do you have a single certificate for multiple trainings?"
              options={selected}
              label={selected.label}
            /> */}
          </Stack>

          {/* {showFields && <MultiCertUpload />} */}
          {/* {!showFields && <SingleCertUpload />} */}
          {iHaveCert === 'no' &&
            <>
              <Checkbox
                defaultChecked
                onChange={(event) => {
                  setINeedTraining(event.target.checked); // This will update your additional state

                 handleCheckedTraining(event.target.checked)

                }}
              >I Need Training</Checkbox>
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
                      label="Save"
                    />
                  )}
                </Box>
              </Stack>
            </>
          }
          {iHaveCert === 'yes' &&
            <SingleCertUpload />
          }

          <SubmitApplication />
          <Box w={{ base: '90%', md: '50%' }} mx={'auto'} p={3} border={'2px solid #012'}>
            <ViewCert />
          </Box>
        </Stack>
      }
    />
  );
}
