import axios from 'axios';
import {CREATE_COST_MUTATION,
  GET_PAGINATED_COSTS_BY_GROUP_QUERY,
  GET_COSTS_BY_GROUP_QUERY} from '../graphql/cost.defs';

export const getCostsByGroup = (id) => axios.post('/', {
  query: GET_COSTS_BY_GROUP_QUERY,
  variables: {id},
});

export const getPaginatedCostsByGroup = (id, limit=9, skip=0) =>
  axios.post('/', {
    query: GET_PAGINATED_COSTS_BY_GROUP_QUERY,
    variables: {id, limit, skip},
  });

export const createCost = (cost) => axios.post('/', {
  query: CREATE_COST_MUTATION,
  variables: cost,
});

const costsAPI = {
  getCostsByGroup,
  getPaginatedCostsByGroup,
  createCost,
};

export default costsAPI;
