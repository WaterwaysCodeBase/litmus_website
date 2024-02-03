import { Icon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  Grid,
  HStack,
  Heading,
  Highlight,
  Image,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { Hero } from "../components/Hero";
import { CustomButton } from "../components/Buttons";
import AnimatedBox from "../components/AnimatedBox";
import QQualityTag from "../components/QQualityTag";
import GeneralNavbar from "../layout/component/GeneralNavbar";
import GeneralLayout from "../layout/GeneralLayout";
import ServicePortfolio from "../components/ServicePortfolio";
const LitmusHealthcare = () => {
  const hover = {
    // backgroundColor: 'blue.400',
    color: "blue.400",
    transform: "translateX(5px)",
  };
  const buttonTransition =
    '"background-color 0.3s, color 0.3s, transform 0.3s"';
  const services = [
    {
      title: "Demential Care",
      image: "/images/dementia-care.jpg",
      link: "#", // Provide the image URL
    },
    {
      title: "End of Life Care",
      image: "/images/eol-care.jpg",
      link: "#", // Provide the image URL
    },
    {
      title: "Complex Care",
      image: "/images/complex-care.jpg",
      link: "#", // Provide the image URL
    },
    {
      title: "Multiple Sclerosis Care",
      image: "/images/multiple-sclerosis-care.jpg",
      link: "#", // Provide the image URL
    },
    {
      title: "Wound Care",
      image: "/images/wound.jpg",
      link: "#", // Provide the image URL
    },
    {
      title: "Rehabilitation and Reablement",
      image: "/images/spinal-injury-care.jpg",
      link: "#", // Provide the image URL
    },
    {
      title: "Parkinson's Care",
      image: "/images/parkison.jpg",
      link: "#", // Provide the image URL
    },
    {
      title: "Stroke Care",
      image: "/images/stroke-care.jpg",
      link: "#", // Provide the image URL
    },
    {
      title: "Stomach Care (including PEG tube  and  Stoma bag management)",
      image: "/images/stomach-care.jpg",
      link: "#", // Provide the image URL
    },
    {
      title: "Medication Management",
      image: "/images/medication.jpg",
      link: "#", // Provide the image URL
    },
    // Add more services here...
  ];
  const IamLookinFor = [
    {
      title: "Live in Care",
      image: "/images/litmus-bg.jpg",
      description: "", // Provide the image URL
    },
    {
      title: "Domiciliary",
      image: "/images/litmus-bg.jpg",
      description: "", // Provide the image URL
    },
    // Add more services here...
  ];
  return (
    <GeneralLayout
      pageContent={
        <>
          <Box w={"full"}>
            <Hero
              videURL="/video/litmus.mp4"
              heroTitle="Litmus Care"
              heroDescription=" We are here to provide you with the support and care you need at
            the comfort of your home as your dependable partner in progress"
              heroLead="  . . . partnership that works"
              heroActionButton={
                <>
                  <CustomButton
                    as={"a"}
                    link="/healthcare/live-in-care"
                    label="Live in Care"
                    bg={"yellow.400"}
                    width={{ base: "350px", md: "300px" }}
                  />
                  <CustomButton
                    as={"a"}
                    link="/healthcare/domiciliary"
                    label=" Domiciliary Care"
                    bg={"blue.400"}
                    width={{ base: "350px", md: "300px" }}
                  />
                </>
              }
            />
            <Stack
              w={{ base: "93%", md: "80%" }}
              m={"auto"}
              py={50}
              gap={0}
              direction={{ base: "column", md: "row" }}
            >
              {/* <Box
                flex={"1"}
                alignContent={"center"}
                justifyContent={"center"}
                bg={"red"}
                borderTopLeftRadius={"20"}
                borderBottomLeftRadius={{ base: "", md: "20" }}
                borderTopRightRadius={{ base: "20", md: "0" }}
                backgroundImage={
                  'url("https://img.freepik.com/premium-photo/nurse-doctor-senior-care-caregiver-help-assistence-retirement-home-nursing-elderly-man-woman-health-support-african-american-black_772720-5899.jpg?w=740")'
                }
                backgroundPosition={"center"}
                backgroundSize={"cover"}
                minHeight={{ base: "300px", md: "auto" }}
              >
                {/* <Image
           
            borderTopRightRadius={{ base: '20', md: '0' }}
            borderTopLeftRadius={'20'}
            position={'static'}
            w={'full'}
            src=""
            alt="Dan Abramov"
          /> 
              </Box> */}
              <Box
                flex="1.5"
                bg={useColorModeValue("blue.400", "gray.800")}
                color={"white"}
                w={{ base: "100%", md: "70%" }}
                borderTopRightRadius={{ base: "", md: "20" }}
                borderBottomLeftRadius={{ base: "20", md: "0" }}
                borderBottomRightRadius={{ base: "20", md: "20" }}
              >
                <Stack gap={10} py={8} px={"6"}>
                  <Heading
                    fontSize={{ base: "3xl", md: "5xl" }}
                    lineHeight={"50px"}
                  >
                    Welcome to Litmus Care
                    <Text
                      fontSize={{ base: "20px", md: "20px" }}
                      fontStyle={"italic"}
                    >
                      <Highlight
                        query="... partnership that works"
                        styles={{
                          px: "2",
                          py: "1",
                          rounded: "full",
                          bg: "yellow.200",
                        }}
                      >
                        ... partnership that works
                      </Highlight>
                    </Text>
                  </Heading>

                  <Text
                    fontSize={{ base: "16px", md: "20px" }}
                    fontWeight={"normal"}
                    textAlign={"justify"}
                    pr={"30"}
                  >
                    Our company provides person-centered care and support
                    services to our clients. We are proud of a team of well
                    trained and compassionate staff who are always ready and
                    happy to join you to assess, create and deliver a care plan
                    tailored specifically for you.
                    <br />
                  </Text>
                  <Text
                    fontSize={{ base: "16px", md: "20px" }}
                    fontWeight={"normal"}
                    pr={"30"}
                  >
                    For further information, please do get in touch with our
                    friendly team
                  </Text>
                  <Stack direction="row" spacing={4}>
                    {/* <Button
                leftIcon={<EmailIcon />}
                colorScheme="blue"
                variant="solid"
                size={'lg'}
              >
                Email
              </Button> */}
                    <CustomButton
                      label="Contact Us"
                      bg={"yellow.400"}
                      as={"a"}
                      link="/contact"
                    />
                  </Stack>
                </Stack>
              </Box>
            </Stack>
            <Stack w={{ base: "93%", md: "80%" }} m={"auto"} py={"8em"} gap={5}>
              <Heading
                fontSize={{ base: "4xl", md: "5xl" }}
                textAlign={{ base: "center", md: "center" }}
              >
                I'm Looking for
              </Heading>
              <SimpleGrid
                columns={{ base: 1, md: 3 }}
                gap={5}
                px={3}
                justifyItems={"center"}
                alignItems={"center"}
                margin={"auto"}
              >
                <AnimatedBox
                  link={"/healthcare/domiciliary"}
                  buttonColorScheme={"blue"}
                  buttonText={"Get Started"}
                  buttonVariant={"solid"}
                  title={
                    <>
                      Domiciliary <br />
                      (Hourly) Care
                    </>
                  }
                />

                <AnimatedBox
                  link={"/healthcare/live-in-care"}
                  buttonColorScheme={"blue"}
                  buttonText={"Get Started"}
                  buttonVariant={"solid"}
                  title={
                    <>
                      Live in <br />
                      Care
                    </>
                  }
                />
                <AnimatedBox
                  link={"/career"}
                  buttonColorScheme={"blue"}
                  buttonText={"Get Started"}
                  buttonVariant={"solid"}
                  title={
                    <>
                      Job <br />
                      Oppurtunities
                    </>
                  }
                />
              </SimpleGrid>
            </Stack>
          
            <Stack
              id="s"
              w={{ base: "100%", md: "100%" }}
              m={"auto"}
              py={"20"}
              gap={5}
              bg={useColorModeValue("blue.500", "blue.900")}
            >
              <Box w={"80%"} m={"auto"}>
                <Heading
                  fontSize={{ base: "4xl", md: "5xl" }}
                  color={"white"}
                  textAlign={{ base: "center", md: "left" }}
                >
                  Our Services
                </Heading>
                <Stack py={"10"}>
                  {" "}
                  <Grid
                    templateColumns={{
                      base: "1fr",
                      md: "repeat(3, 1fr)",
                      lg: "repeat(3, fr)",
                    }}
                    gap={2}
                  >
                     
                    {services.map((service, index) => (
                      <motion.div key={index}>
                        <Box
                          rounded="lg"
                          as="a"
                          href={service.link}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2, duration: 0.5 }}
                        >
                          <Center>
                            {/* <SkeletonCircle
                        mt={5}
                        size="200"
                        startColor="blue.300"
                        endColor="yellow.100"
                      /> */}
                            <Image src={service.image} alt={service.title} />
                          </Center>
                          <Box p={4}>
                            <Text
                              fontSize={"3xl"}
                              fontWeight={400}
                              minH={{ base: "auto", lg: "120px", md: "120px" }}
                              textAlign={"center"}
                              color={"whiteAlpha.900"}
                              mb={2}
                            >
                              {service.title}
                            </Text>
                          </Box>
                        </Box>
                      </motion.div>
                    ))}
                  </Grid>
                </Stack>
              </Box>
            </Stack>
            <Box
              w={{ base: "93%", md: "80%" }}
              m={"auto"}
              py={"20"}
              gap={5}
              justifyContent={"space-between"}
              alignContent={"space-between"}
            >
              {/* <Stack
                direction={{ base: "column-reverse", lg: "row" }}
                spacing={{ base: "0", lg: "20" }}
              >
                <Box
                  width={{ lg: "60%" }}
                  transform={{ base: "translateY(-50%)", lg: "none" }}
                  bg={{
                    base: useColorModeValue("red.50", "gray.700"),
                    lg: "transparent",
                  }}
                  alignSelf={"center"}
                  justifySelf={"center"}
                  mx={{ base: "6", md: "8", lg: "0" }}
                  px={{ base: "6", md: "8", lg: "0" }}
                  py={{ base: "6", md: "8", lg: "12" }}
                >
                  <Stack spacing={{ base: "8", lg: "10" }}>
                    <Stack spacing={{ base: "2", lg: "4" }}>
                      <Heading fontSize={{ base: "3xl", md: "5xl" }}>
                        Live-in Care
                      </Heading>
                      <Text
                        fontSize={{ base: "16px", md: "20px" }}
                        fontWeight={"normal"}
                        pr={"30"}
                      >
                        As one of the first companies to provide live-in care
                        throughout the UK, we have over 25 years experience in
                        both training our carers and in providing a professional
                        level of live-in care services. We cover it all, from
                        employment matters – salaries, benefits and leave, for
                        example – to providing a wide range of services
                        including everything from complex nursing care, to
                        mobility aids, and more.
                      </Text>
                    </Stack>
                    <HStack spacing="3">
                      <CustomButton
                        as={"a"}
                        link="/healthcare/live-in-care"
                        transition={buttonTransition}
                        _hover={hover}
                        variant="link"
                        label="Learn More"
                        rightIcon={
                          <Icon
                            color={useColorModeValue("blue.500", "blue.300")}
                            as={FaArrowRight}
                          />
                        }
                        color={"blue.400"}
                      />
                    </HStack>
                  </Stack>
                </Box>
                <Flex flex="1" overflow="hidden">
                  <Image
                    src="/images/live-in-care.jpg"
                    alt="Lovely Image"
                    fallback={<Skeleton />}
                    width={"532px"}
                    objectFit="contain"
                    alignSelf={"center"}
                    // flex="1"
                  />
                  <Image
              display={{ base: 'none', sm: 'initial' }}
              alt="Lovely Image"
              fallback={<Skeleton />}
              maxH="450px"
              objectFit="cover"
            />
                </Flex>
              </Stack> */}

              <QQualityTag />
            </Box>
          </Box>
        </>
      }
    />
  );
};

export default LitmusHealthcare;
