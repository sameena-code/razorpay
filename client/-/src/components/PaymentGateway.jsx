import React, { useState, useEffect } from 'react';
import './PaymentGateway.css';

const PaymentGateway = () => {
  const [isPaymentAllowed, setIsPaymentAllowed] = useState(false);
  const [currentTimeIST, setCurrentTimeIST] = useState('');

  const checkPaymentWindow = () => {
    const now = new Date();
    // IST is UTC+5:30
    const istOffsetMinutes = 5 * 60 + 30;
    const utcMilliseconds = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istMilliseconds = utcMilliseconds + (istOffsetMinutes * 60000);
    const istDate = new Date(istMilliseconds);

    const istHours = istDate.getHours();
    const istMinutes = istDate.getMinutes();
    const istSeconds = istDate.getSeconds();

    // Format time for display
    const formattedHours = String(istHours).padStart(2, '0');
    const formattedMinutes = String(istMinutes).padStart(2, '0');
    const formattedSeconds = String(istSeconds).padStart(2, '0');
    setCurrentTimeIST(`${formattedHours}:${formattedMinutes}:${formattedSeconds} IST`);

    // Check if current IST hour is 10 (10:00:00 AM to 10:59:59 AM)
    if (istHours === 10) {
      setIsPaymentAllowed(true);
    } else {
      setIsPaymentAllowed(false);
    }
  };

  useEffect(() => {
    // Check immediately on mount
    checkPaymentWindow();

    // Set up an interval to check the time every minute
    const intervalId = setInterval(checkPaymentWindow, 60000); // Check every 60 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs only once on mount and cleans up on unmount

  const handlePayment = () => {
    if (isPaymentAllowed) {
      // Replace with actual payment processing logic
      alert('Payment processing initiated!');
      console.log('Processing payment...');
    } else {
      alert('Payment window is closed.');
      console.log('Payment attempted outside allowed hours.');
    }
  };

  return (
    <div className="payment-gateway">
      <h2>Payment System</h2>
      <p className="current-time">Current Time: {currentTimeIST}</p>
      <p className="status-message">
        Payment window is open daily from 10:00 AM to 11:00 AM IST.
      </p>
      {isPaymentAllowed ? (
        <div className="payment-active">
          <p className="status-open">Payment window is currently OPEN.</p>
          <button onClick={handlePayment} className="pay-button">
            Pay Now
          </button>
        </div>
      ) : (
        <div className="payment-closed">
          <p className="status-closed">Payment window is currently CLOSED.</p>
          <button disabled className="pay-button-disabled">
          
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentGateway;