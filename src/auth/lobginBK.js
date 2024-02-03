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
} from "@chakra-ui/react";
import { CustomInput, CustumSelect } from "../components/Input";
import { Blur } from "../components/Effects";
import { CustomButton } from "../components/Buttons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { API_BASE_URL } from "../components/APIs";
import axios from "axios";
import GeneralLayout from "../layout/GeneralLayout";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
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
      email: Yup.string()
        .email("Email is Invalid email")
        .required("Email is required"),

      password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[_!@#\$%\^&\*-?])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
    onSubmit: (data) => {
      setLoading(true);
      const url = API_BASE_URL + "/auth/login";
      axios.post(url, data).then((response) => {
        if (response.data.status == 200) {
        }
        if (response.data.status === "210") {
          toast({
            title: "Site Message",
            description: response.data.message,
            position: "top",
            status: "info",
            isClosable: true,
          });
          setLoading(false);
          navigate("/verify", {
            state: { uid: response.data.uid, email: data.email },
          });
        }
        if (response.data.status === "220") {
          toast({
            title: "Site Message",
            description: response.data.message,
            position: "top",
            status: "info",
            isClosable: true,
          });
          sessionStorage.setItem("uid", response.data.uid);
          // sessionStorage.setItem("token", response.data.token);
          navigate("/welcome", {
            state: { uid: response.data.uid, email: data.email },
          });
        }
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
          py={{ base: 10, sm: 20 }}
          height={{ base: "auto", lg: "100vh" }}
        >
          <Stack
            spacing={10}
            justifyContent={"center"}
            textAlign={{ base: "center", lg: "left" }}
          >
            <Heading
              color={"gray.800"}
              // lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "7xl" }}
            >
              Login
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "lg" }}>
              To continue your application for the position of Community Care
              Worker, you will need to register an account with us
            </Text>
          </Stack>
          <Stack
            bg={"white"}
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "lg" }}
            justifyContent={"center"}
          >
            <Stack spacing={2}>
              <Heading> Login </Heading>
            </Stack>
            <Box as={"form"} onSubmit={formik.handleSubmit}>
              <Stack spacing={2}>
                <CustomInput
                  placeholder="Email Address"
                  type="email"
                  isInvalid={formik.errors.email && formik.touched.email}
                  py="7"
                  borderRadius="0"
                  name="email"
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
                      // size='lg'
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
                    label="Register"
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
                    <Link
                      color={"blue"}
                      textDecoration={"underline"}
                      href="/login"
                    >
                      Login in
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
            form
          </Stack>
        </Container>
      }
    />
  );
}
