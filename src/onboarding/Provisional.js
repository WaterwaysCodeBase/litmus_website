"use client";

import {
    Stack,

    useToast,

    useDisclosure,

    Button,
    Box,
    Checkbox,
    FormErrorMessage,
    Text,
} from "@chakra-ui/react";

import { OnboardingLayout } from "../layout/OnboardingLayout";

import { CustomButton } from "../components/Buttons";

import React, { useEffect, useState } from "react";

import { oonboading } from "../util/data";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Cookies from "js-cookie";
import useUserContext from "../components/UserContext";
import OfferDoc from "./OfferDoc";
import jsPDF from "jspdf";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { API_BASE_URL } from "../components/APIs";
import axios from "axios";
import { useApiData } from "../components/GetData";

const currentTimestamp = Date.now();
const currentDate = new Date(currentTimestamp);
const formattedDate = currentDate.toLocaleDateString('en-US', {
    month: 'long', // Full month name
    day: 'numeric', // Day of the month
    year: 'numeric', // Full year
});
export default function Provisonal() {
    const {
        data: offerAcceptance,
        loading: loadingOffer,
        fetchData,
    } = useApiData("onboarding/getOfferAccepted");
    useEffect(() => {
        fetchData();
    }, []);
    const [isLoading, setLoading] = useState();
    const [acknowledged, setAcknowledged] = useState(false)
    const [modalContent, setModalContent] = useState([]);
    const contractTemplateRef = React.useRef(null);
    const uid = Cookies.get("uid");
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { userDetails, loading, getUsersInfo, user } = useUserContext();
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
            user_id: Cookies.get('uid'),
            agree: '',
        },
        validationSchema: Yup.object({
            agree: Yup.boolean()
                .oneOf([true], 'You must accept the terms and conditions').required('dd'),
        }),
        onSubmit: (data) => {
            console.log(data);
            setLoading(true);
            const url = API_BASE_URL + "onboarding/saveOfferAcceptance";
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
        if (offerAcceptance) {
            formik.setValues({
                agree: offerAcceptance.accept || "",
            });
        }
        setLoading(false);
    }, [offerAcceptance]);
    return (
        <OnboardingLayout
            pageTitle="Acceptance of Provisional offer"

            mainContent={
                <Stack as={'form'}
                    onSubmit={formik.handleSubmit}>
                    <Stack width={'600px'} mx={'auto'} boxShadow={'lg'} my={5} bg={'white'}

                    >
                        <div ref={contractTemplateRef}>
                            <OfferDoc
                                date={formattedDate}
                                userDetails={userDetails}
                                agree={formik.values.agree}
                            />
                        </div>
                    </Stack>

                    <Stack width={'600px'} mx={'auto'} spacing={5}>
                        {offerAcceptance?.accept === '1' ?
                            <Stack justifyContent={'center'} spacing={3}>
                                <Text px={5} textAlign={'center'}>You have accepted the Provisional Offer of Employment for {userDetails?.job_title}</Text>
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
                            </Stack>
                            :

                            <>
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
                                        Accept & Download Offer Letter
                                    </Button>
                                </Box>
                            </>
                        }


                    </Stack>

                </Stack>
            }
        />
    );
}
