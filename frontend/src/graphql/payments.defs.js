export const CREATE_PAYMENT_INTENT_QUERY = `
query CreatePaymentIntent($costId: ID!) {
  createPaymentIntent(costId: $costId) {
    clientSecret
  }
}
`;

export const COMPLETE_PAYMET_MUTATION = `
mutation CompletePayment($costId: ID!) {
  completePayment(costId: $costId) {
    id
  }
}
`;
