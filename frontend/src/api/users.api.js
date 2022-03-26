import axios from 'axios';
import {CREATE_PAYMENT_INTENT_QUERY, GET_USER_QUERY} from '../graphql/user.defs';

const baseURL = 'http://localhost:8000';

export const getUser = (id) => axios.post(baseURL, {
  query: GET_USER_QUERY,
  variables: {id},
});

export const createPaymentIntent = () => axios.post(baseURL, {
  query: CREATE_PAYMENT_INTENT_QUERY,
  variables: {paymentInfo: "test"}
})

const usersAPI = {
  getUser,
  createPaymentIntent,
};

export default usersAPI;
