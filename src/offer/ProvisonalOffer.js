import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup'
import {
  Box,
  Stack,
  Heading,
  Text,
  Link,
  Center,
  Flex,
  Button,
  HStack,
  useToast,
} from '@chakra-ui/react';

import Cookies from 'js-cookie';

import { WarningIcon } from '@chakra-ui/icons';


import DynamicDocxGenerator from '../components/DocxGenerator';

import { OnboardingLayout } from '../layout/OnboardingLayout';
import CustumFileUploader from '../components/CustumFileUploader';
import { API_BASE_URL } from '../components/APIs';
import { useApiData } from '../components/GetData';
import CountdownTimer from '../components/CountdownTimer';
import ReloadButton from '../components/ReloadButton';
import { useFormik } from 'formik';
import axios from 'axios';
import Contract from './AgencyOfferLetter';
import jsPDF from 'jspdf';
import ReportTemplate from './AgencyOfferLetter';
import { CustomInput } from '../components/Input';
import { LoadingSpinner } from '../components/LoadingSpinner';
import OfferTemplate from './OfferTemplate';
import useUserContext from '../components/UserContext';

const currentTimestamp = Date.now();
const currentDate = new Date(currentTimestamp);
const formattedDate = currentDate.toLocaleDateString('en-US', {
  month: 'long', // Full month name
  day: 'numeric', // Day of the month
  year: 'numeric', // Full year
});
const addWorkingDays = (date, days) => {
  const currentDate = new Date(date.getTime()); // Ensure date is a Date object

  while (days > 0) {
    currentDate.setDate(currentDate.getDate() + 1);

    // Check if the current day is not a Saturday or Sunday
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      days--;
    }
  }

  return currentDate;
};

const FileUploadLabel = ({ labelHeading, description, download }) => {
  return (
    <Box bg={'gray.50'} py={3} px={3}>
      <Flex gap={{ base: '', md: 5 }} alignItems={'center'} justifyItems={'start'} flexDirection={{ base: 'column', md: 'row' }} >
        <Text fontSize={'18pt'} fontWeight={500}>{labelHeading}</Text>
        {download}
      </Flex>
      <Text>{description}</Text>
    </Box>
  )
}

