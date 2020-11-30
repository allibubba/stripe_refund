const CustomerCharges = require('./lib/CustomerCharges');

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_API_KEY);
const customerId = 'cus_GKXEZg3wJo4byK'

// need to determine how we are getting customer id's (from Seth or programmatically)
// const customer = async () => {
//   return await stripe.customers.retrieve(customerId);
// };


let charges = new CustomerCharges(customerId, stripe)

charges.fetchCharges({limit:3}).then((payload) => {
  const { data: chargeData } = payload;

  chargeData.forEach(charge => {
    let { id: chargeId } = charge;
    console.log('chargeData', chargeId, charge);
  });
});
