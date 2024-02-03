"use client";
import { Box, Center, Spinner } from "@chakra-ui/react";

export const LoadingSpinner = () => {
  return (
    <Center w={"full"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  );
};
export const FullLoadingSpinner = () => {
  return (
    <Center w={"full"} height={"100vh"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  );
};
