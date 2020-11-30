const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_API_KEY);
const customerId = 'cus_GKXEZg3wJo4byK'

const customer = async () => {
  return await stripe.customers.retrieve(customerId);
};

const customerCharges = async () => {
  return await stripe.charges.list({
    customer: customerId,
    limit: 1,
  });
};

customerCharges().then((payload) => {
  const { data: chargeData } = payload;

  chargeData.forEach(charge => {
    let { id: chargeId } = charge;
    console.log('chargeData', chargeId, charge);
  });
});
