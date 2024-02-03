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

const dataTypes = [
  { value: "Community Care Worker", label: "Community Care Worker" },
  { value: "Domiciliiary Care Worker", label: "Domiciliiary Care Worker" },
];
export default function ForgotPassword() {
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
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email is Invalid email")
        .required("Email is required"),
    }),
    onSubmit: (data) => {
      const url = API_BASE_URL + "/auth/sendPasswordResetLink";
      setLoading(true);
      console.log(data);
      axios
        .post(url, data)
        .then((response) => {
          if (response.data.status === 200) {
            toast({
              title: "Password Reset Message",
              description: response.data.messagge,
              position: "top",
              status: "success",
              isClosable: true,
              size: "lg",
            });
          }
          setLoading(false);
        })
        .catch((error) => {
          toast({
            title: "Password Reset Message",
            description: error.messagge,
            position: "top",
            status: "error",
            isClosable: true,
            size: "lg",
          });
          setLoading(false);
        });
    },
  });
  return (
    <GeneralLayout
    description="sss"
      pageContent={
        <>
          <Container
            as={SimpleGrid}
            maxW={"7xl"}
            columns={{ base: 1, md: 2 }}
            spacing={{ base: 10, lg: 32 }}
            py={{ base: 10, sm: 20 }}
            height={{ base: "auto", lg: "100vh" }}
            justifyContent={"center"}
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
                Password Reset
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
                <Heading>Password Reset </Heading>
              </Stack>
              <Box as={"form"} onSubmit={formik.handleSubmit}>
                <Stack spacing={5}>
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

                  {loading ? (
                    <LoadingSpinner />
                  ) : (
                    <CustomButton
                      type="submit"
                      label="Send Reset Link"
                      width={"full"}
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    />
                  )}

                  <Stack>
                    <Text color="fg.muted" align={"left"}>
                      Didn't have an account?{" "}
                      <Link
                        color={"blue"}
                        textDecoration={"underline"}
                        href="/register"
                      >
                        Sign up
                      </Link>
                    </Text>
                  </Stack>
                </Stack>
              </Box>
              form
            </Stack>
          </Container>
        </>
      }
    />
  );
}
