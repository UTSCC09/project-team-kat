import axios from 'axios';
import {CREATE_PAYMENT_INTENT_QUERY} from '../graphql/payments.defs';

const baseURL = 'http://localhost:8000';

export const createPaymentIntent = (costId) => axios.post(baseURL, {
  query: CREATE_PAYMENT_INTENT_QUERY,
  variables: {costId},
});

const paymentsAPI = {
  createPaymentIntent,
};

export default paymentsAPI;

