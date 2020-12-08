const sinon = require('sinon');
const stripe = require('stripe')('fake_key');

export const stripeStub = () => {
  return sinon.stub(stripe.refunds, 'create').resolves("hello there");
}

export const stripeApiErrorStub = () => {
  return sinon.stub(stripe.customer, 'create').stub.throws({type: "StripeAPIError"});
}
