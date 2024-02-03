import React from 'react';

const AddWorkingDays = ({ baseDate, numberOfDays }) => {
    const addWorkingDays = (date, days) => {
        let currentDate = new Date(date.getTime());

        while (days > 0) {
            currentDate.setDate(currentDate.getDate() + 1);

            // Check if the current day is not a Saturday or Sunday
            if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
                days--;
            }
        }

        return currentDate;
    };

    // Format the date as "December 5, 2023"
    const formattedDate = addWorkingDays(baseDate, numberOfDays).toLocaleDateString('en-US', {
        weekday: 'long', 
        month: 'long', // Full month name
        day: 'numeric', // Day of the month
        year: 'numeric', // Full year
    });

    return (
        <>
            <span>{formattedDate}</span>
        </>
    );
};

// Example usage:
const PlusWorkingDays = () => {
    const currentDate = new Date(); // Use the current date as a base
    const numberOfDaysToAdd = 10;

    return (
        <div>
            {/* <p>Base Date: {currentDate.toLocaleDateString('en-US')}</p> */}
            <AddWorkingDays baseDate={currentDate} numberOfDays={numberOfDaysToAdd} />
        </div>
    );
};

export default PlusWorkingDays;
