"use client";

import { Box, Spinner, useToast } from "@chakra-ui/react";

import { CustomButton } from "../components/Buttons";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "../components/APIs";
import axios from "axios";

import { useApiData } from "../components/GetData";

export default function SubmitApplication() {
  const [isLoading, setLoading] = useState();

  const uid = sessionStorage.getItem("uid");
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      user_id: uid,
    },
    onSubmit: (data) => {
      setLoading(true);
      const url = API_BASE_URL + "/application/submitApplication";
      axios
        .post(url, data)
        .then((response) => {
          if (response.data.status === 200) {
            toast({
              title: "Application Feedback",
              description: response.data.message,
              position: "top",
              status: "success",
              isClosable: true,
            });
            setLoading(false);
            // navigate('/onboarding/identity');
          } else {
            toast({
              title: "Application Feedback",
              description: response.data.message,
              position: "top",
              status: "error",
              isClosable: true,

            });
            setLoading(false);
          }
        })
        .catch((error) => { });
    },
  });

  return (
    <>
      <Box my={3}>
        {" "}
        {isLoading ? (
          <Spinner
            thickness="3px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="md"
          />
        ) : (
          <CustomButton
            type="button"
            onClick={formik.handleSubmit}
            bg={"blue.400"}
            colorScheme="blue"
            label="Submit Application"
          />
        )}
      </Box>
    </>
  );
}
