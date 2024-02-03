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
  Center,
} from "@chakra-ui/react";
import { CustomInput, CustumSelect } from "../components/Input";
import { Blur } from "../components/Effects";
import { CustomButton } from "../components/Buttons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [allowPasswordReset, setAllowPasswordReset] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const { user_id, reset_token } = useParams();

  function confirmData() {
    setLoading(true);
    const url = API_BASE_URL + "/auth/confirmData";

    axios
      .post(url, { user_id: user_id, reset_token: reset_token })
      .then((response) => {
        if (response.data.status === 200) {
          setAllowPasswordReset(true);
          setLoading(false);
        }
        setLoading(false);
      })
      .catch((error) => {});
  }
  useEffect(() => {
    confirmData();
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
      cpassword: "",
      user_id: user_id,
    },
    validationSchema: Yup.object({
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
      console.log(data);
      setIsLoading(true);
      const url = API_BASE_URL + "/auth/resetPassword";

      axios
        .post(url, data)
        .then((reseponse) => {
          if (reseponse.data.status === 200) {
            setPasswordChanged(true);
            setIsLoading(false);
          }
          setIsLoading(false);
        })
        .catch((error) => {});
    },
  });
  return (
    <GeneralLayout
      mainContent={
        <>
          <Container
            as={SimpleGrid}
            maxW={"7xl"}
            columns={{ base: 1, md: 2 }}
            spacing={{ base: 10, lg: 32 }}
            py={{ base: "8em", sm: 40, md: 40 }}
            height={{ base: "auto", lg: "auto" }}
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
            {loading && <LoadingSpinner />}
            {allowPasswordReset && (
              <>
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
                  {passwordChanged && (
                    <>
                      <Stack>
                        <Text fontSize={"1.5em"} color={"green"}>
                          Password Changed
                        </Text>
                        <Text color="blue" align={"left"}>
                          <Link
                            color={"blue"}
                            textDecoration={"underline"}
                            to="/login"
                          >
                            Login in
                          </Link>
                        </Text>
                      </Stack>
                    </>
                  )}
                  {!passwordChanged && (
                    <>
                      <Box as={"form"} onSubmit={formik.handleSubmit}>
                        <Stack spacing={5}>
                          <CustomInput
                            placeholder="Enter your new password"
                            type={showPassword ? "text" : "password"}
                            isInvalid={
                              formik.errors.password && formik.touched.password
                            }
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
                              formik.errors.cpassword &&
                              formik.touched.cpassword
                            }
                            py="7"
                            borderRadius="0"
                            name="cpassword"
                            onChange={formik.handleChange}
                            value={formik.values.cpassword}
                            formErroMsg={formik.errors.cpassword}
                          />
                          <HStack
                            justify="space-between"
                            my={"4"}
                            display="flex"
                          >
                            <FormControl
                              display="flex"
                              alignItems="center"
                              gap={3}
                            >
                              <Switch
                                id="togglePassword"
                                type="switch"
                                label={
                                  showPassword
                                    ? "Hide Password"
                                    : "Show Password"
                                }
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
                              label="Change Password"
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
                                Register now
                              </Link>
                            </Text>
                          </Stack>
                        </Stack>
                      </Box>
                    </>
                  )}
                </Stack>
              </>
            )}
          </Container>
        </>
      }
    />
  );
}
