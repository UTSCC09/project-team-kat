
export const GET_GROUPS_QUERY = `
query GetGroups($limit: Int, $skip: Int) {
  getGroups(limit: $limit, skip: $skip) {
    data {
      id
      name
      members {
        id
        email
        username
      }
      code
    }
    totalItems
  }
}
`;

export const CREATE_GROUP_MUTATION = `
mutation Mutation($name: String!) {
  createGroup(name: $name) {
    code
  }
}
`;

export const JOIN_GROUP_MUTATION = `
mutation Mutation($code: String!) {
  joinGroup(code: $code) {
    id
  }
}
`;
