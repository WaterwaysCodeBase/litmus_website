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
  Radio,
  RadioGroup,
  Link,
  HStack,
} from "@chakra-ui/react";

import { OnboardingLayout } from "../layout/OnboardingLayout";
import { CustomInput, CustumSelect } from "../components/Input";
import { CustomButton } from "../components/Buttons";

import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../components/APIs";
import axios from "axios";
import { useUserPOI } from "../components/getUserPOI";
import { LoadingSpinner } from "../components/LoadingSpinner";
import SubmitApplication from "./SubmitApplication";
import FileUpload from "../components/FileUpload";
import PdfViewer from "../components/PDFViewer";
import { useFormik, useFormikContext } from "formik";
import useUserContext from "../components/UserContext";
import Cookies from "js-cookie";
import { useApiData } from "../components/GetData";
import { WarningIcon } from "@chakra-ui/icons";

export default function DBS() {
  const [isLoading, setLoading] = useState();
  const userDetails = JSON.parse(localStorage.getItem('userInfo'));
  const poiType = [
    { value: "Passport", label: "Passport" },
    { value: "UK Driver's Licence", label: "UK Driver's Licence" },
    { value: "UK Passport", label: "UK Passport" },
    { value: "National Identity Card", label: "National Identity Card" },
    { value: "Residence Permit", label: "Residence Permit" },
    { value: "Proof of Age Card", label: "Proof of Age Card" },
  ];

  const toast = useToast();
  const {
    data: offerAcceptance,
    loading: loadingOffer,
    fetchData: fetchOffer,
  } = useApiData("onboarding/getOfferAccepted");
  React.useEffect(() => {
    fetchOffer();
  }, []);

  const [requiredDBS, setRequiredDBS] = useState("");
  const [DBStype, setDBStype] = useState("");
  const [onUpdatedService, setOnUpdatedService] = useState("");
  const [activeButton, setactiveButton] = useState(true);

  const [error, setError] = useState(null); // State to hold errors

  const formik = useFormik({
    initialValues: {
      required_type: '',
      dbs_type: '',
      dbs_number: '',
      dbs_file: '',
      onUpdatedService: '',
      user_id: userDetails?.user_id
    },
    // validationSchema: Yup.object({

    // }),
    onSubmit: (data) => {
      console.log(data)
      setLoading(true);
      const url = API_BASE_URL + "onboarding/saveDBS";
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
    }
  })


  return (
    <OnboardingLayout
      pageTitle="DBS"
      mainContent={
        <Stack
          gap={4}
          direction={{ base: "column", md: "column", sm: "row" }}
          as={"form"}
          onSubmit={formik.handleSubmit}
        >
          {offerAcceptance?.accept === '1' ?
            <>
              <Text fontWeight={"bold"} textTransform={"uppercase"}>
                <br />
                DBS
              </Text>
              <Divider />
              <Text fontWeight={600}>DBS Check for your application:</Text>
              <Stack gap={2} direction={["column", "row"]}>
                <RadioGroup
                  name="required_type"
                  onChange={(value) => {

                    formik.handleChange("required_type")(value)
                    setRequiredDBS(value);

                  }}
                  value={formik.values.required_type}
                >
                  <Stack>
                    <Radio size='lg' name='required_type' value={'yes'} colorScheme='blue' >
                      My Job requires a DBS check
                    </Radio>
                    <Radio size='lg' name='required_type' value={'no'} colorScheme='red'>
                      My Job does not requires a DBS check
                    </Radio>
                  </Stack>
                </RadioGroup>

              </Stack>
              <Divider />
              {requiredDBS === 'yes' &&
                <Box gap={5}>
                  <Text fontWeight={600}>Type of DBS check required</Text>
                  <Stack gap={2} direction={["column", "row"]}>
                    <RadioGroup
                      name="dbs_type"
                      onChange={(value) => {
                        formik.handleChange("dbs_type")(value)
                        setDBStype(value);

                      }}
                      value={DBStype}
                    >
                      <Stack direction={["column", "column"]} spacing={5}>
                        <Radio size='lg' value="Enhanced" colorScheme='orange' >
                          Enhanced DBS
                        </Radio>
                        <Radio size='lg' value="basic" colorScheme='orange' >
                          Basic
                        </Radio>
                        <Radio size='lg' value="none" colorScheme='orange' onChange={formik.handleSubmit} >
                          I don't have a DBS yet
                        </Radio>
                      </Stack>
                    </RadioGroup>

                  </Stack>

                  <br />
                  <Box hidden={DBStype === 'none' ? true : false} >
                    <Text fontWeight={600}>I Have it on Updated Services</Text>
                    <Stack gap={2} direction={["column", "row"]}>
                      <RadioGroup
                        name="onUpdatedService"
                        onChange={(value) => {
                          setactiveButton(true)
                          formik.handleChange("onUpdatedService")(value)
                          setOnUpdatedService(value);
                        }}
                        value={onUpdatedService}
                      >
                        <Stack spacing={5} direction={["row", "row"]} >
                          <Radio si ze='lg' name='1' value="yes" colorScheme='orange' >
                            Yes
                          </Radio>
                          <Radio size='lg' name='1' value="no" colorScheme='orange' >
                            No
                          </Radio>
                        </Stack>
                      </RadioGroup>
                    </Stack>
                    <Stack py={3} hidden={onUpdatedService == 'yes' ? false : true} gap={2} direction={["column", "row"]}>
                      <CustomInput
                        value={formik.values.dbs_number}
                        formLabel={'Certificate Number'}
                        name={'dbs_number'}
                        onChange={(value) => {
                          setactiveButton(false)
                          formik.handleChange('dbs_number')(value)

                        }}
                        type={'text'}
                      />
                    </Stack>
                    <Stack py={5} hidden={onUpdatedService == 'no' ? false : true} gap={2} direction={["column", "row"]}>
                      <FileUpload
                        // onFileUpload={setUploadedFiles}
                        onFileUpload={(file) => {
                          formik.setFieldValue("poi_file", file)
                          setactiveButton(false)
                        }
                        }
                      />
                    </Stack>
                  </Box>
                  <Divider />
                  <Box py={5} hidden={DBStype === 'none' ? false : true} >
                    <Text>Apply for a new DBS <Link color={'blue'} href="https://www.hr-platform.co.uk/individual/application-login/?HT6u7Zv9CHXDkPSlVKq6CYHMniEhelow0fiOCbpNteab%2Fr%2B3adgiv9zHZUCM5WZkzzXGLbFV6m6x%2F6Zd%2FDGMWINCe8YSxht7oBmC%2F%2B6G1AlQQ4xI7ExcOQRk4MwyaZ64" >here</Link></Text>

                  </Box>
                  { }


                </Box>
              }
              {/* Doesnt require DBS */}

              <Stack gap={5} direction={["row", "row"]}
                hidden={requiredDBS === 'no' ? false : activeButton}
              >
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

                <HStack spacing={2} justifySelf={'flex-end'} >
                  <CustomButton
                    as={'a'}
                    // bg={"blue.400"}
                    colorScheme="yellow"
                    label="Back"
                    link="/employment-check/right-to-work"
                  />
                  <CustomButton
                    as={'a'}
                    bg={"blue.400"}
                    colorScheme="blue"
                    label="Next"
                    link="/employment-check/referee"
                  />

                </HStack>
              </Stack>
            </>
            :
            <Stack width={['100%', '60%']} mx={'auto'} bg={'red.50'} rounded={'lg'} alignItems={'center'} p={'2em'}>
              <WarningIcon fontSize={'3em'} color={'red'} />
              <Text color={'red'} textAlign={'center'} fontSize={'15pt'} fontWeight={700} >
                Please accept the provisional offfer <Link
                  color="blue" href="/employment-check/provisional-offer">here</Link> before submitting your Proof of right to work.
              </Text>

            </Stack>
          }
        </Stack >
      }
    />
  );
}
