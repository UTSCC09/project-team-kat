import axios from 'axios';
import {GET_COSTS_BY_GROUP_QUERY} from '../graphql/cost.defs';

const baseURL = 'http://localhost:8000';

export const getCostsByGroup = (id) => axios.post(baseURL, {
  query: GET_COSTS_BY_GROUP_QUERY,
  variables: {id},
});

const costsAPI = {
  getCostsByGroup,
};

export default costsAPI;
