import axios from 'axios';
import {CREATE_COST_MUTATION,
  GET_COSTS_BY_GROUP_QUERY} from '../graphql/cost.defs';

const baseURL = 'http://localhost:8000';

export const getCostsByGroup = (id) => axios.post(baseURL, {
  query: GET_COSTS_BY_GROUP_QUERY,
  variables: {id},
});

export const createCost = (cost) => axios.post(baseURL, {
  query: CREATE_COST_MUTATION,
  variables: cost,
});

const costsAPI = {
  getCostsByGroup,
  createCost,
};

export default costsAPI;
