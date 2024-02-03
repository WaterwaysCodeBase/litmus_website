import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import GeneralLayout from "../layout/GeneralLayout";
import { Hero } from "../components/Hero";
import { API_BASE_URL, BG_IMAGE_1_URL } from "../components/APIs";
import axios from "axios";
import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams from react-router-dom
import { CustomButton } from "../components/Buttons";

const JobDetails = () => {
  const [jobDetails, setJobDetails] = useState([null]);
  const { jobToken } = useParams(); // Get the jobToken from the URL parameters
  const navidage = useNavigate();
  useEffect(() => {
    console.log("jobToken:", jobToken); // Check if jobToken is correctly extracted
    axios
      .post(API_BASE_URL + "career/getVacancyDetails", {
        job_token: jobToken,
      })
      .then(
        (response) => {
          setJobDetails(response?.data);
        },
        (error) => {
          console.error("API Error:", error); // Check for any API errors
        }
      );
  }, [jobToken]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const textColor = useColorModeValue("blue.500", "blue.300");
  const bgColor = useColorModeValue("blue.50", "gray.700");
  const textSize = { base: "14pt", md: "18pt", sm: "14pt" };
  const HeadingSize = { base: "4xl", md: "5xl", sm: "3xl" };
  function handleApplyNow() {
    sessionStorage.setItem("ref", "link");
    localStorage.setItem("url", "/application/personal-info");
    localStorage.setItem("position", jobDetails?.vacancy_id || "");
    const user_id = sessionStorage.getItem("uid");
    const token = sessionStorage.getItem("token");
    const isLoggedin = sessionStorage.getItem("isLoggedin");
    if (token && user_id && isLoggedin) {
      navigate("/application/personal-info", {
        state: {
          position: sessionStorage.getItem("position"),
        },
      });
    } else {
      onOpen();
    }
  }
  function handleRegister() {
    navigate("/register");
  }
  return (
    <GeneralLayout
      pageContent={
        <>
          <Box
            w={"100%"}
            className="landing-bg"
            h={{ base: "auto", lg: "auto", md: "auto" }}
          >
            {jobDetails && (
              <>
                <Hero
                  imageURL={BG_IMAGE_1_URL}
                  heroTitle={jobDetails?.job_title || ""}
                  breadcrumb={
                    <>
                      <Breadcrumb alignSelf={"center"}>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/career">
                            Career Page
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage>
                          <BreadcrumbLink href="#">
                            {jobDetails?.job_title || ""}
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                      </Breadcrumb>
                    </>
                  }
                />
                <Box maxW="7xl" mx="auto" px={{ base: "5", lg: "12" }}>
                  <Stack
                    direction={{ base: "column", lg: "" }}
                    spacing={{ base: "0", lg: "10" }}
                  >
                    <Stack spacing={{ base: "8", lg: "10" }} py={"4em"}>
                      <Stack spacing={{ base: "2", lg: "4" }}>
                        <Text
                          fontSize={"3xl"}
                          color={"gray.400"}
                          lineHeight={1}
                        >
                          {jobDetails?.job_title || ""} Job Description
                        </Text>
                        <Text
                          pl={5}
                          fontSize={textSize}
                          fontWeight="normal"
                          dangerouslySetInnerHTML={{
                            __html: jobDetails?.job_desc,
                          }}
                        ></Text>
                      </Stack>
                      <HStack spacing="3">
                        <CustomButton
                          label="Apply now"
                          colorScheme="blue"
                          onClick={handleApplyNow}
                        />
                      </HStack>
                    </Stack>
                  </Stack>
                </Box>
              </>
            )}
          </Box>

          <>
            {/* <Button onClick={}>Open Modal</Button> */}

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Required Action</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>
                    You need to register an account before you can apply for{" "}
                    {jobDetails?.job_title}
                  </Text>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button onClick={handleRegister} variant="ghost">
                    Register now
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        </>
      }
    />
  );
};

export default JobDetails;
