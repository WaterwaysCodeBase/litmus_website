import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import GeneralLayout from "../layout/GeneralLayout";
import { Hero } from "../components/Hero";
import { API_BASE_URL, BG_IMAGE_1_URL } from "../components/APIs";
import axios from "axios";
import { React, useState } from "react";
import { useEffect } from "react";
import { TruncatedText } from "../components/TextTruncate";

const Career = () => {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Initialize with the first page
  const vacanciesPerPage = 0; // Number of vacancies to display per page
  const ImageUrl = "access.litmusservices.co.uk/jobs/";
  useEffect(() => {
    setLoading(true);
    axios.get(API_BASE_URL + `career/getVacancy?page=${currentPage}`).then(
      (response) => {
        setVacancies(response?.data);
        setLoading(false);
      },
      (error) => {}
    );
  }, [currentPage]);

  const textColor = useColorModeValue("blue.500", "blue.300");
  const bgColor = useColorModeValue("blue.50", "gray.700");
  return (
    <GeneralLayout
      pageContent={
        <>
          <Box
            w={"100%"}
            className="landing-bg"
            //   py={{ base: 20, md: 20 }}
            h={{ base: "auto", lg: "auto", md: "auto" }}
          >
            <Hero imageURL={BG_IMAGE_1_URL} heroTitle="Career Page" />
            <>
              <Box
                maxW="8xl"
                mx="auto"
                px={{
                  base: "0",
                  lg: "12",
                }}
              >
                {loading && (
                  <Box
                    padding="6"
                    bg={{
                      base: "white",
                      lg: "transparent",
                    }}
                    transform={{
                      base: "translateY(-20%)",
                      lg: "none",
                    }}
                  >
                    <SkeletonText
                      size="10"
                      skeletonHeight="10"
                      noOfLines={1}
                      width={"30%"}
                    />
                    <SkeletonText
                      my="4"
                      noOfLines={4}
                      spacing="4"
                      skeletonHeight="5"
                    />
                    <SkeletonText
                      mb={7}
                      size="10"
                      skeletonHeight="12"
                      noOfLines={1}
                      width={"10%"}
                    />
                    <SkeletonText
                      size="10"
                      skeletonHeight="10"
                      noOfLines={1}
                      width={"30%"}
                    />
                    <SkeletonText
                      my="4"
                      noOfLines={4}
                      spacing="4"
                      skeletonHeight="5"
                    />
                    <SkeletonText
                      mb={7}
                      size="10"
                      skeletonHeight="12"
                      noOfLines={1}
                      width={"10%"}
                    />
                  </Box>
                )}
                {vacancies &&
                  vacancies.map((vacancy, index) => (
                    <Stack
                      key={index}
                      direction={{
                        base: "column",
                        lg: "row",
                      }}
                      py={{
                        base: "0",
                        lg: "5",
                      }}
                      spacing={{
                        base: "0",
                        lg: "20",
                      }}
                    >
                      <Box
                        width={{
                          lg: "7xl",
                        }}
                        transform={{
                          base: "translateY(-20%)",
                          lg: "none",
                        }}
                        bg={{
                          base: bgColor,
                          lg: "transparent",
                        }}
                        mx={{
                          base: "6",
                          md: "8",
                          lg: "0",
                        }}
                        px={{
                          base: "6",
                          md: "8",
                          lg: "0",
                        }}
                        py={{
                          base: "6",
                          md: "8",
                          lg: "12",
                        }}
                      >
                        <Box
                          bg={"blue.50"}
                          // p={5}
                          rounded={20}
                          display={"flex"}
                          flexDirection={{ base: "column", md: "row" }}
                        >
                          <Box
                            roundedBottomLeft={20}
                            roundedTopLeft={20}
                            flex={2}
                            backgroundImage={
                              vacancy?.image
                                ? ImageUrl + vacancy?.image
                                : "url('/images/female-care-worker.jpg')"
                            }
                            backgroundPosition={"center"}
                            bgRepeat={"no-repeat"}
                            backgroundSize={"cover"}
                          ></Box>
                          <Box flex={3} p={8}>
                            <Stack
                              spacing={{
                                base: "8",
                                lg: "8",
                              }}
                            >
                              <Heading size="xl" color={textColor}>
                                {vacancy?.job_title}
                              </Heading>
                              <TruncatedText
                                html={vacancy?.job_desc}
                                maxLength={400}
                              />

                              <HStack spacing="3">
                                <Link
                                  color={textColor}
                                  fontWeight="bold"
                                  fontSize="lg"
                                  href={"/career/" + vacancy.job_token}
                                >
                                  Learn More
                                </Link>
                                <Icon color={textColor} as={FaArrowRight} />
                              </HStack>
                            </Stack>
                          </Box>
                        </Box>
                        {/* {vacancies && (
                          <Flex justifyContent="left" mt={4}>
                            <Button
                              onClick={() => setCurrentPage(currentPage - 1)}
                              disabled={currentPage === 1}
                            >
                              Previous Page
                            </Button>
                            <Text mx={2}>{currentPage}</Text>
                            <Button
                              onClick={() => setCurrentPage(currentPage + 1)}
                              disabled={vacancies.length < vacanciesPerPage}
                            >
                              Next Page
                            </Button>
                          </Flex>
                        )} */}
                      </Box>
                    </Stack>
                  ))}
              </Box>
            </>
            ;
          </Box>
        </>
      }
    />
  );
};

export default Career;
