"use client";

import {
  Box,
  Stack,
  Heading,
  Text,

  Divider,
  Alert,
  AlertIcon,
  Link,
} from "@chakra-ui/react";

import Header from "../layout/component/Header";


import SideNav from "./component/ApplicationSidebar";
import ApplicationProgress from "../components/ApplicationProgress";
import OnboardingFooter from "./component/OnboardingFooter";

export function OnboardingLayout({ pageTitle,
  description,
  infoALert,
  mainContent,
  showAppProgress }) {

  return (
    <>
      <Box
        display={{ base: "none", sm: "none", md: "block" }}
        w="350px"
        h="100vh"
        overflowY="auto"
        // borderRight="1px solid #ccc"
        position="fixed"
        left="0"
        textAlign="left"
        px={15}
        py={5}
        bg={"blue.50"}
       
      >
        <SideNav />
        {/* Sidebar content */}
      </Box>

      {/* Main Content */}
      <Box
        ml={{ base: "", md: "350px" }}
        height={"auto"}
        flexGrow={1}
      // pb="60px"
      >
        <Header />
        <Divider />
        <Stack
          px={5}
          pt={5}
          pb={5}
          spacing={5}
          justifyContent={"center"}
          textAlign={{ base: "left", lg: "left" }}
        >
          {showAppProgress && <ApplicationProgress />}
          {pageTitle && (
            <Heading
              color={"gray.800"}
              lineHeight={0.5}
              fontSize={{ base: "2xl", sm: "2xl", md: "2xl" }}
            >
              {pageTitle}
            </Heading>
          )}

          <Text color={"gray.500"} fontSize={{ base: "sm", sm: "lg" }}>
            {description}
          </Text>
          {infoALert == null ? (
            <></>
          ) : (
            <Alert status="warning" variant="solid">
              <AlertIcon />
              {infoALert}
            </Alert>
          )}
        </Stack>
        <Box px={5} pb={5} mb={{ base: '', md: '5em' }}>
          {mainContent}
        </Box>
        <Divider />
        <OnboardingFooter />
        {/* <Box width={"full"} m={"auto"} bottom={0} pos={'relative'} >
          <Box
            w={{ base: "93%", md: "85%" }}
            display={"flex"}
            m={"auto"}
            bg={'white'}
            py={5}
            borderRadius={'lg'}
            px={10}
            flexDir={{ base: "column-reverse", md: "row", sm: "column-reverse" }}
            gap={5}
            pos={'fixed'}
            bottom={0}
         
          >
            <Stack
              dir=""
              flex={1}
              textAlign={{ sm: "center", base: "center", md: "left" }}
            >
              <Text>
                Powered by{" "}
                <Link href="https://waterwaysdigital.com/">
                  Waterways Digital Ltd.
                </Link>
              </Text>
            </Stack>
            <Stack
              flex={2}
              flexDir={"row"}
              justifyContent={{ base: "center", md: "flex-end", sm: "center" }}
              alignContent={{ base: "center", md: "flex-end", sm: "center" }}
              align={{ sm: "center", base: "center" }}
              textAlign={{ sm: "center", base: "center", md: "left" }}
            >
              <Text>© 2023 Litmus Services Limited.  All rights reserved</Text>
            </Stack>
          </Box>
        </Box> */}
      </Box>
    </>
  );
}
