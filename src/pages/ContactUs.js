"use client";

import { Heading, Text, Stack, Box, useToast } from "@chakra-ui/react";

import GeneralLayout from "../layout/GeneralLayout";
import * as Yup from "yup";
import { CustomButton } from "../components/Buttons";
import { Hero } from "../components/Hero";
import { CustomInput, CustomTextarea } from "../components/Input";
import { FancySidebar } from "../layout/component/FancySidebar";
import { useFormik } from "formik";
import axios from "axios";
import { API_BASE_URL } from "../components/APIs";

export default function Contact() {
  const FancyNavItems = [
    { label: "Live-in Care", link: "/healthcare/live-in-care" },
    { label: "Domiciliary Care", link: "/healthcare/domiciliary" },
    { label: "Job Oppurtunities", link: "/career" },
  ];
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone_number: "",
      message: "",
      postcode: "",
    },
    validationSchema: Yup.object({
      phone_number: Yup.string().required("Please enter your phone number"),
      name: Yup.string().required("Please enter your Name"),
      email: Yup.string()
        .required("Emial filed is required")
        .email("Email address is invalid"),
      message: Yup.string().required("Please let us know your Enquiry"),
      postcode: Yup.string().required("Postcode is required"),
    }),
    onSubmit: (data) => {
      console.log(data);
      // alert(data);
      axios
        .post(API_BASE_URL + "sendAdminEmail", data)
        .then((response) => {
          toast({
            title: "Message Sent",
            description: response?.data.message,
            status: response?.data.status,
            position: "top",
            isClosable: true,
          });
        })

        .catch((error) => {
          toast({
            title: "Message Sent Failure",
            description: error?.data.message,
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
        <>
          <Hero imageURL="/images/bg-hero.jpg" heroTitle="Make an Enquiry" />
          <Box width={"full"}>
            <Stack
              justifyContent={"flex-start"}
              direction={{ base: "column", md: "row" }}
              position={"relative"}
              display={"flex"}
              w={{ base: "100%", md: "85%", sm: "100%" }}
              m={"auto"}
              spacing={10}
            >
              <Box
                w={{ base: "100%", md: "75%", sm: "100%" }}
                py={20}
                px={{ base: 5, md: 10 }}
              >
                <Stack spacing={5} textAlign={"justify"}>
                  <Heading>We are always here for you</Heading>
                  <Text>
                    If you or your family are considering long-term care and
                    support, we recognize the importance of gaining insights
                    into home care before making any decisions. If you would
                    like to have an informal conversation about how Litmus
                    Services Limited can assist you, please don't hesitate to
                    reach out to us.
                  </Text>
                  <Text>
                    For additional information, to schedule a complimentary
                    assessment, or to connect with one of our approachable team
                    members regarding the domiciliary or live-in care services
                    we offer, please feel free to contact us. In the event you
                    reach out to us outside of our regular hours, kindly leave a
                    message, and a team member will respond within 48 hours.
                  </Text>
                  <Text>
                    Please be aware that calls may be recorded for training and
                    quality assurance purposes.
                  </Text>
                  <FancySidebar
                    FancySideBarTitle={"I am looking for"}
                    FancyNavItems={FancyNavItems}
                  />
                </Stack>
              </Box>
              <Box width={"full"} py={10} px={{ base: 0, md: 10 }}>
                <Stack
                  as={"form"}
                  spacing={5}
                  bg={"gray.50"}
                  py={10}
                  px={{ base: 5, md: 10 }}
                  // method="get"
                  // action="https://litmusapi.litmusservices.co.uk/sendAdminEmail"
                  onSubmit={formik.handleSubmit}
                >

                  <Heading>Send us a message</Heading>

                  <CustomInput
                    type="text"
                    placeholder="Enter your First Name & Last name"
                    name="name"
                    padding={"30"}
                    isInvalid={formik.errors.name && formik.touched.name}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    formErroMsg={formik.errors.name}
                  />
                  <CustomInput
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    padding={"30"}
                    isInvalid={formik.errors.email && formik.touched.email}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    formErroMsg={formik.errors.email}
                  />
                  <CustomInput
                    type="text"
                    placeholder="Phone Number"
                    name="phone_number"
                    padding={"30"}
                    isInvalid={
                      formik.errors.phone_number && formik.touched.phone_number
                    }
                    onChange={formik.handleChange}
                    value={formik.values.phone_number}
                    formErroMsg={formik.errors.phone_number}
                  />
                  <CustomInput
                    type="text"
                    placeholder="Post Code"
                    name="postcode"
                    padding={"30"}
                    isInvalid={
                      formik.errors.postcode && formik.touched.postcode
                    }
                    onChange={formik.handleChange}
                    value={formik.values.postcode}
                    formErroMsg={formik.errors.postcode}
                  />
                  <CustomTextarea
                    type="text"
                    placeholder="Please input your Enquiry"
                    name="message"
                    padding={"30"}
                    isInvalid={formik.errors.message && formik.touched.message}
                    onChange={formik.handleChange}
                    value={formik.values.message}
                    formErroMsg={formik.errors.message}
                  />
                  <Box justifySelf={"flex-end"}>
                    <CustomButton
                      type="submit"
                      colorScheme="blue"
                      label="Send Enquiry"
                    />
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Box>
          <Stack
            justifyContent={"center"}
            alignSelf={"center"}
            align={"center"}
            justifySelf={"cenetr"}
            height={"100vh"}
            id="sendMail"
            position={"relative"}
            bg={"blue.50"}
            w={"full"}
          >
            <Box
              w={"85%"}
              textColor={"gray.900"}
              align={"center"}
              justifySelf={"cenetr"}
            >
              <Heading
                fontSize={{ base: "3xl", md: "6xl" }}
                lineHeight={"50px"}
              >
                Call us Now
              </Heading>

              <Text
                fontSize={{ base: "20px", md: "50px" }}
                fontWeight={"normal"}
                pr={"30"}
                textAlign={"center"}
              >
                02080797305, 07551396202, 07776081675
              </Text>
              <br />
              <br />
              <Heading
                fontSize={{ base: "3xl", md: "5xl" }}
                lineHeight={"50px"}
              >
                Send Us a Mail Now
              </Heading>
              <Text
                fontSize={{ base: "20px", md: "50px" }}
                textAlign={"center"}
                fontWeight={"normal"}
                pr={"30"}
              >
                referral@litmusservices.co.uk
              </Text>
            </Box>
          </Stack>

        </>
      }
    />
  );
}
