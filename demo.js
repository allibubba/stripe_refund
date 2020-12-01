const CustomerCharges = require('./lib/CustomerCharges');

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_API_KEY);
const customerIds = ['cus_GKXEZg3wJo4byK']

// need to determine how we are getting customer id's (from Seth or programmatically)
// const customer = async () => {
//   return await stripe.customers.retrieve(customerId);
// };
const refundIt = async (chargeId) => {
  return await stripe.refunds.create({
    charge: chargeId,
    amount: 700,
    metadata: {
      initiated_by: 'Adventure Club System',
      reason: 'overpay'
    }
  })
}

customerIds.forEach(customerId => {
  let charges = new CustomerCharges(customerId, stripe)

  charges.fetchCharges({limit:1}).then((payload) => {
    const { data: chargeArray } = payload;

    chargeArray.forEach(charge => {
      let { id: chargeId } = charge;
      console.log('refund to', chargeId);


      refundIt(chargeId).then((refundPayload) => {
        console.log('refund', refundPayload);
      });
    });
  });
});

// const refund = await stripe.refunds.create({
//   charge: 'ch_1HrnTq2eZvKYlo2Cgx3UtXdV',
// });
