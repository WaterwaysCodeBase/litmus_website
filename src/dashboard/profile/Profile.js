import { Box, Link, Stack, Text } from "@chakra-ui/react";
import DashboardLayout from "../../layout/DashboardLayout";
import DashboardContent from "../../components/DashboardContent";


const Profile = () => {
    const submenu = [
        { id: 1, label: 'Edit Profile', link: '/dashboard/compliance/', content: '', title: 'Add Timesheet' },
        { id: 2, label: 'Update address', link: '/dashboard/compliance/', content: 'Content Page 2', title: 'My Timesheet' },
        
    ];

    return (
        <DashboardLayout>
            <DashboardContent submenu={submenu} />
        </DashboardLayout>
    );
};

export default Profile;
