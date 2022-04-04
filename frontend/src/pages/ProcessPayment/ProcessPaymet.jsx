import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';

import {StatusMessage, PageContainer} from './ProcessPayment.styles';

import paymentsAPI from '../../api/payments.api';

// eslint-disable-next-line max-len
const stripePromise = loadStripe('pk_test_51KgrNAGQcUfT2LF4NgT1hl8AV2ZNfVqnlAKFnPJYPwKwtvFgaBnaJu0mZso2idRkDrW0vF9YvGIdWqrls4ZXlu9t00fLO75R06');

function ProcessPayment() {
  const [paymentStatus, setPaymentStatus] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);

  const {costId} = useParams();

  async function checkStatus() {
    const stripe = await stripePromise;

    const clientSecret = new URLSearchParams(window.location.search).get(
        'payment_intent_client_secret',
    );

    if (!clientSecret || !stripe) {
      setPaymentStatus('Failed to validate payment');
      setPaymentLoading(false);
      return;
    }

    const {paymentIntent} = await stripe.retrievePaymentIntent(clientSecret);

    switch (paymentIntent.status) {
      case 'succeeded':
        paymentsAPI.completePayment(costId);
        setPaymentStatus('Payment succeeded!');
        break;
      case 'processing':
        setPaymentStatus('Your payment is processing.');
        break;
      case 'requires_payment_method':
        setPaymentStatus('Your payment was not successful, please try again.');
        break;
      default:
        setPaymentStatus('Something went wrong.');
        break;
    }

    setPaymentLoading(false);
  }

  useEffect(() => {
    setPaymentLoading(true);
    checkStatus();
  }, []);

  return (
    <PageContainer>
      <StatusMessage>
        {paymentLoading ? 'Loading' : paymentStatus}
      </StatusMessage>
    </PageContainer>

  );
}

export default ProcessPayment;


