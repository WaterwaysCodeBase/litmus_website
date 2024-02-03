import React, { useEffect, useState } from "react";

import { OnboardingLayout } from "../layout/OnboardingLayout";
import { useApiData } from "../components/GetData";
import ApiRequest from "../components/APIRequest";
import { API_BASE_URL } from "../components/APIs";
import {
  Box,
  Center,
  Flex,
  Heading,
  Link,
  Spinner,
  Stack,
  StackDivider,
  Text,
  useToast,
} from "@chakra-ui/react";
import { CustomButton } from "../components/Buttons";
import axios from "axios";
import { FaBan, FaCheckCircle, FaUserClock } from "react-icons/fa";
import Cookies from "js-cookie";

const InterviewScheduler = () => {
  const [interDetails, setInterviewDetails] = useState([]);
  const {
    data: userDetails,
    loading,
    fetchData,
  } = useApiData("application/getUserDetails");

  const toast = useToast();
  useEffect(() => {
    fetchData();
    fetchInterviewData();
  }, []);
  function fetchInterviewData() {
    setIsLoading(true);
    const uid = sessionStorage.getItem("uid");
    const url = API_BASE_URL + "interview/getInterview";
    axios
      .post(url, { user_id: uid })
      .then((response) => {
        setIsLoading(false);
        setInterviewDetails(response?.data);
      })
      .catch((error) => { });
  }
  let email = ""; // Define email and name variables outside the if (userDetails) block
  let name = "";
  // const schedule = "";
  // const interviewed = "";
  // const interview_result = "";
  // const interview_comment = "";
  if (userDetails) {
    email = userDetails.email;
    name = userDetails.fname + " " + userDetails.lname;
  }
  // if (interDetails) {
  //   schedule = interDetails.scheduled || "";
  //   interviewed = interDetails.interviewed || "";
  //   interview_result = interDetails.interview_result || "";
  //   interview_comment = interDetails.interview_comment || "";
  // }
  const [isLoading, setIsLoading] = useState();
  const userToken = Cookies.get('token')
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function saveInterview() {
    setIsLoading(true);
    const url = API_BASE_URL + "interview/saveInterview";
    const data = {
      user_id: userDetails.user_id,
    };

    axios
      .post(url, data)
      .then((response) => {
        if (response.data.status === 200) {
          toast({
            // title: "Verification Message",
            description: response.data.message,
            position: "top",
            status: "success",
            isClosable: true,
            size: "lg",
          });
          setIsLoading(false);
        } else {
          toast({
            // title: "Verification Error",
            description: response.data.message,
            position: "top",
            status: "error",
            isClosable: true,
            size: "lg",
          });
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(true);
        toast({
          title: "Verification Error",
          description: error,
          position: "top",
          status: "error",
          isClosable: true,
          size: "lg",
        });
      });
  }

  return (
    <OnboardingLayout
      pageTitle={!interDetails && "Interview"}
      mainContent={
        <>
          {isLoading && (
            <Center h={'50vh'}>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Center>
          )}
          {!isLoading && (
            <>
              {!interDetails && (
                <>
                  <Center width={'4xl'} mx={'auto'} textAlign={'center'} py={'4em'}>
                    <Text fontSize={'2em'}>
                      We hereby confirm the receipt of your application,  Your advancement to the interview stage has been approved,
                      kindly wait  while we finalize the scheduling details for your interview.    <br />
                      For any inquiries or concerns, we invite you to communicate with us via email at:
                      <b> <a href="mailto:jobs@litmusservices.co.uk">jobs@litmusservices.co.uk</a></b></Text>




                  </Center>
                </>
              )}
              {interDetails && (
                <Box maxW={{ base: 'full', md: "50%" }} m={"auto"}>
                  <Stack
                    direction="column"
                    spacing={4}
                    divider={<StackDivider borderColor="gray.200" />}
                  >
                    <Heading>Interview Progress</Heading>
                    <Flex
                      justifyContent={"space-between"}
                      py={3}
                      px={3}
                    // bg={"blue.200"}
                    >
                      <Text fontSize={"1.5em"} justifySelf={"flex-start"}>
                        Interview Scheduled
                      </Text>
                      <Text align={"center"}>
                        {interDetails.scheduled == 1 && (
                          <FaCheckCircle fontSize={"2.5em"} color="green" />
                        )}
                      </Text>
                    </Flex>
                    {interDetails.scheduled == 1 && (
                      <>
                        <Stack px={3} py={3} bg={'green.100'}>
                          <Text fontSize={'2xl'} fontWeight={500}>Interview Details</Text>
                          <Text fontSize={'lg'}>
                            <b> Date and Time:</b> {interDetails.meeting_time} <br />
                            <b>Link:</b><a href={interDetails.meeting_link}> {interDetails.meeting_link}</a> <br />
                            <b> Venue:</b> {interDetails.meeting_time} <br />

                          </Text>
                        </Stack>

                      </>
                    )}
                    <Flex
                      justifyContent={"space-between"}
                      py={3}
                      px={3}
                    // bg={"blue.200"}
                    >
                      <Text fontSize={"1.5em"} justifySelf={"flex-start"}>
                        Interview Done
                      </Text>
                      <Text align={"center"}>
                        {interDetails.interviewed == 1 ? (
                          <FaCheckCircle fontSize={"2.5em"} color="green" />
                        ) : (
                          <FaUserClock fontSize={"2.5em"} color="gray.300" />
                        )}
                      </Text>

                    </Flex>
                    <Text>
                      {interDetails.interviewed == 1 ? (
                        <>
                          {interDetails.interview_feedback !== null &&
                            <Stack px={3} py={3} bg={'green.100'}>
                              <Text fontSize={'2xl'} fontWeight={500}>Kindly wait while we prepare your interview result, you will receive a mail shortly</Text>
                            </Stack>

                          }

                          {interDetails.interview_feedback === null && <Stack px={3} py={3} bg={'green.100'}>
                            <Text fontSize={'2xl'} fontWeight={500}>We need to hear from your regarding your interview</Text>
                            <Text fontSize={'lg'}>
                              Kindly click <Link textColor={'blue'} href={"/interview/feedback/" + userToken}>here</Link> to submit a feedback

                            </Text>
                          </Stack>}
                        </>

                      ) : (
                        <FaUserClock fontSize={"2.5em"} color="gray.300" />
                      )}
                    </Text>


                  </Stack>
                </Box>
              )}
            </>
          )}
        </>
      }
    />
  );
};

export default InterviewScheduler;
