import {gql} from '@apollo/client';

export const GET_POSTS_BY_GROUP_QUERY = `
  query getPostsByGroup($id: ID!) {
    getPostsByGroup(id: $id) {
      id
      title
      message
      author
      group
      left
      top
    }
  }
`;

export const CREATE_POST_MUTATION = `
  mutation createPost($title: String!, $message: String!, 
    $group: String!, $left: Int!, $top: Int!) {
      createPost(title: $title, message: $message, 
        group: $group, left: $left, top: $top) {
      id
      title
      message
      author
      group
      left 
      top
    }
  }
`;

export const UPDATE_POST_MUTATION = `
  mutation updatePost($id: ID!, $group: String!, $title: String, 
    $message: String, $left: Int, $top: Int) {
    updatePost(id: $id, group: $group, title: $title, message: $message, 
      left: $left, top: $top)
  }
`;

export const DELETE_POST_MUTATION = `
  mutation deletePost($id: ID!, $group: String!) {
    deletePost(id: $id, group: $group)
  }
`;

export const CREATE_POST_SUBSCRIPTION = gql`
  subscription CreatePostSubscription($group: String!) {
    postCreated(group: $group) {
      id
      title
      message
      author
      group
      left
      top
    }
  }
`;

export const UPDATE_POST_SUBSCRIPTION = gql`
  subscription UpdatePostSubscription($group: String!) {
    postUpdated(group: $group) {
      post {
        id
        title
        message
        author
        group
        left
        top
      }
      updater {
        id
        email
        username
      }
      event
    }
  }
`;

export const DELETE_POST_SUBSCRIPTION = gql`
  subscription DeletePostSubscription($group: String!) {
    postDeleted(group: $group)
  }
`;
