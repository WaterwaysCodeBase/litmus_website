"use client";

import {
    Box,
    Divider,

} from "@chakra-ui/react";

import OnboardingFooter from "./component/OnboardingFooter";

import DashboardNav from "./component/DashboardNav";

const DashboardLayout = ({ children }) => {

    return (
        <>
            <Box bg={"#f7f7f7"} py={2} minH={'100vh'} pb={'5em'} gap={5}>
                <DashboardNav />
                <Box pos={'relative'} mt={5} width={'85%'}
                    mx={'auto'}>
                    {children}

                </Box>

                {/* <Das /> */}
            </Box>
        </>
    );
}

export default DashboardLayout