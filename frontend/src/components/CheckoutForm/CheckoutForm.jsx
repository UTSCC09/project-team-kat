import React from 'react';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';

const {REACT_APP_PRODUCTION, REACT_APP_FRONTEND_URL,
  REACT_APP_PROD_HTTPS_URL} =
  process.env;

// https://stripe.com/docs/stripe-js/react#:~:text=for%20Afterpay%20payments.-,useElements%20hook,-useElements()%3A%20Elements%20%7C%20null
const baseHttpURL = REACT_APP_PRODUCTION === 'true' ?
REACT_APP_PROD_HTTPS_URL :
REACT_APP_FRONTEND_URL;

function CheckoutForm({costId}) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      // `Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${baseHttpURL}/#/groups/payments/${costId}`,
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment,
      // then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe}>Submit</button>
    </form>
  );
};

export default CheckoutForm;
