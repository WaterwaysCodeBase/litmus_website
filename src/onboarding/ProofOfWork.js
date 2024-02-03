"use client";

import { Stack, Box, useToast, Spinner, Text, HStack, Link } from "@chakra-ui/react";

import { OnboardingLayout } from "../layout/OnboardingLayout";
import { CustomInput, CustomTextarea, CustumSelect } from "../components/Input";
import { CustomButton } from "../components/Buttons";

import * as Yup from "yup";

import { API_BASE_URL } from "../components/APIs";
import { useFormik } from "formik";

import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useApiData } from "../components/GetData";
import { LoadingSpinner } from "../components/LoadingSpinner";
import PdfViewer from "../components/PDFViewer";
import { WarningIcon } from "@chakra-ui/icons";



export default function ProofOfWork() {
    const { data: userRTW, loading, fetchData } = useApiData("application/getUserRTW");

    React.useEffect(() => {
        fetchData();
    }, []);
    const {
        data: offerAcceptance,
        loading: loadingOffer,
        fetchData: fetchOffer,
    } = useApiData("onboarding/getOfferAccepted");
    React.useEffect(() => {
        fetchOffer();
    }, []);
    const uid = Cookies.get("uid");

    const toast = useToast();
    const [isLoading, setLoading] = useState();

    const formik = useFormik({
        initialValues: {
            share_code: "",
            dob: "",
            update: "update",
            user_id: uid,
        },
        validationSchema: Yup.object({
            share_code: Yup.string().required("Please enter your Share Code"),
            dob: Yup.string().required("Date of birth is required"),
        }),
        onSubmit: (data) => {
            console.log(data);
            setLoading(true);
            const url = API_BASE_URL + "application/saveRTW";
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
        },
    });



    const [pdfFile, setpdfFile] = useState();
    React.useEffect(() => {
        if (userRTW) {
            setpdfFile(API_BASE_URL + "uploads/" + userRTW?.visa_file || null);
            setLoading(false);
            formik.setValues({
                dob: userRTW?.dob || "",
                share_code: userRTW?.share_code || "",
                user_id: uid,
                update: "update"
            });
        }
    }, ([userRTW]));
    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <OnboardingLayout
            pageTitle="Proof of Right to Work"
            description="We need to confirm you're eligible to work in the UK so we'll use your following details to perform a right to work check."
            mainContent={
                <>
                    <Stack
                        width={['100%', '100%']}
                        direction={{ base: "column", md: "column", sm: "column" }}
                        as={"form"}
                        onSubmit={formik.handleSubmit}
                    >

                        {offerAcceptance?.accept === '1' ?
                            <>
                                <Stack gap={2} direction={["column", "row"]} p={2} bg={'green.100'}>
                                    <Box display={'flex'} flex={1} >
                                        <Text>
                                            <b>Document Type: </b>
                                            {userRTW?.visa_type}
                                        </Text>
                                    </Box>
                                    <Box display={'flex'} flex={1}>
                                        <Text>
                                            <b>Document number: </b>
                                            {userRTW?.visa_number}
                                        </Text>
                                    </Box>
                                </Stack>
                                <Stack gap={2} direction={["column", "row"]} p={2} bg={'green.100'}>
                                    <Box display={'flex'} flex={1} >
                                        <Text>
                                            <b>Document Issue Date: </b>
                                            {userRTW?.visa_issue_date}
                                        </Text>
                                    </Box>
                                    <Box display={'flex'} flex={1}>
                                        <Text>
                                            <b>Document Expiry Date: </b>
                                            {userRTW?.visa_expiry_date}
                                        </Text>
                                    </Box>
                                </Stack>
                                <Stack gap={2} direction={["column", "row"]}>

                                    <CustomInput
                                        popover={
                                            <>
                                                The right to work share code is an online nine-digit alpha-numerical code provided by the UK government to enable non-UK nationals to prove their right to work.
                                                <p></p> If you have a share code, make sure it was generated within the last 3 months. To generate a share code to prove your right to work, click <Link
                                                    color={'blue'} textDecoration={'underline'} href="https://right-to-work.service.gov.uk/rtw-prove/id-question">here</Link>
                                            </>
                                        }
                                        popLabel={"What's my Share Code?"}
                                        formErroMsg={formik.errors.share_code}
                                        value={formik.values.share_code}
                                        isInvalid={
                                            formik.errors.share_code && formik.touched.share_code
                                        }
                                        onChange={formik.handleChange}
                                        formLabel="Enter your share code"
                                        type="text"
                                        placeholder="xxx xxx xxx "
                                        name="share_code"
                                    />
                                    <CustomInput

                                        value={formik.values.dob}
                                        isInvalid={
                                            formik.errors.dob && formik.touched.dob
                                        }
                                        formErroMsg={formik.errors.dob}
                                        onChange={formik.handleChange}
                                        formLabel="Date of Birth"
                                        type="date"
                                        name="dob"
                                    />
                                </Stack>
                                {pdfFile && <PdfViewer pdfUrl={pdfFile} />}

                                <Stack gap={2} direction={["column", "column"]}>
                                    <Box py={5} gap={5} display={'flex'} flexDir={'row'}>
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
                                        <HStack spacing={2} justifySelf={'flex-end'} >
                                            <CustomButton
                                                as={'a'}
                                                // bg={"blue.400"}
                                                colorScheme="yellow"
                                                label="Back"
                                                link="/employment-check/right-to-work"
                                            />                                    <CustomButton
                                                as={'a'}
                                                bg={"blue.400"}
                                                colorScheme="blue"
                                                label="Next"
                                                link="/employment-check/dbs"
                                            />

                                        </HStack>

                                    </Box>
                                </Stack>
                            </>
                            :
                            <Stack width={['100%', '60%']} mx={'auto'} bg={'red.50'} rounded={'lg'} alignItems={'center'} p={'2em'}>
                                <WarningIcon fontSize={'3em'} color={'red'} />
                                <Text color={'red'} textAlign={'center'} fontSize={'15pt'} fontWeight={700} >
                                    Please accept the provisional offfer <Link
                                        color="blue" href="/employment-check/provisional-offer">here</Link> before submitting your Proof of right to work.
                                </Text>

                            </Stack>
                        }





                    </Stack></>
            }
        />
    );
}
