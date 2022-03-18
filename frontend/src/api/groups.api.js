import axios from 'axios';
import {GET_GROUP_QUERY} from '../graphql/group.defs';

const baseURL = 'http://localhost:8000';

export const getGroup = (id) => axios.post(baseURL, {
  query: GET_GROUP_QUERY,
  variables: {id},
});

const groupsAPI = {
  getGroup,
};

export default groupsAPI;
