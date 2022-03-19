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

export const GET_USER_QUERY = `
query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    email
    username
  }
}
`;
