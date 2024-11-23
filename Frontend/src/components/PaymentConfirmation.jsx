import React, { useEffect } from 'react';

export function PaymentConfirmation() {
  useEffect(() => {
    const timer = setTimeout(() => {
        window.location.reload();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="payment-confirmation">
      <h2>Payment Confirmed!</h2>
      <h3>Thank you for shopping at Snag & Bag Shop</h3>
      <p className='inform-user'>Sending user to main page in a few seconds...</p>
    </div>
  )
}