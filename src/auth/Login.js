"use client";

import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  SimpleGrid,
  HStack,
  useToast,
  FormLabel,
  Switch,
  FormControl,
  useColorModeValue,
} from "@chakra-ui/react";
import { CustomInput } from "../components/Input";

import { CustomButton } from "../components/Buttons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { API_BASE_URL } from "../components/APIs";
import axios from "axios";
import GeneralLayout from "../layout/GeneralLayout";
import Cookies from "js-cookie";
import { USER_LEVELS } from "../util/data";


export default function Login() {

  const navigate = useNavigate();
  useEffect(() => {
    // Retrieve user information from cookies
    const token = Cookies.get('token');
    const uid = Cookies.get('uid');
    const isLoggedIn = Cookies.get('isLoggedin');
    const userLevel = Cookies.get('userLevel');

    // Check if the user is logged in
    if (isLoggedIn === 'true' && token && uid && userLevel) {
      // Redirect to the dashboard
      navigate('/welcome');
    }
  }, [navigate]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
      // .matches(
      //   /^(?=.*[a-z])(?=.*[_!@#\$%\^&\*-?])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      // ),
    }),
    onSubmit: (data) => {
      setLoading(true);
      const url = API_BASE_URL + "/auth/login";
      axios
        .post(url, data)
        .then((response) => {
          setLoading(false);
          if (response.data.status === 200) {
           
            const { uid, userLevel, token } = response.data;
            const applicationURL = localStorage.getItem("url") || null;
            const position = localStorage.getItem("position");
            sessionStorage.setItem("uid", uid);
            sessionStorage.setItem("userLevel", userLevel);
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("isLoggedin", true);
            localStorage.setItem("userInfo", true);
            Cookies.set("token", token);
            Cookies.set("uid", uid);
            Cookies.set("isLoggedin", true);
            Cookies.set("userLevel", userLevel);

            toast({
              title: "Site Message",
              description: response.data.message,
              position: "top",
              status: "success",
              isClosable: true,
            });
            if (applicationURL) {
              navigate(applicationURL);
            }
            if (USER_LEVELS) {
              // Redirect the user based on their user level
              switch (parseInt(userLevel, 10)) {
                case USER_LEVELS.SIGNUP:
                  navigate("/welcome");
                  break;
                case USER_LEVELS.APPLICATION_PROCESS:
                  navigate("/welcome");
                  break;
                case USER_LEVELS.INTERVIEW:
                  navigate("/interview/schedule");
                  break;
                     case USER_LEVELS.PRE_EMPLOYMENT_CHECK:
                  navigate("/employment-check/provisional-offer");
                  break;
                case USER_LEVELS.CONTRACT_AGREEMENT:
                  navigate("/contract-agreement");
                  break;
                case USER_LEVELS.STAFF:
                 navigate("/dashboard");
                  break;
                case USER_LEVELS.ADMIN:
                  navigate("/admin");
                  break;
                case USER_LEVELS.FAIL:
                 
                  break;
                default:
                  // Handle other cases
                  break;
              }
            }
          } else if (response.data.status === 210) {
            setLoading(false);
            toast({
              title: "Site Message",
              description: response.data.message,
              position: "top",
              status: "info",
              isClosable: true,
            });
            localStorage.setItem("email", data.email);
            localStorage.setItem("uid", response.data.uid);
            // localStorage.setItem("fname", data.fname);
            navigate("/verify", {
              state: {
                uid: response.data.uid,
                fname: response.data.fname,
                email: data.email,
              },
            });
          } else if (response.data.status === 220) {
            setLoading(false);
            toast({
              title: "Site Message",
              description: response.data.message,
              position: "top",
              status: "info",
              isClosable: true,
            });
          } else {
            setLoading(false);
            toast({
              title: "Login Failed",
              description: "Invalid email or password",
              status: "error",
              position: "top",
              isClosable: true,
            });
          }
        })
        .catch((error) => {
          setLoading(false);
          toast({
            title: "Login Failed",
            description: "Internet Connection Problem",
            status: "error",
            position: "top",
            isClosable: true,
          });
        });
    },
  });

  return (
    <GeneralLayout
      pageContent={
        <Container
          as={SimpleGrid}
          maxW={"7xl"}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: '8em', sm: 40, md: 40 }}
          height={{ base: "auto", lg: "auto" }}
        >
          <Stack
            spacing={10}
            justifyContent={"center"}
            textAlign={{ base: "center", lg: "left" }}
          >
            <Heading
              color={useColorModeValue("blue.400", "gray.50")}
              fontSize={{ base: "2xl", sm: "3xl", md: "5xl" }}
            >
              To access your portal, please log in here
            </Heading>
            {/* <Text
              color={useColorModeValue("gray.800", "gray.50")}
              fontSize={{ base: "sm", sm: "lg" }}
            >
              To access your portal, please log in here 
            </Text> */}
          </Stack>
          <Stack
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "lg" }}
            justifyContent={"center"}
            bg={useColorModeValue("blue.100", "blue.800")}
          >
            <Stack spacing={2}>
              <Heading
                textAlign={"center"}
                color={useColorModeValue("gray.800", "gray.50")}
              >
                {" "}
                Login{" "}
              </Heading>
            </Stack>
            <Box as={"form"} onSubmit={formik.handleSubmit}>
              <Stack spacing={2}>
                <CustomInput
                  placeholder="Email Address"
                  type="email"
                  py="7"
                  borderRadius="0"
                  name="email"
                  isInvalid={formik.errors.email && formik.touched.email}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  formErroMsg={formik.errors.email}
                />
                <CustomInput
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  isInvalid={formik.errors.password && formik.touched.password}
                  py="7"
                  borderRadius="0"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  formErroMsg={formik.errors.password}
                />
                <HStack justify="space-between" my={"4"} display="flex">
                  <FormControl display="flex" alignItems="center" gap={3}>
                    <Switch
                      id="togglePassword"
                      type="switch"
                      label={showPassword ? "Hide Password" : "Show Password"}
                      checked={showPassword}
                      onChange={handleShowPassword}
                      colorScheme="green"
                    />
                    <FormLabel htmlFor="email-alerts" mb="0">
                      Show Password?
                    </FormLabel>
                  </FormControl>
                  <CustomButton
                    _hover={{ textDecoration: "underline" }}
                    as={"a"}
                    link="/forgot-password"
                    label=" Forgot password?"
                    variant="text"
                  />
                </HStack>
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <CustomButton
                    type="submit"
                    label="Login"
                    width={"full"}
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  />
                )}
                <Stack>
                  <Text color="fg.muted" align={"center"}>
                    Didn't have an account?{" "}
                    <CustomButton
                      as={"a"}
                      link="/register"
                      label="Register"
                      variant="link"
                    />
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      }
    />
  );
}
