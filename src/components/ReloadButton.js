import React from 'react';
import { FiRefreshCw } from 'react-icons/fi';

const ReloadButton = () => {
    const handleReload = () => {
        window.location.reload();
    };

    return (
        <button onClick={handleReload}>
            <FiRefreshCw />
        </button>
    );
};

export default ReloadButton;
