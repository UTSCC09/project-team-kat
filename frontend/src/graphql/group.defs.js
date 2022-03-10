
export const GET_GROUPS_QUERY = `
query GetGroups {
  getGroups {
    id
    name
    members {
      id
      username
    }
    code
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
