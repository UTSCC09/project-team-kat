import axios from 'axios';
import {CREATE_GROUP_MUTATION, GET_GROUPS_QUERY, GET_GROUP_QUERY,
  JOIN_GROUP_MUTATION} from '../graphql/group.defs';

export const getGroup = (id) => axios.post('/', {
  query: GET_GROUP_QUERY,
  variables: {id},
});

export const getGroups = (limit, skip) => axios.post('/', {
  query: GET_GROUPS_QUERY,
  variables: {limit: limit, skip: skip},
});

export const joinGroup = (code) => axios.post('/', {
  query: JOIN_GROUP_MUTATION,
  variables: {code},
});

export const createGroup = (name) => axios.post('/', {
  query: CREATE_GROUP_MUTATION,
  variables: {name},
});

const groupsAPI = {
  getGroup,
  getGroups,
  joinGroup,
  createGroup,
};

export default groupsAPI;
