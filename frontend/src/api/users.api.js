import axios from 'axios';
import {GET_USER_QUERY} from '../graphql/user.defs';

export const getUser = (id) => axios.post('/', {
  query: GET_USER_QUERY,
  variables: {id},
});

const usersAPI = {
  getUser,
};

export default usersAPI;
