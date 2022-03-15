export const GET_POSTS_BY_GROUP_QUERY = `
  query getPostsByGroup($id: ID!) {
    getPostsByGroup(id: $id) {
      id
      uid
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
  mutation createPost($uid: String!, $title: String!, $message: String!, 
    $author: String!, $group: String!, $left: Int!, $top: Int!) {
      createPost(uid: $uid, title: $title, message: $message, 
        author: $author, group: $group, left: $left, top: $top) {
      id
      uid
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
  mutation updatePost($post: PostInput!) {
    updatePost(post: $post)
  }
`;

export const DELETE_POST_MUTATION = `
  mutation deletePost($id: ID!) {
    deletePost(id: $id)
  }
`;
