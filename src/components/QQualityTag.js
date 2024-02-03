"use client";

import React from "react";
import { Stack, Text, Button, Image, Skeleton, Box } from "@chakra-ui/react";
import { FcLock } from "react-icons/fc";

export default function QQualityTag() {
  return (
    <Stack
      mt={10}
      //   m="4"
      py={10}
    >
      {/* <Stack direction="row" alignItems="center">
        <Text fontWeight="semibold">Your Privacy</Text>
        <FcLock />

      </Stack> */}
      <Stack
        direction={{ base: "column", md: "column" }}
        justifyContent="center"
        textAlign={"center"}
      >
        <Image
          src={"/images/litmus-cqc.jpg"}
          alt="Lovely Image"
          width={"400px"}
          objectFit="contain"
          alignSelf={"center"}
          // flex="1"
        />

        {/* <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
          We are
        </Text> */}
      </Stack>
    </Stack>
  );
}
