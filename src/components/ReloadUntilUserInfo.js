import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ReloadUntilUserInfo = ({ initialUrl }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');

        if (!userInfo) {
            // If user information is not available in localStorage, reload the page
            window.location.reload();
        } else {
            window.location(initialUrl)
            // User information is available, navigate to the desired route
            // Replace '/desired-route' with the actual route you want to navigate to
        }
    }, []);

    // You can render something or nothing here based on your requirements
    return navigate;
};

export default ReloadUntilUserInfo;
