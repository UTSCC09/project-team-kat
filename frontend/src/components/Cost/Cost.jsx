import React, {useState} from 'react';

import {Transaction, TransactionLogger,
  TransactionCost, CostOptions, PayCostOption} from './Cost.styles';

import PopUp from '../PopUp/PopUp';
import paymentsAPI from '../../api/payments.api';

import {Elements} from '@stripe/react-stripe-js';
import {PaymentElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// eslint-disable-next-line max-len
const stripePromise = loadStripe('pk_test_51KgrNAGQcUfT2LF4NgT1hl8AV2ZNfVqnlAKFnPJYPwKwtvFgaBnaJu0mZso2idRkDrW0vF9YvGIdWqrls4ZXlu9t00fLO75R06');

import ClickAwayListener from '@mui/base/ClickAwayListener';

function Cost({cost}) {
  const [openOptions, setOpenOptions] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [stripeLoading, setStripeLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  const createPaymentIntent = async () => {
    const paymentIntent = await paymentsAPI.createPaymentIntent(cost.id);
    console.log(paymentIntent.data.data.createPaymentIntent.clientSecret);
    setClientSecret(paymentIntent.data.data.createPaymentIntent.clientSecret);
    setStripeLoading(false);
  };

  const hanndlePayCostClicked = () => {
    setStripeLoading(true);
    createPaymentIntent();
    setOpenPopup(true);
  };

  return (
    <>
      <ClickAwayListener onClickAway={() => setOpenOptions(false)}>
        <Transaction onClick={() => setOpenOptions(true)}>
          <TransactionCost>
            {cost.name} - ${cost.amount}
          </TransactionCost>
          <TransactionLogger>
                  Created by: {cost.owner}
          </TransactionLogger>
          {openOptions &&
        <CostOptions>
          <PayCostOption onClick={() => hanndlePayCostClicked()}>
            Pay Cost
          </PayCostOption>
        </CostOptions>
          }
        </Transaction>
      </ClickAwayListener>
      <PopUp open={openPopup} handleClose={() => setOpenPopup(false)}>
        {openPopup ?
        (stripeLoading ?
        <div>Loading</div>:
        <Elements stripe={stripePromise} options={{clientSecret}}>
          <form>
            <PaymentElement />
            <button>Submit</button>
          </form>
        </Elements>) :
        null}
      </PopUp>
    </>
  );
}

export default Cost;
