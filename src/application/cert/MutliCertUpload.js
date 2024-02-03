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

const MultiCertUpload = () => {
  const trainingCertificates = [
    { value: "basicLifeSupport", label: "Basic Life Support" },
    { value: "bedRailSafety", label: "Bed Rail Safety" },
    { value: "behavioursThatChallenge", label: "Behaviours That Challenge" },
    { value: "breakaway", label: "Breakaway (PMVA)" },
    { value: "careCertificate", label: "Care Certificate" },
    { value: "carePlanning", label: "Care Planning" },
    {
      value: "caringForSomeoneWithEpilepsy",
      label: "Caring for someone with Epilepsy",
    },
    { value: "catheterCare", label: "Catheter Care" },
    { value: "communication", label: "Communication" },
    { value: "complaintsHandling", label: "Complaints Handling" },
    { value: "confidentiality", label: "Confidentiality" },
    { value: "conflictManagement", label: "Conflict Management" },
    { value: "continenceSupport", label: "Continence Support" },
    {
      value: "coronavirusInfectionPreventionControl",
      label: "Coronavirus (COVID-19) Infection Prevention and Control",
    },
    { value: "COSHH", label: "COSHH" },
    { value: "dataProtectionGDPR", label: "Data Protection/GDPR" },
    { value: "dementia", label: "Dementia" },
    {
      value: "deprivationOfLibertyDOLS",
      label: "Deprivation of Liberty (DOLS)",
    },
    { value: "diabetes", label: "Diabetes" },
    { value: "dignity", label: "Dignity" },
    { value: "dutyOfCandor", label: "Duty of Candor" },
    { value: "eatingDisorders", label: "Eating Disorders" },
    { value: "endOfLife", label: "End of Life" },
    { value: "epilepsyAwareness", label: "Epilepsy Awareness" },
    { value: "equalityAndDiversity", label: "Equality and Diversity" },
    { value: "fallsAwareness", label: "Falls Awareness" },
    { value: "fireSafety", label: "Fire Safety" },
    { value: "firstAidInWorkplace", label: "First Aid In The Workplace" },
    { value: "foodHygiene", label: "Food Hygiene" },
    { value: "healthAndSafety", label: "Health and Safety" },
    { value: "infectionControl", label: "Infection Control" },
    { value: "loneWorker", label: "Lone Worker" },
    { value: "manualHandlingTheory", label: "Manual Handling Theory" },
    {
      value: "manualHandlingTheoryPracticalFaceToFace",
      label: "Manual Handling Theory (Practical/Face to Face)",
    },
    { value: "medicationPractice", label: "Medication Practice" },
    { value: "mentalCapacityAct", label: "Mental Capacity Act" },
    { value: "movingAndHandling", label: "Moving and Handling" },
    {
      value: "movingAndHandlingPracticalFaceToFace",
      label: "Moving and Handling (Practical/Face to Face)",
    },
    { value: "nutritionHydration", label: "Nutrition/Hydration" },
    { value: "oralHealth", label: "Oral Health" },
    { value: "PEGFeeding", label: "PEG Feeding" },
    { value: "personCentredCare", label: "Person Centred Care" },
    {
      value: "physicalInterventionPMVA",
      label: "Physical Intervention (PMVA)",
    },
    { value: "positiveBehaviours", label: "Positive Behaviours" },
    { value: "pressureAreaCare", label: "Pressure Area Care" },
    {
      value: "preventExtremismAndRadicalisation",
      label: "Prevent Extremism and Radicalisation",
    },
    { value: "professionalBoundaries", label: "Professional Boundaries" },
    { value: "recordingInformation", label: "Recording Information" },
    {
      value: "reportingOfInjuriesDiseasesOccurrencesRIDDOR",
      label:
        "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations (RIDDOR)",
    },
    { value: "riskAssessment", label: "Risk Assessment" },
    {
      value: "safeguardingVulnerableAdultChildren",
      label: "Safeguarding Vulnerable Adult and Children",
    },
    {
      value: "safeguardingVulnerableAdults",
      label: "Safeguarding Vulnerable Adults",
    },
    {
      value: "safeguardingVulnerableChildren",
      label: "Safeguarding Vulnerable Children",
    },
    {
      value: "safetyInterventionsAdultsICPMAPA",
      label: "Safety Interventions for Adults ICP (MAPA)",
    },
  ];
  const {
    data: userRTW,
    loading,
    fetchData,
  } = useApiData("application/getUserCertificate");
  const uid = sessionStorage.getItem("uid");
  const toast = useToast();
  const [isLoading, setLoading] = useState();
  const [selection, setSelection] = useState(null);
  const [showFields, setShowFields] = useState();

  const handleSelectionChange = (event) => {
    const value = event.target.value;
    setSelection(value);
    setShowFields(value == "yes");
  };

  const formik = useFormik({
    initialValues: {
      cert_name: [],
      cert_file: "",
      cert_issue_date: "",
      cert_validity: "",
      user_id: uid,
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
        <Stack gap={5} direction={["column", "row"]}>
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
          <UploadCareWidget
            onChange={(info) => {
              formik.setFieldValue("cert_file", info.originalUrl);
            }}
            isInvalid={formik.errors.cert_file && formik.touched.cert_file}
            formLabel={
              <>
                Upload Certificate
                <Badge variant="outline" colorScheme="blue">
                  Click the link below to preview
                </Badge>
              </>
            }
            value={formik.values.cert_file}
          />
        </Stack>
        <Box py={5}>
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
      </Box>
    </>
  );
};

export default MultiCertUpload;
