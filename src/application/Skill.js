"use client";

import {
  Stack,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Alert,
  Heading,
  Box,
  Divider,
  Text,
} from "@chakra-ui/react";

import { OnboardingLayout } from "../layout/OnboardingLayout";
import { CustomInput, CustumSelect } from "../components/Input";
import { CustomButton } from "../components/Buttons";
import FileInput from "../components/FIleInput";

export default function Skills() {
  const certificates = [{ value: "From Database", label: "From Database" },{ value: "From Database", label: "From Database" }];

  const handleFileChange = (files) => {
    console.log("Selected files:", files);
    // You can perform actions with the selected files here
  };
  return (
    <OnboardingLayout
      pageTitle="Let's get to know you more!"
      description="Description"
      mainContent={
        <Stack gap={4} direction={{ base: "column", md: "column", sm: "row" }}>
          {/* Names */}
          {certificates.map((item, index) => (
            <Stack key={index} gap={5} direction={["row", "row"]}>
              <FileInput
                label={item.label}
                buttonText={" Upload " + item.label}
                onChange={handleFileChange}
                accept=".jpg,.png,.pdf" // Optional: Limit accepted file types
                // Optional: Allow multiple file selection
              />
            </Stack>
          ))}

          <Box py={5}>
            <CustomButton bg={"blue.400"} colorScheme="blue" label="Save" />
          </Box>
        </Stack>
      }
    />
  );
}
