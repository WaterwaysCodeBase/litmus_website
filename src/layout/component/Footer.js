"use client";

import {
  Box,
  Center,
  chakra,
  Container,
  Divider,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { ReactNode } from "react";
import { Logo } from "../../components/Logo";
import { CustomButton } from "../../components/Buttons";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode,
  label: string,
  href: string,
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blue.400", "whiteAlpha.100")}
      rounded={"full"}
      w={10}
      h={10}
      cursor={"pointer"}
      as={"a"}
      href={href}
      target="_blank"
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("yellow.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  const headingColor = {
    fontSize: { base: "", md: "7xl", sm: "" },
    textColor: useColorModeValue("gary.500", "gray.900"),
  };

  return (
    <Box
      width={"100%"}
      bg={useColorModeValue("gary.200", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
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
          // backgroundImage={"url('/images/nurse-standing.jpg')"}
          // backgroundPosition={"center"}
          // bgRepeat={"no-repeat"}
          // backgroundSize={"cover"}
          rounded={20}
          py={7}
          justifyContent={"center"}
          alignContent={"cenetr"}
        >
          <Stack
            justify={{ base: "center", md: "space-between" }}
            align={{ base: "center", md: "center" }}
          >
            <Logo alignSelf={"center"} justifySelf={"center"} height={"auto"} />
          </Stack>
        </Box>

        <Box
          flex="6"
          padding="20px"
          // Change to your desired background color
          // boxShadow="md"
          width={{ base: "100%", md: "500px" }} // Adjust width as needed
          py={7}
          rounded={20}
          backgroundColor="blue.500"
          color="white" // Change to your desired text color
          fontWeight="bold"
          gap={10}
          justifyContent={"center"}
          alignContent={"cenetr"}
          display={"flex"}
          flexDirection={{ base: "column", md: "row", sm: "column" }}
        >
          {/* <Stack flex={2}>
            <Heading style={headingColor} >Site Links</Heading>
          </Stack>
          <Stack flex={2}>
            <Heading >Site Links</Heading>
          </Stack> */}
          <Stack flex={1.5} textAlign={{ base: "center", md: "left" }}>
            <Heading headingColor>Our Social Media</Heading>
            <Stack
              flex={1}
              flexDir={"row"}
              justifyContent={{ base: "center", md: "left", sm: "center" }}
              alignContent={{ base: "center", md: "left", sm: "center" }}
              align={{ sm: "center", base: "center", md: "left" }}
            >
              <SocialButton
                label={"Twitter"}
                href={"https://x.com/LitmusServices?s=08"}
              >
                <FaTwitter />
              </SocialButton>
              <SocialButton label={"YouTube"} href={"#"}>
                <FaFacebook />
              </SocialButton>
              <SocialButton label={"Instagram"} href={"#"}>
                <FaInstagram />
              </SocialButton>
            </Stack>
          </Stack>
        </Box>
      </Box>
      <Divider />
      <Box width={"full"} m={"auto"} py={"10"} bg={"blue.400"}>
        <Box
          w={{ base: "93%", md: "90%" }}
          display={"flex"}
          m={"auto"}
          flexDir={{ base: "column-reverse", md: "row", sm: "column-reverse" }}
          // gap={5}
        >
          <Stack
            dir=""
            flex={3}
            color={"white"}
            fontWeight={"500"}
            textAlign={{ sm: "center", base: "center", md: "left" }}
          >
            <div>
              Powered by{" "}
              <Link href="https://waterwaysdigital.com/">
                Waterways Digital Ltd. - Your Trusted Digital Service Provider
              </Link>
            </div>
          </Stack>
          <Stack
            spacing={5}
            color={"white"}
            flex={2}
            flexDir={"row"}
            justifyContent={{ base: "center", md: "flex-end", sm: "center" }}
            alignContent={{ base: "center", md: "flex-end", sm: "center" }}
            align={{ sm: "center", base: "center" }}
          >
            <Text>©2024 Litmus Services Limited. All rights reserved</Text>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
