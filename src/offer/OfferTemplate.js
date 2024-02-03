
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup'
import {
    Box,
    Stack,
    Heading,
    Text,

    Flex,
    Button,
    HStack,
    useToast,
    Icon,
} from '@chakra-ui/react';

import Cookies from 'js-cookie';

import { InfoIcon, WarningIcon } from '@chakra-ui/icons';



import { OnboardingLayout } from '../layout/OnboardingLayout';
import CustumFileUploader from '../components/CustumFileUploader';
import { API_BASE_URL } from '../components/APIs';

import CountdownTimer from '../components/CountdownTimer';

import { useFormik } from 'formik';
import axios from 'axios';
import Contract from './AgencyOfferLetter';
import jsPDF from 'jspdf';

import { CustomInput } from '../components/Input';
import { LoadingSpinner } from '../components/LoadingSpinner';
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

const OfferTemplate = ({ offerType, category }) => {
    const { userDetails, loading, getUsersInfo,user } = useUserContext();
    const [employeeadd, setEmployeeAdd] = useState('');
    const offerCreatedOn = userDetails.date_created
    const [uploadedFileMessage, setUploadedFileMessage] = useState()
    const [loadingGenerator, setGenerating] = useState(false)
    const [acknowledged, setAcknowledged] = useState(false)
    const contractTemplateRef = useRef(null);

    const cand_name = userDetails?.fname?.trim() + ' ' + userDetails?.lname.trim() + ' ' + userDetails?.oname.trim()

    useEffect(() => {
        // Move the employee address calculation inside the useEffect
        if (userDetails.applicant_type == 'International') {
            const address = JSON.parse(userDetails?.international_address);
            setEmployeeAdd(address.house_number + ', ' + address.address_line1 + ', ' + address.town_city + ', ' + address.state + ', ' + address.applicant_location);
        } else {
            setEmployeeAdd(userDetails?.address_line1 + ' ' + userDetails?.town_city + ' ' + userDetails?.county + ', ' + userDetails?.post_code);
        }
    }, [userDetails]);

    const handleGeneratePdf = () => {
        setGenerating(true);
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
                doc.save(userDetails.fname + '_' + userDetails.fname + '_contract_agreement');
                window.location.reload()
            },
            margin: [30, 0, 30, 0],
            autoPaging: 'text',


        },

        );

    };

    const toast = useToast();
    const handleSubmit = async (data) => {
        setGenerating(true);
        try {
            const response = await axios.post(API_BASE_URL + "/offer/finishOfferUpload", data);
            if (response.data.status == 200) {
                handleGeneratePdf();
                toast({
                    title: "Application Feedback",
                    description: response.data.message,
                    position: "top",
                    status: "success",
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Application Feedback",
                    description: response.data.message,
                    position: "top",
                    status: "error",
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error("API call error:", error);
            // Handle error as needed
        } finally {
            setGenerating(false);
        }
    };

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
            handleSubmit(data)

        }
    })
    const targetDate = new Date(userDetails?.date_created);
    addWorkingDays(targetDate, 10);

    const handleSignatureChange = (event) => {
        const { name, value } = event.target;
        formik.handleChange(event);

        if (name == 'signature' && value == cand_name) {
            setAcknowledged(true);
        } else {
            setAcknowledged(false);
        }
    };
    console.log("acknowledged:", acknowledged);
    return (
        <OnboardingLayout
            mainContent={
                <Box
                    width={{ base: 'full', md: '90%' }}
                    mx={'auto'}
                    mb={'2em'}
                    px={'.5em'}
                >
                    {userDetails?.downloaded == 1 && userDetails?.signature !== '' ?
                        <Box mb={'2em'} width={'full'} mx={'auto'} alignItems={'center'} justifyItems={'center'} ali>
                            <Stack p={5} display={'flex'} bg={'green.100'} alignItems={'center'} flexDir={'row'} >
                                <InfoIcon color={'green.600'} fontSize={'1.5em'} />
                                <Text fontSize={'12pt'} >You have signed and downloaded the contract agreement.
                                    <br />
                                    <b>Please upload the downloaded document below</b>
                                </Text>
                            </Stack>
                            <Stack gap={2} >
                                <CustumFileUploader
                                    file_status={userDetails?.offer_letter !== null || '' && true}

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
                                                position={userDetails.job_title}
                                                fname={userDetails?.fname}
                                                employeeCommenceDate={formattedDate}
                                                employeeName={cand_name}
                                                employeeAddress={employeeadd}
                                                agree={formik.values.agree}
                                                signature={formik.values.signature}
                                                offerCreatedOn={offerCreatedOn}
                                                category={category}
                                                sector={offerType}
                                                acknowledged={acknowledged}
                                            />
                                        </div>

                                    </Box>
                                    <Box px={'1em'} width={'600px'} mx={'auto'}>
                                        <Stack width={'500px'}>
                                            <CustomInput
                                                value={formik.values.signature}
                                                isInvalid={formik.errors.signature && formik.touched.signature}
                                                formErroMsg={formik.errors.signature}
                                                onChange={handleSignatureChange}
                                                formLabel={"Enter your Full name to sign this document: " + cand_name}
                                                type="text"
                                                placeholder={"Enter your Full name"}
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
                                                        isLoading={loadingGenerator}
                                                        loadingText='Generating Document'
                                                        variant='outline'
                                                        spinnerPlacement='start'
                                                        colorScheme='blue'

                                                    >
                                                        Accept & Download Agreement
                                                    </Button>

                                                </Box>
                                            ) : null}

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
export default OfferTemplate
