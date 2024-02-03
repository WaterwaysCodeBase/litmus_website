"use client";

import { Stack, Box, useToast, Spinner } from "@chakra-ui/react";

import { OnboardingLayout } from "../layout/OnboardingLayout";
import { CustomInput, CustomTextarea, CustumSelect } from "../components/Input";
import { CustomButton } from "../components/Buttons";

import * as Yup from "yup";

import { API_BASE_URL } from "../components/APIs";
import { useFormik } from "formik";

import { useEffect, useState } from "react";
import axios from "axios";

import { LoadingSpinner } from "../components/LoadingSpinner";
import SubmitApplication from "./SubmitApplication";


import PhoneNumberInput from "../components/PhoneNumberInput";
import { nokRelationship } from "../util/data";
import Cookies from "js-cookie";
import { useApiData } from "../components/GetData";


export default function Nok() {

    const uid = Cookies.get("uid");
    const toast = useToast();
    const [isLoading, setLoading] = useState();
    const {
        data: NOK,
        loading,
        fetchData,
    } = useApiData("application/getUserNOK");
    useEffect(() => {
        fetchData();
    }, []);
    const formik = useFormik({
        initialValues: {
            nok_address: "",
            nok_fname: "",
            nok_lname: "",
            nok_relationship: "",
            nok_mobile: "",
            nok_postcode: "",
            nok_email: "",
            user_id: uid,
        },
        validationSchema: Yup.object({
            nok_fname: Yup.string().required("Please enter your Address"),
            nok_lname: Yup.string().required("Please enter your Address"),
            nok_email: Yup.string().required("This Field is required").email('Enter a valid email address'),
            nok_address: Yup.string().required("This Field is required"),
            nok_relationship: Yup.string().required("This Field is required"),
            nok_mobile: Yup.string().required("This Field is required"),
            nok_postcode: Yup.string().required("This Field is required"),
        }),
        onSubmit: (data) => {
            console.log(data);
            setLoading(true);
            const url = API_BASE_URL + "application/saveNOK.php";
            axios
                .post(url, data)
                .then((response) => {
                    if (response.data.status === "200") {
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


    // if (loading) {
    //     return <LoadingSpinner />;
    // }


    useEffect(() => {
        if (NOK) {
                        formik.setValues({
                nok_address: NOK.nok_address || "",
                nok_fname: NOK.nok_fname || "",
                nok_lname: NOK.nok_lname || "",
                nok_relationship: NOK.nok_relationship || "",
                nok_mobile: NOK.nok_mobile || "",
                nok_postcode: NOK.nok_postcode || "",
                nok_email: NOK.nok_email || "",
            });
          }

    }, [NOK]);
    return (
        <OnboardingLayout
            pageTitle="ADD NEXT OF KIN DETAILS"
            //   description="Description"
            mainContent={
                <>

                    <Stack
                        direction={{ base: "column", md: "column", sm: "column" }}
                        as={"form"}
                        onSubmit={formik.handleSubmit}
                    >

                        <Stack gap={2} direction={["column", "row"]}>

                            <CustomInput
                                value={formik.values.nok_fname}
                                isInvalid={
                                    formik.errors.nok_fname && formik.touched.nok_fname
                                }
                                onChange={formik.handleChange}
                                formLabel="Next of Kin First Name"
                                type="text"
                                placeholder="Enter Next of Kin First Name"
                                name="nok_fname"
                            />
                            <CustomInput
                                value={formik.values.nok_lname}
                                isInvalid={
                                    formik.errors.nok_lname && formik.touched.nok_lname
                                }
                                onChange={formik.handleChange}
                                formLabel="Next of Kin Last Name"
                                type="text"
                                placeholder="Enter Next of Kin Last Name"
                                name="nok_lname"
                            />
                        </Stack>
                        <Stack gap={2} direction={["column", "row"]}>
                            <CustomInput
                                value={formik.values.nok_email}
                                isInvalid={
                                    formik.errors.nok_email && formik.touched.nok_email
                                }
                                onChange={formik.handleChange}
                                formLabel="Next of Kin Email"
                                type="text"
                                placeholder="Enter Next of Kin Email"
                                name="nok_email"
                            />

                            <PhoneNumberInput value={formik.values.nok_mobile}
                                isInvalid={
                                    formik.errors.nok_mobile && formik.touched.nok_mobile
                                }
                                onChange={(value) => formik.setFieldValue('nok_mobile', value)}
                                formLabel="Next of Kin Mobile number"
                                type="text"
                                placeholder="Enter Next of Kin Mobile number"
                                name="nok_mobile" />

                        </Stack>
                        <Stack gap={2} direction={["column", "row"]}>
                            <CustomTextarea
                                value={formik.values.nok_address}
                                isInvalid={
                                    formik.errors.nok_address && formik.touched.nok_address
                                }
                                onChange={formik.handleChange}
                                formLabel="Enter Next of Kin Address "
                                type="text"
                                placeholder="Enter Next of Kin Address "
                                name="nok_address"
                                row="3"
                            />
                        </Stack>

                        <Stack gap={2} direction={["column", "row"]}>
                            <CustomInput
                                value={formik.values.nok_postcode}
                                isInvalid={
                                    formik.errors.nok_postcode && formik.touched.nok_postcode
                                }
                                onChange={formik.handleChange}
                                formLabel="Next of Kin Post Code"
                                type="text"
                                placeholder="Enter Next of Kin Post Code"
                                name="nok_postcode"
                            />
                            <CustumSelect
                                value={formik.values.nok_relationship}
                                isInvalid={formik.errors.nok_relationship && formik.touched.nok_relationship}
                                onChange={formik.handleChange}
                                name="nok_relationship"
                                placeholder="Select Relationship"
                                formLabel="Relationship with Next of Kin"
                                options={nokRelationship}
                                label={nokRelationship.label}
                            />
                        </Stack>

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
                              
                                <CustomButton
                                    as={'a'}
                                    colorScheme="yellow"
                                    label="Back"
                                    link="/application/right-to-work"
                                />
                                  <Box justifySelf={'center'} gap={'5'} >
                                    <CustomButton
                                        as={'a'}
                                        bg={"blue.400"}
                                        colorScheme="blue"
                                        label="Next"
                                        link="/application/mobility-status"
                                    />

                                </Box>
                            </Box>
                        </Stack>
                    </Stack></>
            }
        />
    );
}
