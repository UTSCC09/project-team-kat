export const CREATE_PAYMENT_INTENT_QUERY = `
query CreatePaymentIntent($costId: ID!) {
  createPaymentIntent(costId: $costId) {
    clientSecret
  }
}
`;
