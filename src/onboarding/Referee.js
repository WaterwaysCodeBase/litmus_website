import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Heading,
  Link,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { CustomInput, CustomTextarea } from "../components/Input";
import { CustomButton } from "../components/Buttons";
import React, { useState } from "react";
import { useApiData } from "../components/GetData";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API_BASE_URL } from "../components/APIs";
import { useEffect } from "react";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";
import Cookies from "js-cookie";
import { OnboardingLayout } from "../layout/OnboardingLayout";
import { WarningIcon } from "@chakra-ui/icons";

export const Referee = () => {
  const [isLoading, setLoading] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const uid = Cookies.get('uid')
  const {
    data: ref,
    loading,
    fetchData,
  } = useApiData("onboarding/getReferee");
  useEffect(() => {
    fetchData();
  }, []);
  const {
    data: offerAcceptance,
    loading: loadingOffer,
    fetchData: fetchOffer,
  } = useApiData("onboarding/getOfferAccepted");
  React.useEffect(() => {
    fetchOffer();
  }, []);
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      ref_fname: "",
      ref_lname: "",
      ref_mobile: "",
      ref_email: "",
      user_id: uid,
    },
    validationSchema: Yup.object({
      ref_fname: Yup.string().required("This Feld is required"),
      ref_lname: Yup.string().required("This Feld is required"),
      ref_email: Yup.string()
        .required("This Feld is required")
        .email("Enter a vlid Email address"),
      ref_mobile: Yup.string().required("This Feld is required"),
    }),
    onSubmit: (data) => {
      setLoading(true);
      const url = API_BASE_URL + "onboarding/saveReferee";
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

            window.location.reload();
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
  const [Referee, setWorkHistory] = useState([]);
  const [refLoading, setRefLoading] = useState();
  useEffect(() => {
    if (ref) {
      setWorkHistory(ref);
    }
    setLoading(false);
  }, [ref]);
  const handleDelete = async (id) => {
    setRefLoading(true)
    const url = API_BASE_URL + "onboarding/deleteReferee";

    try {
      const response = await axios.post(url, { referee_id: id });
      console.log(response)
      if (response.data?.status === 200) {
        toast({
          title: "Referee Update",
          description: response.data.message,
          position: "top",
          status: "success",
          isClosable: true,
        });
      }
      setRefLoading(false)
      window.location.reload();
    } catch (error) {
      console.error('Error deleting referee:', error);

      toast({
        title: "Error",
        description: "An error occurred while deleting the referee.",
        position: "top",
        status: "error",
        isClosable: true,
      });
    }
    setRefLoading(false)
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <OnboardingLayout
        pageTitle="Reference"
        description="We need to two reference"
        mainContent={
          <>
            {offerAcceptance?.accept === '1' ?
              <Box as="form" onSubmit={formik.handleSubmit}>

                <Stack gap={2} direction={["column", "row"]} pb={2}>
                  <CustomInput
                    value={formik.values.ref_fname}
                    isInvalid={
                      formik.errors.ref_fname && formik.touched.ref_fname
                    }
                    formErroMsg={formik.errors.ref_fname}
                    onChange={formik.handleChange}
                    formLabel="Referee's First Name"
                    type="text"
                    placeholder="Referee's Name"
                    name="ref_fname"
                  />
                  <CustomInput
                    value={formik.values.ref_lname}
                    isInvalid={
                      formik.errors.ref_lname && formik.touched.ref_lname
                    }
                    formErroMsg={formik.errors.ref_lname}
                    onChange={formik.handleChange}
                    formLabel="Referee's Last Name"
                    type="text"
                    placeholder="Referee's Name"
                    name="ref_lname"
                  />
                </Stack>
                <Stack gap={2} direction={["column", "row"]} pb={2}>
                  <CustomInput
                    value={formik.values.ref_mobile}
                    isInvalid={
                      formik.errors.ref_mobile && formik.touched.ref_mobile
                    }
                    formErroMsg={formik.errors.ref_mobile}
                    onChange={formik.handleChange}
                    formLabel="Referee Phone number"
                    type="text"
                    placeholder="Referee Phone number"
                    name="ref_mobile"
                  />{" "}
                  <CustomInput
                    value={formik.values.ref_email}
                    isInvalid={
                      formik.errors.ref_email && formik.touched.ref_email
                    }
                    formErroMsg={formik.errors.ref_email}
                    onChange={formik.handleChange}
                    formLabel="Referee Email address"
                    type="text"
                    placeholder="Referee Email address"
                    name="ref_email"
                  />
                </Stack>
                <Stack gap={5} direction={["row", "row"]}>
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
                      link="/employment-check/dbs"
                    />
                    <CustomButton
                      as={'a'}
                      bg={"blue.400"}
                      colorScheme="blue"
                      label="Next"
                      link="/employment-check/provisional-offer"
                    />

                  </HStack>
                </Stack>


                <Heading fontSize={25}>List of Sent Request</Heading>
                <br />
                {loading ? (
                  <p>Loading...</p>
                ) :
                  Array.isArray(Referee) && Referee.length > 0 ?
                    (<Stack spacing={3}>
                      {Referee.map((ref, index) => (
                        <>

                          <Stack bg={'green.50'} rounded={'lg'} py={4} px={4}>
                            <Heading color={'green.600'} fontSize={20}>Referee {index + 1}</Heading>
                            <Text> <b>Referee Name:</b> {ref.ref_fname + ' ' + ref.ref_lname}</Text>
                            <Text> <b>Referee Email Address:</b> {ref.ref_email}</Text>
                            <Text> <b>Referee Mobile Number:</b> {ref.ref_mobile}</Text>
                            <Text> <b>Responded?:</b> {ref.isRefResponded === 'true' ? "Responded" : 'Not Reponded'}</Text>
                            <Box>
                              <Button
                                onClick={() => handleDelete(ref.referee_id)}
                                disabled={'disabled'} label={'Delete'} colorScheme={'red'}
                                isLoading={refLoading}
                              >Delete</Button>
                            </Box>
                          </Stack>
                        </>
                      ))}
                    </Stack>)
                    :
                    <Text color={'red'} fontWeight={'bold'}>No Refere Added yet</Text>}

              </Box>
              :
              <Stack width={['100%', '60%']} mx={'auto'} bg={'red.50'} rounded={'lg'} alignItems={'center'} p={'2em'}>
                <WarningIcon fontSize={'3em'} color={'red'} />
                <Text color={'red'} textAlign={'center'} fontSize={'15pt'} fontWeight={700} >
                  Please accept the provisional offfer <Link
                    color="blue" href="/employment-check/provisional-offer">here</Link> before submitting your Proof of right to work.
                </Text>

              </Stack>
            }
          </>
        } />
      {/* <Heading>Referee</Heading> */}

    </>
  );
};
