"use client";

import { Text, Stack, Center } from "@chakra-ui/react";

import GeneralLayout from "../layout/GeneralLayout";

import { CustomButton } from "../components/Buttons";

export default function Error404() {
  return (
    <GeneralLayout
      pageContent={
        <>
          {/* <Center m={"auto"} py={10}>
            <Text fontSize={"4xl"}> The page does not exist!</Text>
          </Center> */}
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
            backgroundImage={"url('/images/access-denied.png')"}
            backgroundPosition={"center"}
            backgroundRepeat={"no-repeat"}
            backgroundSize={"contain"}
          >
            <CustomButton
              colorScheme="red"
              top={{ base: 150, md: 150, sm: 100 }}
              label="Take Me Home"
              as={"a"}
              link="/"
            />
          </Stack>
          <Center m={"auto"} py={10}></Center>
        </>
      }
    />
  );
}
