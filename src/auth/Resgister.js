"use client";

import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  HStack,
  useToast,
  FormLabel,
  Switch,
  FormControl,
  Alert,
  useColorModeValue,
} from "@chakra-ui/react";
import { CustomInput, CustumSelect } from "../components/Input";
import { Blur } from "../components/Effects";
import { CustomButton } from "../components/Buttons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoadingSpinner } from "../components/LoadingSpinner";
import axios from "axios";
import { API_BASE_URL } from "../components/APIs";
import GeneralLayout from "../layout/GeneralLayout";

const dataTypes = [
  { value: "Community Care Worker", label: "Community Care Worker" },
  { value: "Domiciliiary Care Worker", label: "Domiciliiary Care Worker" },
];
export default function Register() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email is Invalid email")
        .required("Email is required"),
      fname: Yup.string().required("Enter your First name"),
      lname: Yup.string().required("Enter your Last name"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[_!@#\$%\^&\*-?])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      cpassword: Yup.string()
        .required("Retype your password")
        .oneOf([Yup.ref("password"), null], "Passwords mismatch"),
    }),

    onSubmit: (data) => {
      setLoading(true);
      const url = API_BASE_URL + "/auth/register.php";
      setLoading(true);
      axios.post(url, data).then((response) => {
        if (response.data.status === "200") {
          toast({
            title: "Registeration Message",
            description: response.data.message,
            position: "top",
            status: "success",
            isClosable: true,
          });

          //Redirect to VErification page
          localStorage.setItem("email", data.email);
          localStorage.setItem("uid", response.data.uid);
          localStorage.setItem("fname", data.fname);
          navigate("/verify", {
            state: {
              uid: response.data.uid,
              fname: data.fname,
              email: data.email,
            },
          });

          // axios
          //   .post('http://localhost/litmus-api/auth/register.php', data)
          //   .then(response => {});
        } else {
          toast({
            title: "Registeration Message",
            description: response.data.message,
            position: "top",
            status: "error",
            isClosable: true,
          });
        }
        setLoading(false);
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
          py={{ base: "8em", sm: 40, md: 40 }}
          height={{ base: "auto", lg: "auto" }}
        >
          <Stack
            spacing={10}
            justifyContent={"center"}
            textAlign={{ base: "center", lg: "left" }}
          >
            <Heading
              color={"blue.400"}
              // lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "7xl" }}
            >
              Join our team
              <Text
                as={"span"}
                bgGradient="linear(to-r, blue.400,blue.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={"gray.900"} fontSize={{ base: "sm", sm: "1.5em" }}>
              To continue your application, you will need to register an account
              with us
            </Text>
          </Stack>
          <Stack
            bg={useColorModeValue("blue.100", "blue.800")}
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "lg" }}
            justifyContent={"center"}
          >
            <Stack spacing={2} textAlign={{ base: "center", md: "left" }}>
              <Heading>Register Now</Heading>
            </Stack>
            <Box as={"form"} onSubmit={formik.handleSubmit}>
              <Stack spacing={2}>
                {/* <CustumSelect
            value={formik.values.position}
            isInvalid={formik.errors.position && formik.touched.position}
            onChange={formik.handleChange}
            name="position"
            placeholder="Select position you are applying for:"
            formLabel=""
            options={dataTypes}
            label={dataTypes.label}
          /> */}
                <Stack direction={{ base: "column ", md: "row" }}>
                  <CustomInput
                    placeholder="First Name"
                    type="text"
                    isInvalid={formik.errors.fname && formik.touched.fname}
                    py="7"
                    borderRadius="0"
                    name="fname"
                    onChange={formik.handleChange}
                    value={formik.values.fname}
                    formErroMsg={formik.errors.fname}
                  />
                  <CustomInput
                    placeholder="Last Name"
                    type="text"
                    isInvalid={formik.errors.lname && formik.touched.lname}
                    py="7"
                    borderRadius="0"
                    name="lname"
                    onChange={formik.handleChange}
                    value={formik.values.lname}
                    formErroMsg={formik.errors.lname}
                  />
                </Stack>
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
                <CustomInput
                  placeholder="Confirm your new password"
                  type={showPassword ? "text" : "password"}
                  isInvalid={
                    formik.errors.cpassword && formik.touched.cpassword
                  }
                  py="7"
                  borderRadius="0"
                  name="cpassword"
                  onChange={formik.handleChange}
                  value={formik.values.cpassword}
                  formErroMsg={formik.errors.cpassword}
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
                    Have an account?{" "}
                    <CustomButton
                      type="button"
                      as={"a"}
                      label="Login"
                      color={"blue"}
                      variant="link"
                      link="/login"
                      textDecoration="underline"
                      _hover={{ textDecoration: "underline" }}
                    />
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
