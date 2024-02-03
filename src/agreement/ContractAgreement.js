import React, { useEffect, useRef, useState } from 'react';



import useUserContext from '../components/UserContext';
import AgencyAgreementDoc from './AgreementDoc';
import { OnboardingLayout } from '../layout/OnboardingLayout';
import CommunityCareAgreementDoc from './CommunityCareDoc';
import axios from 'axios';
import jsPDF from "jspdf";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { API_BASE_URL } from "../components/APIs";

import { useApiData } from "../components/GetData";
import { Box, Button, Checkbox, FormErrorMessage, Stack, Text, useDisclosure, useToast } from '@chakra-ui/react';
import Cookies from 'js-cookie';
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



const ContractAgreement = () => {
  const { userDetails } = useUserContext();
  const category = userDetails?.job_category;
  const sector = userDetails?.sector;
  const application_type = userDetails?.application_type;
  const [acknowledged, setAcknowledged] = useState(false)
  const name = userDetails?.fname + ' ' + userDetails?.lname
  const [isLoading, setLoading] = useState();
  const contractTemplateRef = React.useRef(null);
  const uid = Cookies.get("uid");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleGeneratePdf = () => {
    // setGenerating(true);
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
      putOnlyUsedFonts: true,
      compress: true,
      floatPrecision: 'smart', // or "smart", default is 16
    });
    // Adding the fonts.
    // doc.setFont('Verdana', 'normal');


    doc.html(contractTemplateRef.current, {
      async callback(doc) {
        doc.save(userDetails.fname + '_' + userDetails.fname + '_provisional_offer_letter');
        window.location.reload()
      },
      margin: [30, 0, 30, 0],
      autoPaging: 'text',


    },

    );

  };


  const formik = useFormik({
    initialValues: {
      user_id: '',
      signature: '',
      commence_date: '',
      agree: '',
      email: '',
      subject: ''
    },
    validationSchema: Yup.object({
      agree: Yup.boolean()
        .oneOf([true], 'You must accept the terms and conditions').required('You must accept the terms and conditions'),
    }),
    onSubmit: (data) => {
      console.log(data)
      setLoading(true);

      const url = API_BASE_URL + "/offer/finishOfferUpload";
      axios
        .post(url, data)
        .then((response) => {

          if (response.data.status === 200) {
            handleGeneratePdf()
            toast({
              title: "Profile Update",
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
          toast({
            title: "error",
            description: error.message,
            position: "top",
            status: "error",
            isClosable: true,
          });
          setLoading(false);
        });

    }
  })

  useEffect(() => {
    if (userDetails) {

      formik.setValues({
        agree: userDetails?.agree == 1 ? true : false,
        signature: userDetails?.fname + ' ' + userDetails?.lname,
        user_id: Cookies.get('uid'),
        commence_date: currentTimestamp,
        email: userDetails?.email,
        subject: 'Congratulations on Completing Onboarding and Welcome to Litmus Services Limted!'
      });
    }
    setLoading(false);
  }, [userDetails]);
  return (
    <>
      <OnboardingLayout
        pageTitle="Contract Agreement"
        mainContent={
          <Stack
            as={'form'}
            onSubmit={formik.handleSubmit}
            mb={5}
          >
            <Stack
              width={'600px'}
              mx={'auto'} boxShadow={'lg'}
              my={5} bg={'white'}
              ref={contractTemplateRef}
            >

              <AgencyAgreementDoc
                date={formattedDate}
                userDetails={userDetails}
                agree={formik.values.agree}
              />

            </Stack>

            {application_type == '' || null && '<CareOffer />'}
            <Stack width={'600px'} mx={'auto'} spacing={5}>
              {userDetails?.agree === '1' ?
                <Stack justifyContent={'center'} spacing={3}>
                  <Text px={5} textAlign={'center'}>You have agreed to the terms and conditions with {userDetails?.job_title}
                  </Text>
                  <Button
                    isLoading={isLoading}
                    onClick={handleGeneratePdf}
                    width={'300px'}
                    mx={'auto'}
                    loadingText='Generating Document'
                    variant='outline'
                    spinnerPlacement='start'
                    colorScheme='blue'
                  >
                    Download Offer Letter Again
                  </Button>
                  <Button
                    width={'300px'}
                    mx={'auto'}
                    type='submit'
                    as={'a'}
                    href='/dashboard'
                    loadingText='Generating Document'
                    variant='link'
                    spinnerPlacement='start'
                    colorScheme='green'

                  >
                    Proceed to Staff Dashboard
                  </Button>
                </Stack>
                :

                <>
                  <input type='hidden' name='user_id' value={formik.values.user_id} onChange={formik.handleChange} />
                  <input type='hidden' name='commence_date' value={formik.values.commence_date} onChange={formik.handleChange} />
                  <input type='hidden' name='signature' value={formik.values.signature} onChange={formik.handleChange} />
                  <Checkbox
                    size='lg'
                    name="agree"
                    value={formik.values.agree}
                    onChange={
                      formik.handleChange
                    }
                    onSelect={(value) => setAcknowledged(value)}
                    isInvalid={formik.errors.agree && formik.touched.agree}
                  >
                    I accept the provisional offer
                  </Checkbox>
                  <FormErrorMessage>{formik.errors.agree}</FormErrorMessage>
                  <Box>
                    <Button
                      isLoading={isLoading}
                      type='submit'

                      loadingText='Generating Document'
                      variant='outline'
                      spinnerPlacement='start'
                      colorScheme='blue'

                    >
                      Accept & Download Agreement Letter
                    </Button>

                  </Box>
                </>
              }


            </Stack>
          </Stack>
        }
      />
    </>
  )
}



export default ContractAgreement;
