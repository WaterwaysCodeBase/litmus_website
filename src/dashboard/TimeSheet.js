import DashboardContent from "../components/DashboardContent";
import DashboardLayout from "../layout/DashboardLayout";

const Timesheet = () => {
    const submenu = [
        { id: 1, label: 'Add Timesheet', link: '/dashboard/compliance/', content: '', title: 'Add Timesheet' },
        { id: 2, label: 'My Timesheet', link: '/dashboard/compliance/', content: 'Content Page 2', title: 'My Timesheet' },
        
    ];

    return (
        <DashboardLayout>
            <DashboardContent submenu={submenu} />
        </DashboardLayout>
    );
};

export default Timesheet;
