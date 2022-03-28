import axios from 'axios';
import {
  GET_POSTS_BY_GROUP_QUERY,
  CREATE_POST_MUTATION,
  UPDATE_POST_MUTATION,
  DELETE_POST_MUTATION} from '../graphql/post.defs';

export const getPostsByGroup = (id) => axios.post('/', {
  query: GET_POSTS_BY_GROUP_QUERY,
  variables: {id},
});

export const createPost = (post) => axios.post('/', {
  query: CREATE_POST_MUTATION,
  variables: post,
});

export const updatePost = (post) => axios.post('/', {
  query: UPDATE_POST_MUTATION,
  variables: post,
});

export const deletePost = (post) => axios.post('/', {
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
