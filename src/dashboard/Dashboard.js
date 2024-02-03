import React from "react";

import DashboardLayout from "../layout/DashboardLayout";
import {
    Box,
    Heading,
    SimpleGrid,
    Avatar,
    Divider,
    useColorModeValue,
    Stack,
    WrapItem,
    Wrap,
} from '@chakra-ui/react';
import DashboardHeader from "../layout/component/DashboardHeader";
import { StatsCard } from "../layout/component/Assets";
import { BsBatteryCharging } from "react-icons/bs";
import { FiFile } from "react-icons/fi";
import useUserContext from "../components/UserContext";


const Dashboard = () => {

    const [Loading, setisLoading] = React.useState(true);
 const { userDetails, loading, getUsersInfo,user } = useUserContext();
    return (
        <>
            <DashboardLayout            >

                <Stack
                    gap={6}
                    direction={{ base: 'column', md: 'column', sm: 'row' }}>
                    <SimpleGrid
                        columns={{ base: 1, md: 3 }}
                        spacing={{ base: 5, lg: 8 }}
                    >
                        <StatsCard
                            bgColor={'yellow.400'}
                            title={'Profile Strength'}
                            stat={40}
                            icon={<BsBatteryCharging size={'3em'} />}
                        />
                        <StatsCard
                            StatLink="/dashboard/view-all-uploaded-document"
                            bgColor={'green.400'}
                            title={'Uploaded Documnet'}
                            stat={80}
                            icon={<FiFile size={'3em'} />}
                        />
                        <StatsCard
                            StatLink="#"
                            bgColor={'red.400'}
                            title={'Expired Documnet'}
                            stat={80}
                            icon={''}
                        />
                    </SimpleGrid>
                </Stack>

                <Stack align={'center'} gap={6}>
                    <Heading>Timesheet Record</Heading>

                    {/* <Button ml={4} ref={finalRef}>
          I'll receive focus on close
        </Button> */}

                    {/* <TimeSheet /> */}
                </Stack>

            </DashboardLayout>
        </>
    );
};

export default Dashboard;
