import axios from 'axios';
import {CREATE_COST_MUTATION,
  GET_PAGINATED_COSTS_BY_GROUP_QUERY,
  GET_COSTS_BY_GROUP_QUERY} from '../graphql/cost.defs';

const baseURL = 'http://localhost:8000';

export const getCostsByGroup = (id) => axios.post(baseURL, {
  query: GET_COSTS_BY_GROUP_QUERY,
  variables: {id},
});

export const getPaginatedCostsByGroup = (id, limit=9, skip=0) =>
  axios.post(baseURL, {
    query: GET_PAGINATED_COSTS_BY_GROUP_QUERY,
    variables: {id, limit, skip},
  });

export const createCost = (cost) => axios.post(baseURL, {
  query: CREATE_COST_MUTATION,
  variables: cost,
});

const costsAPI = {
  getCostsByGroup,
  getPaginatedCostsByGroup,
  createCost,
};

export default costsAPI;
