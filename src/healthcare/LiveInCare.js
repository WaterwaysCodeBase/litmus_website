import { Box, Heading, Image, Stack, Text } from "@chakra-ui/react";

import GeneralLayout from "../layout/GeneralLayout";
import { Hero } from "../components/Hero";
import { BG_IMAGE_1_URL } from "../components/APIs";
import { CustomButton } from "../components/Buttons";
const LiveCare = () => {
  const hover = {
    backgroundColor: "blue.400",
    color: "white",
    transform: "translateX(5px)",
  };
  const buttonTransition =
    '"background-color 0.3s, color 0.3s, transform 0.3s"';
  return (
    <GeneralLayout
      pageContent={
        <>
          <Box w={"full"}>
            <Hero imageURL={BG_IMAGE_1_URL} heroTitle="Live-In-Care" />

            <Box
              display="flex"
              w={{ base: "93%", md: "90%" }}
              m={"auto"}
              py={50}
              gap={2}
              flexDirection={{ base: "column", md: "row" }}
            >
              {/* Navigation Tab Link */}
              <Box
                flex={1}
                backgroundImage={"url('/images/nurse-standing.jpg')"}
                backgroundPosition={"center"}
                bgRepeat={"no-repeat"}
                backgroundSize={"cover"}
                rounded={20}
              ></Box>

              <Box
                flex="2"
                padding="20px"
                // Change to your desired background color
                boxShadow="md"
                width={{ base: "100%", md: "500px" }} // Adjust width as needed
                py={7}
                rounded={20}
                backgroundColor="blue.400"
                color="white" // Change to your desired text color
                fontWeight="bold"
                gap={10}
              >
                <Stack spacing={5}>
                  <Heading
                    fontSize={{ base: "3xl", md: "5xl" }}
                    lineHeight={"50px"}
                  >
                    Live-In care
                  </Heading>

                  <Text
                    fontSize={{ base: "16px", md: "20px" }}
                    fontWeight={"normal"}
                    pr={"30"}
                  >
                    We have a well tailored 24 hours live-in care for you or
                    your loved ones right in the comfort of your home with
                    highly trained and experienced staff. We can make your home
                    a haven and a place you would always love with our
                    standardized methods and best practices
                    <br />
                  </Text>
                  <Text
                    fontSize={{ base: "16px", md: "20px" }}
                    fontWeight={"normal"}
                    pr={"30"}
                  >
                    Depending on your needs, we can guarantee you of a bespoke
                    service for your companionship, emotional and physical
                    support, required support in completing your daily tasks
                    satisfactorily which may include showering, getting dressed,
                    taking medication, interacting with the community and
                    helping you to live your desired life.
                    <br />
                  </Text>
                  <Text
                    fontSize={{ base: "16px", md: "20px" }}
                    fontWeight={"normal"}
                    pr={"30"}
                  >
                    We support people with all kinds of medical conditions
                    matched with care and support unique to the individual.
                  </Text>
                  <Box>
                    <CustomButton
                      label="Contact Us"
                      as={"a"}
                      link="/contact"
                      bg={"yellow.400"}
                    />
                  </Box>
                </Stack>
              </Box>
            </Box>
            {/* <ContactForm /> */}
          </Box>
        </>
      }
    />
  );
};

export default LiveCare;
