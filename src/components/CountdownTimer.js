import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
    const calculateTimeRemaining = () => {
        const now = new Date().getTime();
        const targetTime = new Date(targetDate).getTime();
        const timeRemaining = targetTime - now;

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    };

    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div>
            {/* <p>Countdown to {targetDate.toLocaleString()}:</p> */}
            <p>{timeRemaining.days}D-{timeRemaining.hours}H-{timeRemaining.minutes}M-{timeRemaining.seconds}S
             </p>
        </div>
    );
};

export default CountdownTimer;
