import {
  Stack,
  Box,
  Text,
  Heading,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { Hero } from "../components/Hero";
import { BG_IMAGE_1_URL } from "../components/APIs";
import { CustomButton } from "../components/Buttons";
import Header from "../layout/component/Header";
import GeneralLayout from "../layout/GeneralLayout";
export default function Domiciliary() {
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
          <Box w={"100%"} className="landing-bg">
            <Hero
              imageURL={BG_IMAGE_1_URL}
              heroTitle="Domiciliary (Home Care) Services"
            />
            <Box
              display="flex"
              width={{ base: "100%", md: "80%" }}
              m={"auto"}
              bg={"white"}
              py={20}
              justifyContent={"center"}
              alignContent={"center"}
              gap={10}
              flexDirection="column"
              px={"10"}
            >
              <Stack
                justifyContent={"center"}
                alignContent={"center"}
                textAlign={'justify'}
              >
                <Heading fontSize={{ base: "3xl", md: "5xl" }}>
                  Domiciliary Care
                </Heading>
                <Text
                  fontSize={{ base: "16px", md: "20px" }}
                  fontWeight={"normal"}
                >
                  Everyone has varying care/support needs owing to old age,
                  short- or long-term disability/illness or medical condition
                  (or for whatever reason). At Litmus Care, we believe that
                  irrespective of those mentioned or any other personal
                  circumstance(s), everyone should be able to maximise their
                  quality of life and do so from the comfortable surroundings of
                  their own homes.
                </Text>
                <Text fontSize={{ base: "16px", md: "20px" }}>
                  Our service, therefore, provides people with the level of care
                  and support they require delivered safely and effectively. Our
                  team will support you to live independently as much as
                  possible and provide your care and support tailored to your
                  personal care needs like taking you to GP appointments,
                  attending day care centre or other social events, toileting,
                  showering, dressing, and support completing your daily tasks
                </Text>
              </Stack>
              <Stack
                spacing={5}
                justifyContent={"center"}
                // alignContent={"center"}
                // px={{ base: "10", md: "20" }}
              >
                <Heading
                  fontSize={{ base: "3xl", md: "5xl" }}
                  lineHeight={"20px"}
                >
                  Our service
                </Heading>

                <Text fontSize={{ base: "16px", md: "20px" }}>
                  Our service is available 24 hours a day to provide your care
                  needs on hourly bases and will cover the following but not
                  limited to:
                  <UnorderedList>
                    <ListItem fontSize={{ base: "16px", md: "20px" }}>
                      Personal care
                    </ListItem>
                    <ListItem fontSize={{ base: "16px", md: "20px" }}>
                      Companionship
                    </ListItem>
                    <ListItem fontSize={{ base: "16px", md: "20px" }}>
                      Mobilizing
                    </ListItem>
                    <ListItem fontSize={{ base: "16px", md: "20px" }}>
                      Day care
                    </ListItem>
                    <ListItem fontSize={{ base: "16px", md: "20px" }}>
                      Shopping
                    </ListItem>
                    <ListItem fontSize={{ base: "16px", md: "20px" }}>
                      Housekeeping
                    </ListItem>
                    <ListItem fontSize={{ base: "16px", md: "20px" }}>
                      Overnight care
                    </ListItem>
                    <ListItem fontSize={{ base: "16px", md: "20px" }}>
                      Weekend care
                    </ListItem>
                    <ListItem fontSize={{ base: "16px", md: "20px" }}>
                      Respite care
                    </ListItem>
                    <ListItem fontSize={{ base: "16px", md: "20px" }}>
                      Reablement
                    </ListItem>
                    <ListItem fontSize={{ base: "16px", md: "20px" }}>
                      Medication Support
                    </ListItem>
                  </UnorderedList>
                </Text>

                <Text
                  fontSize={{ base: "16px", md: "20px" }}
                  fontWeight={"normal"}
                  pr={"30"}
                  lineHeight={"30px"}
                >
                  Our home care services will allow you and your family to enjoy
                  the peace of mind needed to keep you safe in your home.
                </Text>

                <Box>
                  <CustomButton
                    transition={buttonTransition}
                    _hover={hover}
                    rounded={"10"}
                    bg={"yellow.400"}
                    justifyContent={"left"}
                    // leftIcon={
                    //   // <ArrowForwardIcon
                    //   //   fontSize={'2rem'}
                    //   //   p={1}
                    //   //   color={'white'}
                    //   //   bg={'blue.400'}
                    //   //   rounded={'full'}
                    //   // />
                    // }
                    colorScheme="blue"
                    borderColor={"gray.100"}
                    borderWidth={2}
                    color={"gray.700"}
                    link="/contact"
                    as={'a'}
                    label="Contact us "
                  />
                </Box>
                {/* <Box
                  display="flex"
                  boxShadow={{ base: "", md: "md" }}
                  w={{ base: "100%", md: "100%" }}
                  m={"auto"}
                  px={"20"}
                  bg={""}
                  py={150}
                  justifyContent={"center"}
                  alignContent={"center"}
                  gap={5}
                  flexDirection={{ base: "column", md: "row" }}
                >
                  <Stack
                    spacing={5}
                    justifyContent={"center"}
                    alignContent={"center"}
                    px={{ base: "", md: "120" }}
                  >
                    <Heading
                      fontSize={{ base: "3xl", md: "5xl" }}
                      lineHeight={"20px"}
                    >
                      Community Care Worker
                    </Heading>
                    <Text
                      color={"gray.400"}
                      fontSize={{ base: "16px", md: "30px" }}
                    >
                      Job Description
                    </Text>
                    <Text
                      fontSize={{ base: "16px", md: "20px" }}
                      fontWeight={"normal"}
                      textAlign={"justify"}
                    >
                      If you have passion for caring and love to help people
                      live the life they desire at the comfort of their homes
                      and in their communities, then joining Litmus Care is a
                      right step in the best direction as a Domiciliary Care
                      Worker. We are looking for individuals who have genuine
                      interest, compassion and would go the extra mile to
                      provide care and support for people who need it most.
                    </Text>
                    <Text
                      fontSize={{ base: "16px", md: "20px" }}
                      fontWeight={"normal"}
                      pr={"30"}
                    >
                      As a Community Care Worker with us, among other things,
                      you will:
                      <br />
                      <UnorderedList
                        lineHeight={"30px"}
                        fontWeight={"normal"}
                        pr={"30"}
                      >
                        <ListItem fontSize={{ base: "16px", md: "20px" }}>
                          Assist our clients by providing a listening ear,
                          emotional support, and a shoulder to lean on as the
                          partner in progress they need
                        </ListItem>
                        <ListItem fontSize={{ base: "16px", md: "20px" }}>
                          Provide support with bathing, toileting, getting
                          dressed, and assisting with mobility in and around
                          their homes and community.
                        </ListItem>
                        <ListItem fontSize={{ base: "16px", md: "20px" }}>
                          Continue to support their household chore by carrying
                          out duties not limited to laundry, washing, cleaning,
                          preparing, and cooking meals.
                        </ListItem>
                        <ListItem fontSize={{ base: "16px", md: "20px" }}>
                          Support with medication administrating
                        </ListItem>
                        <ListItem fontSize={{ base: "16px", md: "20px" }}>
                          Assist clients with pets to look after them e.g.,
                          walking or feeding.
                        </ListItem>
                        <ListItem fontSize={{ base: "16px", md: "20px" }}>
                          Carry out such other duties including mailing a
                          package, shopping, collection of prescriptions, etc.
                        </ListItem>
                      </UnorderedList>
                    </Text>
                    <Heading
                      textAlign={"left"}
                      fontSize={{ base: "3xl", md: "5xl" }}
                    >
                      Salary and Benefit
                    </Heading>
                    <Text
                      fontSize={{ base: "16px", md: "20px" }}
                      fontWeight={"normal"}
                      pr={"30"}
                      lineHeight={"30px"}
                    >
                      We, at Litmus, pay a very competitive salary to our staff.
                      All our carers receive up to 28 days of paid annual leave
                      per year and are entitled to a pension scheme – providing
                      a great work/life balance.
                    </Text>
                    <Heading
                      textAlign={"left"}
                      fontSize={{ base: "3xl", md: "5xl" }}
                    >
                      Support
                    </Heading>
                    <Text
                      fontSize={{ base: "16px", md: "20px" }}
                      fontWeight={"normal"}
                      pr={"30"}
                    >
                      We place premium on the development and wellbeing of our
                      staff. The Manager and his team will provide continous
                      support for you to perform at your utmost best and
                      progress in the company towards achieving your career
                      development goals.
                    </Text>
                    <Heading fontSize={{ base: "3xl", md: "5xl" }}>
                      Referral Reward Scheme
                    </Heading>
                    <Text
                      fontSize={{ base: "16px", md: "20px" }}
                      fontWeight={"normal"}
                      pr={"30"}
                    >
                      There is a reward of £100 for every friend you refer to
                      work with us.
                    </Text>
                    <Box>
                      <CustomButton
                        transition={buttonTransition}
                        _hover={hover}
                        rounded={"10"}
                        as={"a"}
                        link="/career"
                        bg={"yellow.400"}
                        justifyContent={"left"}
                        // leftIcon={
                        //   // <ArrowForwardIcon
                        //   //   fontSize={'2rem'}
                        //   //   p={1}
                        //   //   color={'white'}
                        //   //   bg={'blue.400'}
                        //   //   rounded={'full'}
                        //   // />
                        // }
                        colorScheme="blue"
                        borderColor={"gray.100"}
                        borderWidth={2}
                        color={"gray.700"}
                        label="Learn more"
                      />
                    </Box>
                  </Stack>
                </Box> */}
              </Stack>
            </Box>
          </Box>
        </>
      }
    />
  );
}
