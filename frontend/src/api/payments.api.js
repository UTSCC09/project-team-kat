import axios from 'axios';
import {CREATE_PAYMENT_INTENT_QUERY} from '../graphql/payments.defs';

export const createPaymentIntent = (costId) => axios.post('/', {
  query: CREATE_PAYMENT_INTENT_QUERY,
  variables: {costId},
});

const paymentsAPI = {
  createPaymentIntent,
};

export default paymentsAPI;

