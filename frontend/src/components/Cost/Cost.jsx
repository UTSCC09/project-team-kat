import React, {useState} from 'react';

import {Transaction, TransactionLogger,
  TransactionCost, CostOptions, PayCostOption,
  CostContainer} from './Cost.styles';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import PopUp from '../PopUp/PopUp';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import paymentsAPI from '../../api/payments.api';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// eslint-disable-next-line max-len
const stripePromise = loadStripe('pk_test_51KgrNAGQcUfT2LF4NgT1hl8AV2ZNfVqnlAKFnPJYPwKwtvFgaBnaJu0mZso2idRkDrW0vF9YvGIdWqrls4ZXlu9t00fLO75R06');


function Cost({cost}) {
  const [openOptions, setOpenOptions] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [stripeLoading, setStripeLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  const createPaymentIntent = async () => {
    const paymentIntent = await paymentsAPI.createPaymentIntent(cost.id);
    setClientSecret(paymentIntent.data.data.createPaymentIntent.clientSecret);
    setStripeLoading(false);
  };

  const handlePayCostClicked = () => {
    setOpenOptions(false);
    setStripeLoading(true);
    createPaymentIntent();
    setOpenPopup(true);
  };

  const handlePopUpClose = () => {
    if (!stripeLoading) setOpenPopup(false);
  };

  return (
    <ClickAwayListener onClickAway={() => setOpenOptions(false)}>
      <CostContainer>
        <Transaction onClick={() => setOpenOptions(true)}>
          <TransactionCost>
            {cost.name} - ${cost.amount}
          </TransactionCost>
          <TransactionLogger>
                  Created by: {cost.owner}
          </TransactionLogger>
        </Transaction>
        <PopUp open={openPopup} handleClose={() => handlePopUpClose()}>
          {openPopup ?
        (stripeLoading ?
        <div>Loading</div>:
        <Elements stripe={stripePromise} options={{clientSecret}}>
          <CheckoutForm costId={cost.id}></CheckoutForm>
        </Elements>) :
        null}
        </PopUp>
        {openOptions &&
        <CostOptions>
          <PayCostOption onClick={() => handlePayCostClicked()}>
            Pay Cost
          </PayCostOption>
        </CostOptions>
        }
      </CostContainer>
    </ClickAwayListener>
  );
}

export default Cost;
