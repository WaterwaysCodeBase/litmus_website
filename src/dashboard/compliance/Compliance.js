import { Box, Link, Stack, Text } from "@chakra-ui/react";
import DashboardLayout from "../../layout/DashboardLayout";
import DashboardHeader from "../../layout/component/DashboardHeader";
import DashboardContent from "../../components/DashboardContent";
import { Referee } from "../../onboarding/Referee";
import { Dbs } from "../../onboarding/Dbs";

const Compliance = () => {
    const submenu = [
        { id: 1, label: 'Proof of Identity', link: '/dashboard/compliance/', content: 'Content Page 1', title: 'Proof of Identity' },
        { id: 2, label: 'Certificates', link: '/dashboard/compliance/', content: 'Content Page 2', title: 'Certifications' },
        { id: 3, label: 'Work History', link: '/dashboard/compliance/', content: 'Content Page 3', title: 'Work History' },
        { id: 4, label: 'Address Details', link: '/dashboard/compliance/', content: 'Content Page 4', title: 'Prove of Address' },
        { id: 6, label: 'Right to Work', link: '/dashboard/compliance/', content: 'Content Page 6', title: 'Right to work' },
        { id: 7, label: 'DBS', link: '/dashboard/compliance/', content: <Dbs />, title: 'DBS' },
        { id: 8, label: 'Referee', link: '/dashboard/compliance/', content: <Referee />, title: 'Referee' },
    ];

    return (
        <DashboardLayout>
            <DashboardContent submenu={submenu} />
        </DashboardLayout>
    );
};

export default Compliance;
