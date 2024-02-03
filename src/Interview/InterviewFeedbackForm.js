import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  Heading,
  cookieStorageManager,
  Text,
  SimpleGrid,
  useToast,
  Link,
  Center,
} from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../components/APIs';
import GeneralLayout from '../layout/GeneralLayout';
import { CustomInput, CustomTextarea, CustumSelect } from '../components/Input';
import * as Yup from 'yup'
import { LoadingSpinner } from '../components/LoadingSpinner';
import { WarningIcon } from '@chakra-ui/icons';
import { infoSource, interviewAligned, interviewFeedbackChoices, likelihoodChoices, rating, yesNoSomewhat } from '../util/data';

const InterviewFeedbackForm = () => {
  const { applicant_token } = useParams();
  const [loading, setLoading] = useState();
  const [applicantData, setApplicantData] = useState(null);
  const token = Cookies.get('token')
  const uid = Cookies.get('uid')
  // Fetch applicant data using Axios
  useEffect(() => {
    const url = API_BASE_URL + '/interview/getPersonalData'
    const token = Cookies.get('token')
    const uid = Cookies.get('uid')
    const data = {
      userToken: applicant_token,
      uid: uid
    }
    axios.post(url, data).then((response) => {
      setApplicantData(response.data);
    }).catch((error) => {

    });
  }, [applicant_token]);
  const toast = useToast()
  // Formik configuration
  const formik = useFormik({
    initialValues: {
      communication: '',
      interviewAlignment: '',
      interviewRatings: '',
      interviewerProfessionalism: '',
      interviewerKnowledge: '',
      interviewQuestionsRelevance: '',
      assessmentsExperience: '',
      companyCultureInsights: '',
      overallImpression: '',
      likelihoodToProceed: '',
      additionalComments: '',
      interviewUniqueness: '',
      source: '',
      interviewDate: '',
      user_id: uid
    },
    validationSchema: Yup.object({
      communication: Yup.string().required("This Field is required"),
      interviewRatings: Yup.string().required("This Field is required"),
      interviewDate: Yup.string().required("This Field is required"),
      interviewAlignment: Yup.string().required("This Field is required"),
      interviewerProfessionalism: Yup.string().required("This Field is required"),
      interviewerKnowledge: Yup.string().required("This Field is required"),
      interviewQuestionsRelevance: Yup.string().required("This Field is required"),
      assessmentsExperience: Yup.string().required("This Field is required"),
      companyCultureInsights: Yup.string().required("This Field is required"),
      overallImpression: Yup.string().required("This Field is required"),
      likelihoodToProceed: Yup.string().required("This Field is required"),
      interviewUniqueness: Yup.string().required("This Field is required"),
      source: Yup.string().required("This Field is required"),
      additionalComments: Yup.string().required("This Field is required"),
    }),
    onSubmit: (data) => {
      setLoading(true)
      console.log(data)
      const url = API_BASE_URL + "/interview/saveInterviewFeedBack"
      axios
        .post(url, data)
        .then((response) => {
          if (response.data.status === 200) {
            toast({
              title: response.data.message,
              description: response.data.message,
              position: "top",
              status: "success",
              isClosable: true,
            });

          } else {
            toast({
              title: response.data.message,
              description: response.data.message,
              position: "top",
              status: "error",
              isClosable: true,
            });

          }
        })
        .catch((error) => {
          toast({
            title: "error",
            description: error.message,
            position: "top",
            status: "error",
            isClosable: true,
          });

        }).finally(() => {
          // This block will be executed regardless of success or failure
          setLoading(false);
          window.location.reload();
        });
    },
  });

  // if (!applicantData) {
  //   return <div>Loading...</div>;
  // }

  return (
    <GeneralLayout
      infoALert=''
      description='Okay'
      pageContent={
        <Box mt={'7em'} width={{ base: 'full', md: '3xl' }} mx={'auto'} px={'.5em'}>
          {applicantData?.feedback != null  ?
            <Box bg={'blue.100'} width={'full'} py={'2em'} mx={'auto'} alignItems={'center'} justifyItems={'center'}>
              <Heading textAlign={'center'} as="h2" mb={4}>You have submitted a feedback</Heading>
              <Center> <Link fontWeight={600} textColor={'blue'} textDecor={'underline'} textAlign={'center'} href='/interview/schedule'>Go Back</Link></Center>
            </Box>
            :

            <>
              <Heading as="h2" mb={4}>Litmus Services Limited Interview Feedback Questionnaire</Heading>
              {!applicantData && <LoadingSpinner />}



              {applicantData?.status === 400 || applicantData === null ?
                <Box>
                  <Text fontSize={'2em'} color={'red'}><WarningIcon />{' '}{applicantData?.message}</Text>
                </Box>
                :
                <Stack as={'form'} onSubmit={formik.handleSubmit}>
                  {/* Personal Information */}
                  <Stack gap={2} direction={["column", "row"]}>
                    <CustomInput value={applicantData?.name} disabled={'disabled'} formLabel='Full name' />
                    <CustomInput value={applicantData?.email} disabled={'disabled'} formLabel='Email' />
                  </Stack>
                  <Stack gap={2} direction={["column", "row"]}>
                    <CustomInput value={applicantData?.phone_number} disabled={'disabled'} formLabel='Phone Number' />
                    <CustomInput value={applicantData?.job_title} disabled={'disabled'} formLabel='Possition Applied for' />
                  </Stack>


                  {/* Questionnaire */}
                  <SimpleGrid gap={'1em'} columns={1} direction={["column", "row"]}>
                    <CustomInput
                      type='date'
                      value={formik.values.interviewDate}
                      isInvalid={
                        formik.errors.interviewDate &&
                        formik.touched.interviewDate
                      }
                      onChange={formik.handleChange}
                      name='interviewDate'
                      formLabel='Date of Interview'
                    />
                    <CustumSelect
                      value={formik.values.source}
                      isInvalid={
                        formik.errors.source &&
                        formik.touched.source
                      }
                      onChange={formik.handleChange}
                      name="source"
                      placeholder="Select"
                      formLabel="How did you hear about the job opportunity with Litmus Services Limited"
                      options={infoSource}
                      label={infoSource.label}
                    />
                    <CustumSelect
                      value={formik.values.interviewRatings}
                      isInvalid={
                        formik.errors.interviewRatings &&
                        formik.touched.interviewRatings
                      }
                      onChange={formik.handleChange}
                      name="interviewRatings"
                      placeholder="Select"
                      formLabel=" Rate your overall satisfaction with the interview process on a scale of 1 to 5 (1 being the lowest, 5 being the highest)"
                      options={rating}
                      label={rating.label}
                    />
                    <CustumSelect
                      value={formik.values.communication}
                      isInvalid={
                        formik.errors.communication &&
                        formik.touched.communication
                      }
                      onChange={formik.handleChange}
                      name="communication"
                      placeholder="Select"
                      formLabel="How clear were the communications regarding the interview schedule and process?"
                      options={interviewFeedbackChoices}
                      label={interviewFeedbackChoices.label}
                    />

                    <CustumSelect
                      value={formik.values.interviewAlignment}
                      isInvalid={
                        formik.errors.interviewAlignment &&
                        formik.touched.interviewAlignment
                      }
                      onChange={formik.handleChange}
                      name="interviewAlignment"
                      placeholder="Select"
                      formLabel="How well did the interview align with the job description and your expectations?"
                      options={interviewAligned}
                      label={interviewAligned.label}
                    />
                    <CustumSelect
                      value={formik.values.interviewerProfessionalism}
                      isInvalid={
                        formik.errors.interviewerProfessionalism &&
                        formik.touched.interviewerProfessionalism
                      }
                      onChange={formik.handleChange}
                      name="interviewerProfessionalism"
                      placeholder="Select"
                      formLabel="Rate the professionalism and friendliness of the interviewer(s) on a scale of 1 to 5"
                      options={rating}
                      label={rating.label}
                    />

                    <CustumSelect
                      value={formik.values.interviewerKnowledge}
                      isInvalid={
                        formik.errors.interviewerKnowledge &&
                        formik.touched.interviewerKnowledge
                      }
                      onChange={formik.handleChange}
                      name="interviewerKnowledge"
                      placeholder="Select"
                      formLabel="Were the interviewers knowledgeable about the role and the company?"
                      options={yesNoSomewhat}
                      label={yesNoSomewhat.label}
                    />
                    <CustumSelect
                      value={formik.values.interviewQuestionsRelevance}
                      isInvalid={
                        formik.errors.interviewQuestionsRelevance &&
                        formik.touched.interviewQuestionsRelevance
                      }
                      onChange={formik.handleChange}
                      name="interviewQuestionsRelevance"
                      placeholder="Select"
                      formLabel="Were the interview questions relevant to the job position?"
                      options={yesNoSomewhat}
                      label={yesNoSomewhat.label}
                    />

                    <CustumSelect
                      value={formik.values.assessmentsExperience}
                      isInvalid={
                        formik.errors.assessmentsExperience &&
                        formik.touched.assessmentsExperience
                      }
                      onChange={formik.handleChange}
                      name="assessmentsExperience"
                      placeholder="Select"
                      formLabel="Were there any assessments or tasks during the interview? If yes, please share your experience?"
                      options={yesNoSomewhat}
                      label={yesNoSomewhat.label}
                    />
                    <CustumSelect
                      value={formik.values.companyCultureInsights}
                      isInvalid={
                        formik.errors.companyCultureInsights &&
                        formik.touched.companyCultureInsights
                      }
                      onChange={formik.handleChange}
                      name="companyCultureInsights"
                      placeholder="Select"
                      formLabel="Did the interview provide insights into Litmus Services Limited's company culture and values?"
                      options={yesNoSomewhat}
                      label={yesNoSomewhat.label}
                    />

                    <Text fontSize={20} fontWeight={600}> **Feedback on Litmus Services Limited:**</Text>
                    <CustomInput
                      name='overallImpression'
                      value={formik.values.overallImpression}
                      isInvalid={
                        formik.errors.overallImpression &&
                        formik.touched.overallImpression
                      }
                      onChange={formik.handleChange}
                      formLabel='How would you describe your overall impression of Litmus Services Limited based on the interview process?' />

                    <CustomInput
                      name='interviewUniqueness'
                      value={formik.values.interviewUniqueness}
                      isInvalid={
                        formik.errors.interviewUniqueness &&
                        formik.touched.interviewUniqueness
                      }
                      onChange={formik.handleChange}
                      formLabel='Is there anything specific that stood out to you about the company during the interview?' />

                    <CustumSelect
                      value={formik.values.likelihoodToProceed}
                      isInvalid={
                        formik.errors.likelihoodToProceed &&
                        formik.touched.likelihoodToProceed
                      }
                      onChange={formik.handleChange}
                      name="likelihoodToProceed"
                      placeholder="Select"
                      formLabel="Based on your interview experience, how likely are you to accept an offer from Litmus Services Limited?"
                      options={likelihoodChoices}
                      label={likelihoodChoices.label}
                    />
                    <CustomTextarea
                      value={formik.values.additionalComments}
                      isInvalid={
                        formik.errors.additionalComments &&
                        formik.touched.additionalComments
                      }
                      onChange={formik.handleChange}
                      name='additionalComments'
                      formLabel='Please share any additional comments or suggestions regarding your interview experience.'
                    />
                    <Button mt={4} colorScheme="teal" type="submit" isLoading={loading}>
                      Submit
                    </Button>
                  </SimpleGrid>

                  {/* ... Other questionnaire fields */}


                </Stack>

              }
            </>
          }
        </Box>

      }
    />
  );
};

export default InterviewFeedbackForm;
