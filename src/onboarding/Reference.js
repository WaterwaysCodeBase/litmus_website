import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import {
    Box,
    Button,
    Stack,
    Heading,
    Text,
    SimpleGrid,
    useToast,
    Link,
    Center,
    Image
} from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../components/APIs';
import GeneralLayout from '../layout/GeneralLayout';
import { CustomInput, CustomTextarea, CustumSelect } from '../components/Input';
import * as Yup from 'yup'
import { LoadingSpinner } from '../components/LoadingSpinner';
import { WarningIcon } from '@chakra-ui/icons';
import { assessment, refCandidatePos, refPos } from '../util/data';
import { useCustumApi } from '../components/GetData';
import Footer from '../layout/component/Footer';
import { Logo } from '../components/Logo';

const Reference = () => {
    const { token } = useParams();
    const [isLoading, setLoading] = React.useState(false)

    const { data: refereeInfo, loading, fetchData } = useCustumApi("onboarding/getRefereeInfo");
    // const [RefResponded, setIsRefResponded] = React.useState(refereeInfo?.isRefResponded.toString())
    React.useEffect(() => {
        const data = {
            ref_token: token,
        }
        fetchData(data);

    }, []);
    const toast = useToast()
    // Formik configuration
    const formik = useFormik({
        initialValues: {
            organisation: "",
            ref_position: "",
            phone_code: "",
            ref_org_phone: "",
            organisation_email: "",
            ref_candidate_position: "",
            ref_other_position: "",
            start_from: "",
            till: "",
            why_leave_employment: "",
            employ_again: "",
            physical_illness: "",
            criminal_record: "",
            ref_email: "",
            candidate_communication: "",
            candidate_punctuality: "",
            candidate_conduct: "",
            candidate_reliability: "",
            candidate_suitability: "",
            ref_other_comment: "",
            ref_token: token
        },
        validationSchema: Yup.object({
            organisation: Yup.string().required("This field is required"),
            ref_position: Yup.string().required("This field is required"),
            ref_org_phone: Yup.string().required("This field is required"),
            organisation_email: Yup.string().required("This field is required"),
            ref_candidate_position: Yup.string().required("This field is required"),
            // ref_other_position: Yup.string().required("This field is required"),
            start_from: Yup.string().required("This field is required"),
            till: Yup.string().required("This field is required"),
            why_leave_employment: Yup.string().required("This field is required"),
            employ_again: Yup.string().required("This field is required"),
            physical_illness: Yup.string().required("This field is required"),
            criminal_record: Yup.string().required("This field is required"),
            candidate_communication: Yup.string().required("This field is required"),
            candidate_punctuality: Yup.string().required("This field is required"),
            candidate_conduct: Yup.string().required("This field is required"),
            candidate_reliability: Yup.string().required("This field is required"),
            candidate_suitability: Yup.string().required("This field is required"),

        }),
        onSubmit: (data) => {
            setLoading(true);
            console.log(data)
            const url = API_BASE_URL + "onboarding/saveRefereeResponse";
            axios
                .post(url, data)
                .then((response) => {
                    if (response.data.status === 200) {
                        toast({
                            title: "Profile Update",
                            description: response.data.message,
                            position: "top",
                            status: "success",
                            isClosable: true,
                        });
                        window.location.reload();

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
        },
    });

    // if (!applicantData) {
    //   return <div>Loading...</div>;
    // }
    const { avater, isRefResponded } = refereeInfo || ''
    return (

        <>
      
            <Stack spacing={3} mt={'1em'} width={{ base: 'full', md: '3xl' }} mx={'auto'} px={'.5em'}>
                   <Center justifySelf={'center'} py={5}> <Logo  height={"50px"} /></Center>
                {isRefResponded === 'true' ?
                    <Box bg={'blue.100'} width={'full'} py={'2em'} mx={'auto'} alignItems={'center'} justifyItems={'center'}>
                        <Heading textAlign={'center'} as="h2" mb={4}>Thank you, You have submitted a response onbehalf of {refereeInfo?.fname + ' ' + refereeInfo?.lname}</Heading>
                        <Center> <Link fontWeight={600} textColor={'blue'} textDecor={'underline'} textAlign={'center'} href='/'> Home</Link></Center>
                    </Box>
                    :

                    <>

                        {loading ? <LoadingSpinner /> :
                            <>
                                {!refereeInfo ?
                                    <>
                                        <Text color={'red'} mb={4}> Unrecognized token
                                        </Text>
                                    </>
                                    :
                                    <>
                                        <Heading mb={4}> Litmus Services Limited Reference Request Questionnaire for: {refereeInfo?.fname + ' ' + refereeInfo?.lname}</Heading>
                                        <Text color={'red'}>The named person is being considered for the position within our company and has indicated that you would be willing to provide a reference. I should therefore be most grateful if you would fill in and submit the Reference Form.<br />
                                            This reference has been generated using MPPS secure uniquely identifiable online referencing tracking system. All references have full traceability via the encrypted referencing system</Text>
                                        <Box>
                                            <Text fontSize={'2em'} color={'red'}>{refereeInfo?.message}</Text>
                                        </Box>
                                        <Heading>Candidate Information</Heading>
                                        <Stack as={'form'} onSubmit={formik.handleSubmit}>
                                            {/* Personal Information */}
                                            <Stack gap={2} direction={["column", "row"]} alignItems={'center'}>
                                                <Box flexGrow={1} gap={3}>
                                                    <CustomInput value={refereeInfo?.fname + ' ' + refereeInfo?.lname} disabled={'disabled'} formLabel='Full name' />
                                                    <CustomInput value={refereeInfo?.email} disabled={'disabled'} formLabel='Email' />
                                                    <CustomInput value={refereeInfo?.phone_number} disabled={'disabled'} formLabel='Phone Number' />
                                                    <CustomInput value={refereeInfo?.job_title} disabled={'disabled'} formLabel='Possition Applied for' />
                                                </Box>
                                                <Box flexGrow={0} alignContent={'center'}>

                                                    <Image h={250} w={250} src={avater ? avater : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} />
                                                </Box>
                                            </Stack>

                                            <Heading>Referee Details</Heading>
                                            {/* Questionnaire */}
                                            <SimpleGrid gap={'1em'} columns={1} direction={["column", "row"]}>
                                                <CustomInput
                                                    disabled={'disabled'}
                                                    value={refereeInfo?.ref_fname + " " + refereeInfo?.ref_lname}
                                                    formLabel='Referee Name'
                                                />
                                                <CustomInput
                                                    value={formik.values.organisation}
                                                    isInvalid={
                                                        formik.errors.organisation &&
                                                        formik.touched.organisation
                                                    }
                                                    onChange={formik.handleChange}
                                                    name="organisation"
                                                    placeholder="Name of Organisation"
                                                    formLabel="Name of Organisation"
                                                />
                                                <CustumSelect
                                                    value={formik.values.ref_position}
                                                    isInvalid={
                                                        formik.errors.ref_position &&
                                                        formik.touched.ref_position
                                                    }
                                                    onChange={formik.handleChange}
                                                    name="ref_position"
                                                    placeholder="Select"
                                                    formLabel="Position Held"
                                                    options={refPos}
                                                    label={refPos.label}
                                                />
                                                <Heading>General Information</Heading>
                                                <CustomInput
                                                    value={formik.values.ref_org_phone}
                                                    isInvalid={
                                                        formik.errors.ref_org_phone &&
                                                        formik.touched.ref_org_phone
                                                    }
                                                    onChange={formik.handleChange}
                                                    name="ref_org_phone"
                                                    placeholder="Contact Phone Number"
                                                    formLabel="Contact Phone Number"
                                                />
                                                <CustomInput
                                                    value={formik.values.organisation_email}
                                                    isInvalid={
                                                        formik.errors.organisation_email &&
                                                        formik.touched.organisation_email
                                                    }
                                                    onChange={formik.handleChange}
                                                    name="organisation_email"
                                                    placeholder="example@comapanyname.com"
                                                    formLabel="Organisation Email"
                                                />
                                                <CustomInput
                                                    value={formik.values.ref_candidate_position}
                                                    isInvalid={
                                                        formik.errors.ref_candidate_position &&
                                                        formik.touched.ref_candidate_position
                                                    }
                                                    formErroMsg={formik.errors.ref_candidate_position}
                                                    onChange={formik.handleChange}
                                                    name="ref_candidate_position"
                                                    placeholder="Enter the candidate Position"
                                                    formLabel="What was the applicant’s position?"
                                                />
                                                {/* <CustumSelect
                                                value={formik.values.ref_candidate_position}
                                                isInvalid={
                                                    formik.errors.ref_candidate_position &&
                                                    formik.touched.ref_candidate_position
                                                }
                                                formErroMsg={formik.errors.ref_candidate_position}
                                                onChange={formik.handleChange}
                                                name="ref_candidate_position"
                                                placeholder="Select an option"
                                                formLabel="What was the applicant’s position?"
                                                options={refCandidatePos}
                                                label={refCandidatePos.label}
                                            /> */}
                                                <Text>How long have you known the applicant or work with your organization</Text>
                                                <Stack direction={['column', 'row']}>
                                                    <CustomInput
                                                        type={'month'}
                                                        value={formik.values.start_from}
                                                        isInvalid={
                                                            formik.errors.start_from &&
                                                            formik.touched.start_from
                                                        }
                                                        onChange={formik.handleChange}
                                                        name="start_from"
                                                        placeholder="From"
                                                        formLabel="From (Month and Year)"
                                                    />
                                                    <CustomInput
                                                        type={'month'}
                                                        value={formik.values.till}
                                                        isInvalid={
                                                            formik.errors.till &&
                                                            formik.touched.till
                                                        }
                                                        onChange={formik.handleChange}
                                                        name="till"
                                                        placeholder="From"
                                                        formLabel="To (Month and Year)"
                                                    />
                                                </Stack>
                                                <CustomInput
                                                    type={'text'}
                                                    value={formik.values.why_leave_employment}
                                                    isInvalid={
                                                        formik.errors.why_leave_employment &&
                                                        formik.touched.why_leave_employment
                                                    }
                                                    onChange={formik.handleChange}
                                                    name="why_leave_employment"
                                                    placeholder="Reason for leaving employment, if applicable?"
                                                    formLabel="Reason for leaving employment, if applicable?"
                                                />

                                                <CustomInput
                                                    type={'text'}
                                                    value={formik.values.employ_again}
                                                    isInvalid={
                                                        formik.errors.employ_again &&
                                                        formik.touched.employ_again
                                                    }
                                                    onChange={formik.handleChange}
                                                    name="employ_again"
                                                    placeholder="Enter a response"
                                                    formLabel="Would you employ the candidate again? If the answer is No, please clarify why?"
                                                />
                                                <CustomInput
                                                    type={'text'}
                                                    value={formik.values.physical_illness}
                                                    isInvalid={
                                                        formik.errors.physical_illness &&
                                                        formik.touched.physical_illness
                                                    }
                                                    formErroMsg={formik.errors.physical_illness}
                                                    onChange={formik.handleChange}
                                                    name="physical_illness"
                                                    placeholder="Enter a response"
                                                    formLabel="Are you aware of any physical or mental illnesses that may affect performance? If
                                                    the answer is Yes, please give details."
                                                />
                                                <CustomInput
                                                    type={'text'}
                                                    value={formik.values.criminal_record}
                                                    isInvalid={
                                                        formik.errors.criminal_record &&
                                                        formik.touched.criminal_record
                                                    }
                                                    onChange={formik.handleChange}
                                                    formErroMsg={formik.errors.criminal_record}
                                                    name="criminal_record"
                                                    placeholder="Enter a response"
                                                    formLabel="Are you aware of any criminal convictions the candidate has?
                                                    If the answer is Yes, please give details"
                                                />
                                                <Heading>Assessment</Heading>
                                                <CustumSelect
                                                    value={formik.values.candidate_communication}
                                                    isInvalid={
                                                        formik.errors.candidate_communication &&
                                                        formik.touched.candidate_communication
                                                    }
                                                    formErroMsg={formik.errors.candidate_communication}

                                                    onChange={formik.handleChange}
                                                    name="candidate_communication"
                                                    placeholder="Select an option"
                                                    formLabel="Assess candidate’s Punctuality and communication?"
                                                    options={assessment}
                                                    label={assessment.label}
                                                />
                                                <CustumSelect
                                                    value={formik.values.candidate_punctuality}
                                                    isInvalid={
                                                        formik.errors.candidate_punctuality &&
                                                        formik.touched.candidate_punctuality
                                                    }
                                                    formErroMsg={formik.errors.candidate_punctuality}
                                                    onChange={formik.handleChange}
                                                    name="candidate_punctuality"
                                                    placeholder="Select an option"
                                                    formLabel="Assess candidate’s Punctuality?"
                                                    options={assessment}
                                                    label={assessment.label}
                                                />
                                                <CustumSelect
                                                    value={formik.values.candidate_conduct}
                                                    isInvalid={
                                                        formik.errors.candidate_conduct &&
                                                        formik.touched.candidate_conduct
                                                    }
                                                    formErroMsg={formik.errors.candidate_conduct}
                                                    onChange={formik.handleChange}
                                                    name="candidate_conduct"
                                                    placeholder="Select an option"
                                                    formLabel="Assess candidate’s Professionalism/conduct?"
                                                    options={assessment}
                                                    label={assessment.label}
                                                />
                                                <CustumSelect
                                                    value={formik.values.candidate_reliability}
                                                    isInvalid={
                                                        formik.errors.candidate_reliability &&
                                                        formik.touched.candidate_reliability
                                                    }
                                                    formErroMsg={formik.errors.candidate_reliability}
                                                    onChange={formik.handleChange}
                                                    name="candidate_reliability"
                                                    placeholder="Select an option"
                                                    formLabel="Assess candidate’s Reliability/timekeeping?"
                                                    options={assessment}
                                                    label={assessment.label}
                                                />
                                                <CustumSelect
                                                    value={formik.values.candidate_suitability}
                                                    isInvalid={
                                                        formik.errors.candidate_suitability &&
                                                        formik.touched.candidate_suitability
                                                    }
                                                    formErroMsg={formik.errors.candidate_suitability}
                                                    onChange={formik.handleChange}
                                                    name="candidate_suitability"
                                                    placeholder="Select an option"
                                                    formLabel="Assess candidate’s Job Suitability?"
                                                    options={assessment}
                                                    label={assessment.label}
                                                />
                                                <CustomTextarea
                                                    value={formik.values.ref_other_comment}
                                                    isInvalid={
                                                        formik.errors.ref_other_comment &&
                                                        formik.touched.ref_other_comment
                                                    }
                                                    formErroMsg={formik.errors.ref_other_comment}
                                                    onChange={formik.handleChange}
                                                    name='ref_other_comment'
                                                    formLabel='Any other comments:'
                                                />
                                                <Button mt={4} colorScheme="teal" type="submit">
                                                    Submit
                                                </Button>
                                            </SimpleGrid>

                                            {/* ... Other questionnaire fields */}


                                        </Stack>
                                    </>
                                }
                            </>
                        }







                    </>
                }
            </Stack>
            <Footer />
        </>
    )
}

export default Reference;
