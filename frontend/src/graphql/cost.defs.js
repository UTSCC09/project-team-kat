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

export const GET_PAGINATED_COSTS_BY_GROUP_QUERY = `
query getPaginatedCostsByGroup($id: ID!, $limit: Int, $skip: Int) {
  getPaginatedCostsByGroup(id: $id, limit: $limit, skip: $skip) {
    data {
      ownerId
      name
      amount
      applicableUsers {
        id
        username
      }
    }
    totalItems
  }
}
`;

export const CREATE_COST_MUTATION = `
mutation CreateCost($name: String!, $amount: String!, 
  $applicableUsers: [String!]!, $groupId: String!) {
  createCost(name: $name, amount: $amount, 
    applicableUsers: $applicableUsers, groupId: $groupId) {
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
