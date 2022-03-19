import axios from 'axios';
import {GET_USER_QUERY} from '../graphql/user.defs';

const baseURL = 'http://localhost:8000';

export const getUser = (id) => axios.post(baseURL, {
  query: GET_USER_QUERY,
  variables: {id},
});

const usersAPI = {
  getUser,
};

export default usersAPI;
