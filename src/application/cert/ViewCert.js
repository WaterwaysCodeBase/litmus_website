// WorkHistoryComponent.js (Your React Component)

import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../components/APIs";
import {
  Heading,
  Box,
  Center,
  Stack,
  Text,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import PdfViewer from "../../components/PDFViewer";
import { CustomButton } from "../../components/Buttons";
import { ButtonGroup } from "@chakra-ui/react";

function ViewCert() {
  const [Certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make an API request to fetch work history data
    const uid = sessionStorage.getItem("uid");

    axios
      .post(API_BASE_URL + "application/getUserCertificate", { user_id: uid })
      .then((response) => {
        setCertificates(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching work history data: ", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
        {" "}
        Certificate details
      </Heading>
      {loading ? (
        <p>Loading...</p>
      ) : Array.isArray(Certificates) && Certificates.length > 0 ? (
        <>
          {" "}
          {Certificates.map((cert, index) => (
            <>
              <Box
                role={"group"}
                p={2}
                maxW={"500px"}
                w={"full"}
                //   bg={useColorModeValue("white", "gray.800")}
                // boxShadow={"2xl"}
                rounded={"lg"}
                pos={"relative"}
                zIndex={1}
                my={5}
              >
                <Stack>
                  <Stack direction={"row"} align={""}>
                    <Text fontSize={"xl"}>
                      <strong>Certificate name:</strong> <br />
                      {cert.cert_name}
                      <br />
                      <strong>Expiry Date</strong> <br />
                      {cert.cert_issue_date}
                      <br />
                      <strong>Certificate Validity: </strong>
                      <br />
                      {cert.cert_validity}
                    </Text>
                  </Stack>
                  <ButtonGroup>
                    <PdfViewer
                      pdfUrl={API_BASE_URL + "uploads/" + cert.cert_file}
                    />
                    {/* <CustomButton label="Delete" bg={"red"} /> */}
                  </ButtonGroup>
                </Stack>
              </Box>
            </>
          ))}
        </>
      ) : (
        <p>No Certificate data available.</p>
      )}
    </div>
  );
}

export default ViewCert;