const FinishUpload = ({ uid, isSubmitEnabled }) => {
  const [loading, setLoading] = useState();
  const toast = useToast()
  const formik = useFormik({
    initialValues: {
      user_id: uid,
    },
    onSubmit: (data) => {
      setLoading(true);
      const url = API_BASE_URL + "/offer/finishOfferUpload";
      axios
        .post(url, data)
        .then((response) => {
          if (response.data.status == 200) {
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
    <Button
      isLoading={loading && true}
      spinnerPlacement='end'
      loadingText='Finishing'
      size={'sm'}
      type="button"
      colorScheme='blue'
      isDisabled={isSubmitEnabled}
      onClick={formik.handleSubmit}
    >
      Finish Upload
    </Button>
  )
}
const ProvisonalOffer = () => {
  const {userDetails } = useUserContext();
  const category = userDetails?.job_category;
  const sector = userDetails?.sector;
  const application_type = userDetails?.application_type;
  if (category == 1) {
    return (
      <>
        {application_type == 'Local' &&
          <OfferTemplate
            offerType={category == 1 && sector == 'Health' ? 'Health' : 'finance'}
            category={category}
          />
        }
        {application_type == 'International' && '<CareOffer />'}
        {application_type == '' || null && '<CareOffer />'}
      </>
    )
  } else if (category == 2) {
    return (
      '<AgencyOffer category={category} sector={sector} />'
    )
  } else {
    // return <Error404 />
  }
}
const CareOffer = ({ sector, category }) => {
  const { userDetails, loading, getUsersInfo,user } = useUserContext();

  const [uploadedFileMessage, setUploadedFileMessage] = useState()
  const [staffCategory, setStaffCategory] = useState(null)
  const [Loading, setLoading] = useState();

  const uid = Cookies.get('uid')

  const [formValues, setFormValues] = useState({
    name: '',
    message: '',
  });


  const offerCreatedOn = userDetails?.date_created ? new Date(userDetails.date_created) : new Date();


  // Format the date as "December 5, 2023"
  const newFormattedDate = addWorkingDays(offerCreatedOn, 10).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long', // Full month name
    day: 'numeric', // Day of the month
    year: 'numeric', // Full year
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const address = JSON.parse(userDetails?.international_address)
  const cand_name = userDetails?.fname + ' ' + userDetails?.lname + ' ' + userDetails?.oname
  const data = {
    size: 21,
    confidential: 'Private and Confidential',
    intro: 'Your Conditional Offer of Employment: ' + userDetails?.job_title,
    para1: "Thank you for attending our interview on as scheduled. We are pleased to confirm your conditional offer of employment as a Community Care Worker, undertaking 40 hours per week. The detail is summarised below:",
    para3: 'Job Title: ' + userDetails?.job_title,
    para4: 'Salary/Hourly rate: £10.79',
    para5: 'Start date: 05/02/2024',
    para6: 'Hours/days per week: 40',
    para7: 'Main Office: Sherbourne House, Humber Avenue, Coventry, West Midlands, England, United Kingdom. CVI 2AQ',
    para8: 'You will be expected to travel to various clients’ premises or other addresses as necessary from time to time. You will not be required to work outside the UK.',
    para9: 'This offer is conditional and subject to the receipt of all signed and requested documents as uploaded on our platform within the next 10 working days. Failure to return completed documentation within the expected timeframe could result in the withdrawal of the conditional offer. The position is also subject to the satisfactory completion of a 6-month probationary period.',
    para10: 'Upon receipt of satisfactory documentation, we shall proceed to issue you a  certificate of sponsorship for your VISA application process and a full contract of employment will be provided to you in due course.',
    para11: 'If you decide to accept this offer, we would be grateful if you would sign this offer letter and return signed copy with the acceptance check-lists provided to confirm your acceptance.',
    para11b: 'Please return the signed copy by no later than the close of business on ' + 'Wednesday 13th December, 2023' + ', at which point the offer will expire.',
    para12: 'As an oversea recruit, we will request you to complete the 15 standards as set out within the Care Certificate via our system supervision upon resumption. ',
    para13: 'On behalf of the Company, we look forward to seeing you joining us soon as wish you every success in your immigration journey. ',
    para14: 'Yours sincerely,',
    para14b: 'Ayo Olowoyeye',
    para14c: 'Registered Manager',
    name: cand_name,
    para15: "Name: " + cand_name,
    declaration: 'I confirm acceptance of the above conditional job offer and that I understand the offer is subject to the stated terms.',
    sign: 'Signature:',
    para16: 'Date:',
    expiry: newFormattedDate,
    address1: address.house_number + ', ' + address.address_line1 + ', ' + address.town_city + ', ' + address.state + ', ' + address.applicant_location + ', ',
    date: formattedDate,
    salutation: 'Dear ' + userDetails.fname


  };


  const targetDate = new Date('2023-12-13T23:59:59');
  const apiEndpoint = 'offer/getOfferData'; // Replace with your actual API endpoint
  const { data: offerData, isLoading, error, fetchData: fetchOfferData } = useApiData(apiEndpoint);
  const [isSubmitEnabled, setSubmitEnabled] = useState(false);
  // Check conditions and update the state accordingly
  const checkConditions = () => {
    setSubmitEnabled(false);
    const condition1 = offerData?.offer_letter;
    const condition2 = offerData?.criminal_record;
    const condition3 = offerData?.tuberculosis;
    const condition4 = offerData?.english_proficiency;
    const condition5 = offerData?.identity;
    const condition6 = offerData?.passport_photo;
    if (condition1 == null && condition2 == null && condition3 == null && condition4 == null && condition5 == null && condition6 == null) {
      setSubmitEnabled(false);
    } else {
      setSubmitEnabled(true);
    }

  };
  useEffect(() => {
    // Example: Fetch data when the component mounts
    fetchOfferData();
    checkConditions()
  }, []); // The empty dependency array ensures the effect runs only != null || ''once on mount



  return (
    <OnboardingLayout
      mainContent={
        <Box width={{ base: 'full', md: '90%' }} mx={'auto'} mb={'2em'} px={'.5em'}>
          {userDetails?.interview == 1 ?
            <Box bg={'blue.100'} width={'full'} py={'2em'} mx={'auto'} alignItems={'center'} justifyItems={'center'}>
              <Heading textAlign={'center'} as="h2" mb={4}>You have submitted a feedback</Heading>
              <Center> <Link fontWeight={600} textColor={'blue'} textDecor={'underline'} textAlign={'center'} href='/interview/schedule'>Go Back</Link></Center>
            </Box>
            :

            <>
              {/* <Heading as="h2" mb={4}>Your Conditional Offer of Employment: Community Care Worker</Heading> */}
              {/* {!userDetails && <LoadingSpinner />} */}



              {userDetails?.status == 400 || userDetails == null ?
                <Box>
                  <Text fontSize={'2em'} color={'red'}><WarningIcon />{' '}{userDetails?.message}</Text>
                </Box>
                :
                <Stack spacing={10} >
                  <Box>
                    <Heading>Recruitment Checklist: {userDetails?.job_title}</Heading>
                    <Box display={'flex'} alignItems={{ base: 'start', md: 'center' }}
                      flexDirection={{ base: 'column', md: 'row' }} gap={1} color={'blue.500'} fontSize={'13pt'} fontWeight={700} py={2}>
                      <CountdownTimer targetDate={targetDate} />
                      <HStack>
                        <FinishUpload uid={uid} isSubmitEnabled={isSubmitEnabled} />
                        <ReloadButton /></HStack>
                    </Box>
                    <Text>

                      Please use this checklist to guide you through what needs to be completed and returned.
                      <br /> <span style={{ color: 'red' }}>
                        Please note that if you knowingly withhold information, provide misleading information or if we find any of the pre-employment checks to be unsatisfactory, we may withdraw your conditional offer of employment.
                        {userDetails.job_category}
                      </span>

                    </Text>
                  </Box>

                  <Stack gap={2} >
                    <CustumFileUploader
                      uid={userDetails.user_id}
                      doc_type={'offer_letter'}
                      file_status={offerData?.offer_letter != null || '' && true}
                      // tag={'Signed Offer Letter'}
                      file_link={API_BASE_URL + 'uploads/offer/' + offerData?.offer_letter}
                      label={<>
                        <FileUploadLabel
                          labelHeading={'Signed Offer Letter'}
                          description={'If you have received your offer letter, We will need you to sign it and upload it here.'}
                          download={
                            <>
                              <Text fontSize={'12pt'} color={'red'}>I have not receive my offer letter? </Text>
                              <DynamicDocxGenerator
                                data={data}
                              />
                            </>
                          }
                        />
                      </>}
                      acceptedFiles={[".pdf"]} // Specify accepted file 
                      onFileUpload={(status) => setUploadedFileMessage(status)}
                    />
                  </Stack>
                  <Stack gap={2} >
                    <CustumFileUploader
                      uid={userDetails.user_id}
                      doc_type={'criminal_record'}
                      // tag={'Criminal Record Certificate'}
                      file_link={API_BASE_URL + 'uploads/offer/' + offerData?.criminal_record}
                      file_status={offerData?.criminal_record != null || '' && true}
                      label={<>
                        <FileUploadLabel
                          labelHeading={'Criminal Record Certificate'}
                          description={'Please upload a valid criminal record certificate issued within the last 3 months.'}
                        />
                      </>}
                      acceptedFiles={[".pdf"]} // Specify accepted file 
                      onFileUpload={(status) => setUploadedFileMessage(status)}
                    />
                  </Stack>

                  <Stack gap={2} >
                    <CustumFileUploader
                      file_status={offerData?.tuberculosis != null || '' && true}
                      uid={userDetails.user_id}
                      doc_type={'tuberculosis'}
                      // tag={'Proof of Tuberculosis Test'}
                      file_link={API_BASE_URL + 'uploads/offer/' + offerData?.tuberculosis}
                      label={<>
                        <FileUploadLabel
                          labelHeading={'Proof of Tuberculosis Test'}
                          description={'Please upload a copy of a Tuberculosis test issued within the last 6 months'}
                        />
                      </>}
                      acceptedFiles={[".pdf"]} // Specify accepted file 
                      onFileUpload={(status) => setUploadedFileMessage(status)}
                    />
                  </Stack>
                  <Stack gap={2} >
                    <CustumFileUploader
                      file_status={offerData?.english_proficiency != null || '' && true}
                      uid={userDetails.user_id}
                      doc_type={'english_proficiency'}
                      // tag={'Proof of English Language Proficiency'}
                      file_link={API_BASE_URL + 'uploads/offer/' + offerData?.english_proficiency}
                      label={<>
                        <FileUploadLabel
                          labelHeading={'Proof of English Language Proficiency'}
                          description={'Please upload an evidence that you can read, write, speak and understand English language to at least level B1 on the Common European Framework of Reference for Languages (CEFR) scale as required by UK VISAS and Immigration. '}
                        />
                      </>}
                      acceptedFiles={[".pdf"]} // Specify accepted file 
                      onFileUpload={(status) => setUploadedFileMessage(status)}
                    />
                  </Stack>



                  <Stack gap={2} >
                    <CustumFileUploader
                      file_status={offerData?.identity != null || '' && true}
                      uid={userDetails.user_id}
                      doc_type={'identity'}
                      // tag={'Additional Proof of Identity Document'}
                      file_link={API_BASE_URL + 'uploads/offer/' + offerData?.identity}
                      label={<>
                        <FileUploadLabel
                          labelHeading={'Additional Proof of Identity Document'}
                          description={'any other two additional items of ID to include your International Passport.'}
                        />
                      </>}
                      acceptedFiles={[".pdf"]} // Specify accepted file formats
                      onFileUpload={(status) => setUploadedFileMessage(status)}
                    />
                  </Stack>


                  <Stack gap={2} >
                    <CustumFileUploader
                      file_status={offerData?.passport_photo != null || '' && true}
                      uid={userDetails.user_id}
                      doc_type={'passport_photo'}
                      // tag={'ID Badge Photo'}
                      file_link={API_BASE_URL + 'uploads/offer/' + offerData?.passport_photo}
                      label={<>
                        <FileUploadLabel
                          labelHeading={'ID Badge Photo'}
                          description={'Please upload a suitable photo for your ID badge. The photo should be a clear head & shoulder picture against a plain background, not a selfie and attached in .bmp .jpg or .gif format. (This should look like a photo you would use for a passport)'}
                        />
                      </>}
                      acceptedFiles={[".jpg", ".jpeg", ".png"]} // Specify accepted file formats
                      onFileUpload={(status) => setUploadedFileMessage(status)}
                    />
                  </Stack>
                </Stack>

              }
            </>
          }
        </Box>

      }
    />
  );
};

const AgencyOffer = ({ category, sector }) => {
  const [acknowledged, setAcknowledged] = useState(false)
  const { userDetails, loading, getUsersInfo,user } = useUserContext();
  const offerCreatedOn = userDetails.date_created
  const [uploadedFileMessage, setUploadedFileMessage] = useState()
  const [Loading, setGenerating] = useState(false)
  const contractTemplateRef = useRef(null);
  const address = userDetails.international_address && JSON.parse(userDetails?.international_address)
  const cand_name = userDetails?.fname + ' ' + userDetails?.lname + ' ' + userDetails?.oname;
  const employeeadd = address.house_number + ', ' + address.address_line1 + ', ' + address.town_city + ', ' + address.state + ', ' + address.applicant_location;
  const handleGeneratePdf = () => {
    setGenerating(true);
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',

    });
    // Adding the fonts.
    // doc.setFont('Verdana', 'normal');


    doc.html(contractTemplateRef.current, {
      async callback(doc) {
        doc.save(userDetails.fname + '_' + userDetails.fname + '_contract_agreement');
        window.location.reload()
      },
      margin: [40, 0, 30, 0],

    },

    );

  };
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      user_id: Cookies.get('uid'),
      signature: '',
      agree: '',
      commence_date: currentTimestamp
    },
    validationSchema: Yup.object({
      signature: Yup.string().required('Please sign the document'),
      agree: Yup.string().oneOf(['I agree'], 'Please type "I agree" to agree to the terms').required('Please agree to the terms'),
    }),
    onSubmit: (data) => {
      setGenerating(true);
      console.log(data)

      const url = API_BASE_URL + "/offer/finishOfferUpload";
      axios
        .post(url, data)
        .then((response) => {
          if (response.data.status == 200) {
            handleGeneratePdf()
            toast({
              title: "Application Feedback",
              description: response.data.message,
              position: "top",
              status: "success",
              isClosable: true,
            });

            setGenerating(false);
            // navigate('/onboarding/identity');

          } else {
            toast({
              title: "Application Feedback",
              description: response.data.message,
              position: "top",
              status: "error",
              isClosable: true,

            });
            setGenerating(false);
          }

        })

        .catch((error) => {

        });


    }
  })
  const handleSignatureChange = (event) => {
    const { name, value } = event.target;
    formik.handleChange(event);

    if (name === 'signature' && value === cand_name) {
      setAcknowledged(true);
    } else {
      setAcknowledged(false);
    }
  };
  const targetDate = new Date(userDetails?.date_created);
  addWorkingDays(targetDate, 10);
  return (
    <OnboardingLayout
      mainContent={
        <Box width={{ base: 'full', md: '90%' }} mx={'auto'} mb={'2em'} px={'.5em'}>
          {userDetails?.downloaded == 1 && userDetails?.signature != '' ?
            <Box mb={'2em'} width={'full'} mx={'auto'} alignItems={'center'} justifyItems={'center'}>
              <Heading bg={'blue.100'} py={'1em'} fontSize={'21pt'} px={'1em'} mb={4}>You have signed and downloaded the contract agreement. Please upload the downloaded document below</Heading>
              <Stack gap={2} >
                <CustumFileUploader
                  file_status={userDetails?.offer_letter != null || '' && true}
                  uid={userDetails.user_id}
                  doc_type={'offer_letter'}
                  // tag={'ID Badge Photo'}
                  file_link={API_BASE_URL + 'uploads/offer/' + userDetails?.passport_photo}

                  label={<>
                    <FileUploadLabel
                      labelHeading={'Contract agreement Document'}
                      description={'Kindly upload the Contract agreement you previously downloaded here'}
                    />
                  </>}
                  acceptedFiles={[".jpg", ".jpeg", ".png"]} // Specify accepted file formats
                  onFileUpload={(status) => setUploadedFileMessage(status)}
                />
              </Stack>
            </Box>
            :
            <>
              {!userDetails && <LoadingSpinner />}
              <Box width={'70%'} mx={'auto'} mb={'2em'}>
                <Heading>Recruitment Checklist: {userDetails?.job_title}</Heading>
                <Box display={'flex'} alignItems={{ base: 'start', md: 'center' }}
                  flexDirection={{ base: 'column', md: 'row' }} gap={1} color={'blue.500'} fontSize={'13pt'} fontWeight={700} py={2}>
                  <CountdownTimer targetDate={targetDate} />
                  <HStack>
                  </HStack>
                </Box>
                <Text fontSize={'12pt'} fontWeight={'bold'}>
                  <span style={{ color: 'red' }}>
                    Please read the agreement carefully before you sign and download it.</span>
                  <br /> <span style={{ color: '#3182ce' }}>
                    Please note that you can only sign and download this document once. and fterwards, you need to upload the signed document.
                  </span>

                </Text>
              </Box>



              {userDetails?.status == 400 || userDetails == null ?
                <Box>
                  <Text fontSize={'2em'} color={'red'}><WarningIcon />{' '}{userDetails?.message}</Text>
                </Box>
                :
                <Stack as={'form'} onSubmit={formik.handleSubmit} spacing={10} pb={'5em'} align={'start'} >
                  <Box width={'600px'} mx={'auto'} boxShadow={'lg'} border={'1px #ccc solid'} >
                    <div ref={contractTemplateRef}>
                      <Contract
                        employeeCommenceDate={formattedDate}
                        employeeName={cand_name}
                        employeeAddress={employeeadd}
                        agree={formik.values.agree}
                        signature={formik.values.signature}
                        offerCreatedOn={offerCreatedOn}
                        category={category}
                        sector={sector}
                      />
                    </div>

                  </Box>
                  <Box px={'1em'} width={'600px'} mx={'auto'}>
                    <Stack width={'400px'}>
                      <CustomInput
                        value={formik.values.signature}
                        isInvalid={formik.errors.signature && formik.touched.signature}
                        formErroMsg={formik.errors.signature}
                        onChange={handleSignatureChange}
                        formLabel="Input your full name to sign this document"
                        type="text"
                        placeholder="Enter your Full name"
                        name="signature"
                      />
                      <CustomInput
                        value={formik.values.agree}
                        isInvalid={formik.errors.agree && formik.touched.agree}
                        formErroMsg={formik.errors.agree}
                        onChange={formik.handleChange}
                        formLabel='To agree to the terms of this contract, type "I agree"'
                        type="text"
                        placeholder="Type 'I Agree'"
                        name="agree"
                      />

                      {acknowledged ? (
                        <Box >

                          <Button
                            type='submit'
                            isLoading={loading}
                            loadingText='Generating Document'
                            variant='outline'
                            spinnerPlacement='start'
                            colorScheme='blue'

                          >
                            Accept & Download Agreement
                          </Button>

                        </Box>
                      ) : null}
                      {acknowledged}
                    </Stack>
                  </Box>

                </Stack>

              }
            </>
          }
        </Box>

      }
    />
  );
};

export default ProvisonalOffer;
