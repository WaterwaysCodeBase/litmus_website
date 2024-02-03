import {
  Badge,
  Box,
  Divider,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { CustomSearchableSelect } from "../../components/SelectCountry";
import { CustomInput, CustumSelect } from "../../components/Input";
import UploadCareWidget from "../../components/UploadCareWidget";
import { CustomButton } from "../../components/Buttons";

import { Form, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useApiData } from "../../components/GetData";
import { useState } from "react";
import { API_BASE_URL } from "../../components/APIs";
import FileUpload from "../../components/FileUpload";
import SubmitApplication from "../SubmitApplication";

const SingleCertUpload = () => {
  const trainingCertificates = [
    "Basic Life Support",
    "Bed Rail Safety",
    "Behaviours That Challenge",
    "Breakaway (PMVA)",
    "Care Certificate",
    "Care Planning",
    "Caring for someone with Epilepsy",
    "Catheter Care",
    "Communication",
    "Complaints Handling",
    "Confidentiality",
    "Conflict Management",
    "Continence Support",
    "Coronavirus (COVID-19) Infection Prevention and Control",
    "COSHH",
    "Data Protection/GDPR",
    "Dementia",
    "Deprivation of Liberty (DOLS)",
    "Diabetes",
    "Dignity",
    "Duty of Candor",
    "Eating Disorders",
    "End of Life",
    "Epilepsy Awareness",
    "Equality and Diversity",
    "Falls Awareness",
    "Fire Safety",
    "First Aid In The Workplace",
    "Food Hygiene",
    "Health and Safety",
    "Infection Control",
    "Lone Worker",
    "Manual Handling Theory",
    "Manual Handling Theory (Practical/Face To Face)",
    "Medication Practice",
    "Mental Capacity Act",
    "Moving and Handling",
    "Moving and Handling (Practical/Face to Face)",
    "Nutrition/Hydration",
    "Oral Health",
    "PEG Feeding",
    "Person Centred Care",
    "Physical Intervention (PMVA)",
    "Positive Behaviours",
    "Pressure Area Care",
    "Prevent Extremism and Radicalisation",
    "Professional Boundaries",
    "Recording Information",
    "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations (RIDDOR)",
    "Risk Assessment",
    "Safeguarding Vulnerable Adult and Children",
    "Safeguarding Vulnerable Adults",
    "Safeguarding Vulnerable Children",
    "Safety Interventions for Adults ICP (MAPA)",
  ];

  const {
    data: userRTW,
    loading,
    fetchData,
  } = useApiData("application/getUserCertificate");
  const uid = sessionStorage.getItem("uid");
  const toast = useToast();
  const [isLoading, setLoading] = useState();

  const formik = useFormik({
    initialValues: {
      cert_name: [],
      cert_file: "",
      cert_issue_date: "",
      cert_validity: "",
      user_id: uid,
      iHave: 1
    },
    validationSchema: Yup.object({
      // cert_name: Yup.array().min(1, "Please select at least one option"),
      cert_file: Yup.string().required("This field is required"),
      cert_issue_date: Yup.string().required("This field is required"),
      cert_validity: Yup.string().required("This field is required"),
    }),
    onSubmit: (data) => {
      console.log(data);
      setLoading(true);
      const url = API_BASE_URL + "/application/saveCertificate";
      axios
        .post(url, data)
        .then((response) => {
          if (response.data.status === "200") {
            toast({
              title: "Certificate Update",
              description: response.data.message,
              position: "top",
              status: "success",
              isClosable: true,
            });
            setLoading(false);
            // navigate('/onboarding/identity');
          } else {
            toast({
              title: "Profile Update Error",
              description: response.data.message,
              position: "top",
              status: "error",
              isClosable: true,
            });
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          toast({
            title: "Profile Update Error",
            description: error.message,
            position: "top",
            status: "error",
            isClosable: true,
          });
        });
    },
  });
  const certValidityList = [
    { value: "1 Years", label: "1 Years" },
    { value: "2 Years", label: "2 Years" },
    { value: "3 Years", label: "3 Years" },
    { value: "Lifetime", label: "Lifetime" },
  ];
  return (
    <>
      <Text>Required Document</Text>
      <Divider />
      <Box gap={10} as="form" onSubmit={formik.handleSubmit}>
        <Stack spacing={5} direction={["column", "row"]} py={5}>
          <CustomSearchableSelect
            required
            formLabel="Select Certificate"
            options={trainingCertificates.map((cert) => ({
              value: cert,
              label: cert,
            }))}
            name="cert_name"
            isInvalid={formik.errors.cert_name && formik.touched.cert_name}
            value={formik.values.cert_name}
            onChange={(selectedOptions) => {
              formik.setFieldValue("cert_name", selectedOptions);
            }}
            placeholder="Select..."
            label="Label"
            width="100%"
          // isMulti={true} // Allow multiple selections
          />

          <CustomInput
            value={formik.values.cert_issue_date}
            isInvalid={
              formik.errors.cert_issue_date && formik.touched.cert_issue_date
            }
            onChange={formik.handleChange}
            formLabel="Certificate Issue Date"
            type="date"
            placeholder="Certificate Issue Dater"
            name="cert_issue_date"
          />
        </Stack>
        <Stack gap={5} direction={["column", "column"]}>
          <CustumSelect
            value={formik.values.cert_validity}
            isInvalid={
              formik.errors.cert_validity && formik.touched.cert_validity
            }
            onChange={formik.handleChange}
            name="cert_validity"
            placeholder="Select"
            formLabel="Certificate Validity?"
            options={certValidityList}
            label={certValidityList.label}
          />
          <FileUpload
            // onFileUpload={setUploadedFiles}
            onFileUpload={(file) => formik.setFieldValue("cert_file", file)}
          />
        </Stack>
        <Stack gap={2} direction={["column", "column"]}>
          <Box py={3}>
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
                type="submit"
                bg={"blue.400"}
                colorScheme="blue"
                label="Save"
              />
            )}
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default SingleCertUpload;
