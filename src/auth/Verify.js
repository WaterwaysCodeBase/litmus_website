"use client";

import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  SimpleGrid,
  useToast,
  HStack,
  Link,
} from "@chakra-ui/react";
import { CustomInput, CustumSelect } from "../components/Input";

import { CustomButton } from "../components/Buttons";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoadingSpinner } from "../components/LoadingSpinner";
import axios from "axios";
import { API_BASE_URL } from "../components/APIs";
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  CheckCircleIcon,
} from "@chakra-ui/icons";
import { FancySidebar } from "../layout/component/FancySidebar";
import { useEffect } from "react";
import ApiRequest from "../components/APIRequest";
import GeneralLayout from "../layout/GeneralLayout";

export default function Verify() {
  const [loading, setLoading] = useState();
  const [verified, setVerified] = useState();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { email, uid, fname } = location.state;
  const sessionEmail = localStorage.getItem("email");

  function checkVerifyInfo() {
    if (sessionEmail == null) {
      localStorage.clear("email");
      localStorage.clear("email");
      localStorage.clear("fname");
      navigate("/login");
    }
  }
  function sendCodeAgain() {
    setLoading(true);
    const url = API_BASE_URL + "auth/sendVerifyEmail";
    const data = {
      email: localStorage.getItem("email"),
      uid: localStorage.getItem("uid"),
    };

    axios.post(url, data).then((response) => {
      if (response.data.status === 200) {
        toast({
          title: "Verification Message",
          description: response.data.message,
          position: "top",
          status: "success",
          isClosable: true,
          size: "lg",
        });
        setLoading(false);
      } else {
        toast({
          title: "Verification Error",
          description: response.data.message,
          position: "top",
          status: "error",
          isClosable: true,
          size: "lg",
        });
        setLoading(false);
      }
    });
  }
  const formik = useFormik({
    initialValues: {
      verification_code: "",
      uid: uid,
      fname: fname,
      email: email,
    },
    validationSchema: Yup.object({
      verification_code: Yup.string().required("Enter your Verification Code"),
    }),
    onSubmit: (data) => {
      setLoading(true);
      const url = API_BASE_URL + "auth/verifyEmail.php";
      axios
        .post(url, data)
        .then((response) => {
          if (response.data.status === 200) {
            toast({
              title: "Verification Message",
              description: response.data.message,
              position: "top",
              status: "success",
              isClosable: true,
              size: "lg",
            });
            localStorage.clear("email");
            localStorage.clear("email");
            localStorage.clear("fname");
            setVerified(true);
          } else {
            toast({
              title: "Verification Error",
              description: response.data.message,
              position: "top",
              status: "error",
              isClosable: true,
              size: "lg",
            });
            setLoading(false);
          }
        })
        .catch((error) => {});
    },
  });
  const hover = {
    // backgroundColor: "blue.400",
    color: "blue.400",
    transform: "translateX(5px)",
  };
  const buttonTransition =
    '"background-color 0.3s, color 0.3s, transform 0.3s"';
  useEffect(() => {
    checkVerifyInfo();
  }, []);
  return (
    // <GeneralLayout
    //   mainContent={
        <>
               {verified ? (
              <Box
                as={SimpleGrid}
                maxW={"7xl"}
                columns={{ base: 1, md: 1 }}
                spacing={{ base: 10, lg: 32 }}
                py={{ base: 10, sm: 20 }}
                height={{ base: "100vh", lg: "100vh" }}
                justifyContent={"center"}
                alignContent={"center"}
                m={"auto"}
              >
                <Box gap={5} textAlign={"center"} m={"auto"}>
                  <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
                  <Heading
                    as="h2"
                    fontSize={{ base: "5xl", md: "6xl" }}
                    mt={6}
                    mb={2}
                  >
                    Account Verification Successful
                  </Heading>
                  <Text fontSize="2xl" color={"gray.500"} lineHeight={1.5}>
                    Your email has been successfully verified. You can now{" "}
                    <Text
                      as={"a"}
                      fontWeight={"600"}
                      color="blue.500"
                      href="/login"
                    >
                      Log in
                    </Text>{" "}
                    to your account.
                  </Text>
                </Box>
              </Box>
            ) : (
              <Container
                as={SimpleGrid}
                maxW={"7xl"}
                columns={{ base: 1, md: 2 }}
                spacing={{ base: 10, lg: 32 }}
                py={{ base: 10, sm: 20 }}
                height={{ base: "auto", lg: "100vh" }}
                justifyContent={"center"}
                alignContent={"center"}
              >
                <Stack
                  spacing={10}
                  justifyContent={"center"}
                  textAlign={{ base: "center", lg: "left" }}
                >
                  <Heading
                    color={"gray.800"}
                    // lineHeight={1.1}
                    fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                  >
                    Account Verificaion!
                  </Heading>
                  <Text color={"gray.500"} fontSize={{ base: "sm", sm: "lg" }}>
                    Dear
                    <strong> {fname == null ? <>Applicant</> : fname}</strong>,
                    <br /> We are glad to have you here, kindly verify your
                    account in order to continue.
                  </Text>
                  <Box>
                    <CustomButton
                      as={"a"}
                      transition={buttonTransition}
                      _hover={hover}
                      bg={"transparent"}
                      justifyContent={"left"}
                      leftIcon={
                        <ArrowBackIcon
                          fontSize={"2rem"}
                          p={1}
                          color={"white"}
                          bg={"blue.400"}
                          rounded={"full"}
                        />
                      }
                      borderWidth={1}
                      colorScheme="blue"
                      color={"blue.400"}
                      label={"Back"}
                      link={"/register"}
                    />
                  </Box>
                </Stack>
                <Stack
                  bg={"blue.100"}
                  rounded={"xl"}
                  p={{ base: 4, sm: 6, md: 8 }}
                  spacing={{ base: 8, md: 5 }}
                  maxW={{ lg: "lg" }}
                  justifyContent={"center"}
                >
                  <Stack spacing={5}>
                    <Heading>Email Verification </Heading>
                    <Text className="bold">
                      We have sent averification code to{" "}
                      <strong>{email}</strong>
                      <br />
                      Please Check your spam or junk folder if it doesn't appear
                      in your inbox
                    </Text>
                  </Stack>
                  <Box as={"form"} onSubmit={formik.handleSubmit}>
                    <Stack spacing={5}>
                      <CustomInput
                        formLabel="Enter code here"
                        placeholder="Enter Code here"
                        type="text"
                        isInvalid={
                          formik.errors.verification_code &&
                          formik.touched.verification_code
                        }
                        py="7"
                        borderRadius="0"
                        name="verification_code"
                        onChange={formik.handleChange}
                        value={formik.values.verification_code}
                        formErroMsg={formik.errors.verification_code}
                      />
                      <Box justify="space-between" dir="column">
                        <Text>
                          Didn't Receive any code?{" "}
                          <Link onClick={sendCodeAgain}>
                            {" "}
                            <strong>Send again</strong>
                          </Link>
                        </Text>
                      </Box>
                      {loading ? (
                        <LoadingSpinner />
                      ) : (
                        <CustomButton
                          type="submit"
                          label="Verify"
                          width={"full"}
                          bg={"blue.400"}
                          color={"white"}
                          _hover={{
                            bg: "blue.500",
                          }}
                        />
                      )}
                    </Stack>
                  </Box>
                </Stack>
              </Container>
            )}
          </>
    
    //   }
    // />
  );
}
