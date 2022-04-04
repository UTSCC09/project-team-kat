import axios from 'axios';
import {CREATE_PAYMENT_INTENT_QUERY,
  COMPLETE_PAYMET_MUTATION} from '../graphql/payments.defs';

export const createPaymentIntent = (costId) => axios.post('/', {
  query: CREATE_PAYMENT_INTENT_QUERY,
  variables: {costId},
});

export const completePayment = (costId) => axios.post('/', {
  query: COMPLETE_PAYMET_MUTATION,
  variables: {costId},
});

const paymentsAPI = {
  createPaymentIntent,
  completePayment,
};

export default paymentsAPI;

