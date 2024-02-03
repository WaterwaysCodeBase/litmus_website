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
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
  useToast,
  ButtonGroup,
} from "@chakra-ui/react";

import { OnboardingLayout } from "../layout/OnboardingLayout";
import { CustomInput, CustomTextarea, CustumSelect } from "../components/Input";
import { CustomButton } from "../components/Buttons";
import FileInput from "../components/FIleInput";
import { ArrowForwardIcon, EmailIcon } from "@chakra-ui/icons";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API_BASE_URL } from "../components/APIs";
import axios from "axios";
import { useApiData } from "../components/GetData";
import { useEffect } from "react";
import WorkHistoryComponent from "./workHistory/getWorkHistory";
import SubmitApplication from "./SubmitApplication";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Banner } from "../components/Banner";
export default function WorkHistory() {
  const [isLoading, setLoading] = useState();
  const uid = sessionStorage.getItem("uid");
  const {
    data: UserWorkHistory,
    loading,
    fetchData,
  } = useApiData("application/getUserWorkHistory");
  useEffect(() => {
    fetchData();
  }, []);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formik = useFormik({
    initialValues: {
      employer_name: "",
      position_held: "",
      experience: "",
      reason_for_leave: "",
      start_date: "",
      end_date: "",
      user_id: uid,
    },
    validationSchema: Yup.object({
      employer_name: Yup.string().required("This Feld is required"),
      position_held: Yup.string().required("This Feld is required"),
      experience: Yup.string()
        .required("This Feld is required")
        .max(500, "Experince should be less than 500 Characters"),
      reason_for_leave: Yup.string()
        .required("This Feld is required")
        .max(500, "Experince should be less than 500 Characters"),
      start_date: Yup.string().required("This Feld is required"),
      end_date: Yup.string().required("This Feld is required"),
    }),
    onSubmit: (data) => {
      setLoading(true);
      const url = API_BASE_URL + "application/saveWorkHistory";
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
            onClose()
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
    },
  });
  const [workHistory, setWorkHistory] = useState([]);
  useEffect(() => {
    if (UserWorkHistory) {
      setWorkHistory(workHistory);
    }
    setLoading(false);
  }, [UserWorkHistory]);
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <OnboardingLayout
      pageTitle="WORK HISTORY"
      description="The candidate is requested to provide a full history of employment from leaving school 
      without gaps. If there are any break(s), 
      these should be included and give reason(s) for break(s)."
      infoALert="Any temporary and agency work experience should be included."
      mainContent={
        <Stack gap={4} direction={{ base: "column", md: "column", sm: "row" }}>
          <Stack direction="column" spacing={4} width={"full"}>
            <Box>
              <Button
                leftIcon={<FaPlus />}
                colorScheme="teal"
                variant="solid"
                onClick={onOpen}
              >
                Add Work History
              </Button>
            </Box>
            <Divider />
            <WorkHistoryComponent />
          </Stack>
          <Modal
            onClose={onClose}
            isOpen={isOpen}
            size={"xl"}
            isCentered
            motionPreset="slideInBottom"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Work Experience</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box as="form" onSubmit={formik.handleSubmit}>
                  <Stack gap={2} direction={["column", "row"]} pb={2}>
                    <CustomInput
                      value={formik.values.employer_name}
                      isInvalid={
                        formik.errors.employer_name &&
                        formik.touched.employer_name
                      }
                      onChange={formik.handleChange}
                      formLabel="Empleyer's Name"
                      type="text"
                      placeholder="Empleyer's Name"
                      name="employer_name"
                    />
                    <CustomInput
                      value={formik.values.position_held}
                      isInvalid={
                        formik.errors.position_held &&
                        formik.touched.position_held
                      }
                      onChange={formik.handleChange}
                      formLabel="Position with the employer"
                      type="text"
                      placeholder="Position with the employer"
                      name="position_held"
                    />
                  </Stack>
                  <Stack gap={2} direction={["column", "row"]} pb={2}>
                    <CustomTextarea
                      value={formik.values.experience}
                      isInvalid={
                        formik.errors.experience && formik.touched.experience
                      }
                      onChange={formik.handleChange}
                      formLabel="Experience"
                      type="text"
                      placeholder="Kindly describe your responsibilities in more than 50 words"
                      name="experience"
                      row="3"
                    />
                  </Stack>
                  <Stack gap={2} direction={["column", "row"]} pb={2}>
                    <CustomTextarea
                      value={formik.values.reason_for_leave}
                      isInvalid={
                        formik.errors.reason_for_leave &&
                        formik.touched.reason_for_leave
                      }
                      onChange={formik.handleChange}
                      formLabel="Reason for leaving"
                      type="text"
                      placeholder="Kindly provide a reason for your departure using more than 50 words."
                      name="reason_for_leave"
                      row="3"
                    />
                  </Stack>
                  <Stack gap={2} direction={["column", "row"]} pb={2}>
                    <CustomInput
                      value={formik.values.start_date}
                      isInvalid={
                        formik.errors.start_date && formik.touched.start_date
                      }
                      onChange={formik.handleChange}
                      formLabel="Start Date"
                      type="month"
                      name="start_date"
                    />
                    <CustomInput
                      value={formik.values.end_date}
                      isInvalid={
                        formik.errors.end_date && formik.touched.end_date
                      }
                      onChange={formik.handleChange}
                      formLabel="End Date"
                      type="month"
                      name="end_date"
                    />
                  </Stack>
                  <Box w={"full"} py={3}>
                    <ButtonGroup variant="outline" spacing="3">
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
                      <CustomButton
                        onClick={onClose}
                        bg={"red.400"}
                        colorScheme="red"
                        label="Close"
                      />
                    </ButtonGroup>
                  </Box>
                </Box>
              </ModalBody>
            </ModalContent>
          </Modal>

          <Box py={5} gap={5} display={'flex'} flexDir={'row'}>

            <Box justifySelf={'center'} gap={'5'} >
              <CustomButton
                as={'a'}
                bg={"blue.400"}
                colorScheme="blue"
                label="Next"
                link="/application/resume"
              />

            </Box>
            <CustomButton
              as={'a'}
              colorScheme="yellow"
              label="Back"
              link="/application/work-history"
            />
          </Box>
        </Stack>
      }
    />
  );
}
