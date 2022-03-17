import axios from 'axios';
import {
  GET_POSTS_BY_GROUP_QUERY,
  CREATE_POST_MUTATION,
  UPDATE_POST_MUTATION,
  DELETE_POST_MUTATION} from '../graphql/post.defs';

const baseURL = 'http://localhost:8000';

export const getPostsByGroup = (id) => axios.post(baseURL, {
  query: GET_POSTS_BY_GROUP_QUERY,
  variables: {id},
});

export const createPost = (post) => axios.post(baseURL, {
  query: CREATE_POST_MUTATION,
  variables: post,
});

export const updatePost = (post) => axios.post(baseURL, {
  query: UPDATE_POST_MUTATION,
  variables: post,
});

export const deletePost = (post) => axios.post(baseURL, {
  query: DELETE_POST_MUTATION,
  variables: post,
});

const postsAPI = {
  getPostsByGroup,
  createPost,
  updatePost,
  deletePost,
};

export default postsAPI;
