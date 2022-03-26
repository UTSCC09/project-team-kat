export const GET_USER_QUERY = `
query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    email
    username
  }
}
`;

export const CREATE_PAYMENT_INTENT_QUERY = `
query createPaymentIntent($paymentInfo: String!) {
  createPaymentIntent(paymentInfo: $paymentInfo) {
    client_secret
  }
}
`;