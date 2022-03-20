export const GET_USER_QUERY = `
query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    email
    username
  }
}
`;
