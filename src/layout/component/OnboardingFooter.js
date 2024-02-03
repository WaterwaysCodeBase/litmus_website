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
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { ReactNode } from "react";
import { Logo } from "../../components/Logo";
import { CustomButton } from "../../components/Buttons";
import { YearLong } from "docx";

const SocialButton = ({
  children,
  label,
  href,
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("white", "whiteAlpha.100")}
      rounded={"full"}
      w={10}
      h={10}
      cursor={"pointer"}
      as={"a"}
      href={href}
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

export default function OnboardingFooter() {
  return (
    <Box width={""} flex={1} m={"auto"} py={"3"} bottom={0} right={0} left={'350px'} pos={{ base: '', md: 'fixed' }} bg={'gray.50'} px={5}>
      <Box
        w={{ base: "97%", md: "full" }}
        display={"flex"}
        // m={"auto"}
        bg={'white'}
        py={4}
        borderRadius={'lg'}
        px={5}
        flexDir={{ base: "column-reverse", md: "row", sm: "column-reverse" }}
        gap={5}
      >
        <Stack
          dir=""
          flex={1}
          textAlign={{ sm: "center", base: "center", md: "left" }}
        >
          <Text>
            Powered by{" "}
            <Link 
            
            href="https://waterwaysdigital.com/">
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
          <Text>@2024 Litmus Services Limited.  All rights reserved</Text>
        </Stack>
      </Box>
    </Box>
  );
}
