"use client";

import { Text, Stack, Center } from "@chakra-ui/react";

import GeneralLayout from "../layout/GeneralLayout";

import { CustomButton } from "../components/Buttons";

export default function Error404() {
  return (
    <GeneralLayout
      pageContent={
        <>
          <Center m={"auto"} py={10}>
            <Text fontSize={"4xl"}> It Seems you are Lost!</Text>
          </Center>
          <Stack
            justifyContent={"center"}
            alignSelf={"center"}
            align={"center"}
            justifySelf={"cenetr"}
            height={"70vh"}
            id="sendMail"
            position={"relative"}
            // bg={"blue.50"}
            w={"full"}
            backgroundImage={"url('/images/accessx.jpg')"}
            backgroundPosition={"center"}
            backgroundRepeat={"no-repeat"}
            backgroundSize={"contain"}
          ></Stack>
          <Center m={"auto"} py={10}>
            <CustomButton label="Take Me Home" as={"a"} link="/" />
          </Center>
        </>
      }
    />
  );
}
