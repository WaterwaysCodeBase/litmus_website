// 'use strict'
import React from 'react';
import {
  Stack,
  Box,
  Text,
  Button,
  Image,
  useColorModeValue,
  AbsoluteCenter,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";

export default function Home() {

  return (
    <Box
      w={"100%"}
      className="landing-bg"
      py={{ base: 20, md: 20 }}
      // h={{ base: "auto", lg: "auto", md: "auto" }}
      position={"relative"}
      minHeight={"100vh"}
    >
      {/* <Stack flex={1} spacing={{ base: "", md: "" }} m={"auto"}> */}
      <AbsoluteCenter width={"100%"} align="center" axis="both">
        <Stack spacing={10}>
          <Text
            textAlign={"center"}
            fontSize={{ base: "6xl", md: "8xl" }}
            fontWeight={"normal"}
            color={useColorModeValue("gray.700", "gray.200")}
          >
            Welcome to
          </Text>

          <Box as={"center"} mb={5}>
            <Image
              width={{ base: "350px", md: "250px", lg: "250px", sm: "200px" }}
              alt={"Hero Image"}
              src={"/images/litmus-logo.png"}
            />
            <Text fontSize={"2xl"} as={"i"} className="arrow">
              ...partnership that works
            </Text>
          </Box>

          <SimpleGrid gap={5} alignSelf={"center"} columns={{ base: 1, md: 2 }}>
            <Button
              as={"a"}
              href="/healthcare"
              bg="blue.400"
              size={"lg"}
              // fontSize={'3xl'}
              width={{ base: "250px", md: "300px" }}
              fontWeight={"bold"}
              py={10}
            >
              Healthcare
            </Button>
            <Button
              as={"a"}
              href="/career"
              bg="yellow.400"
              variant="solid"
              size={"lg"}
              // fontSize={'3xl'}
              fontWeight={"bold"}
              py={10}
              width={{ base: "250px", md: "300px" }}
            >
              Career Page
            </Button>
          </SimpleGrid>
        </Stack>
      </AbsoluteCenter>
    </Box>
  );
}
