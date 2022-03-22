import axios from 'axios';
import {LOGIN_MUTATION, REGISTER_MUTATION} from '../graphql/auth.defs';

export const login = (data) => axios.post('/', {
  query: LOGIN_MUTATION,
  variables: data,
});

export const register = (data) => axios.post('/', {
  query: REGISTER_MUTATION,
  variables: data,
});

const authAPI = {
  login,
  register,
};

export default authAPI;
