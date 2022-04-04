export const LOGIN_MUTATION = `
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      jwt 
    }
  }
`;

export const REGISTER_MUTATION = `
  mutation register($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password) {
      jwt
      stripeUrl
    }
  }
`;
