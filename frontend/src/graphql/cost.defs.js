
export const GET_COSTS_BY_GROUP_QUERY = `
query getCostsByGroup($id: ID!) {
  getCostsByGroup(id: $id) {
    ownerId
    name
    amount
    applicableUsers {
      id
      username
    }
  }
}
`;
