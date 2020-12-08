const CustomerCharges = require('./lib/CustomerCharges');
const RefundService = require('./lib/RefundService');

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_API_KEY);
const throttledQueue = require('throttled-queue');
const chargeIds = [
  'ch_1HrRv3KQX4KqDlTwahHSSagZ',
  'ch_1HgDqBKQX4KqDlTwHReZtUR4',
  'ch_1HVKnLKQX4KqDlTwFhFYoHDu',
  'ch_1HK5z7KQX4KqDlTwEnIAsXj8',
  'ch_1H8rCsKQX4KqDlTwjcCkW1nc'
]

// need to determine how we are getting customer id's (from Seth or programmatically)
// const customer = async () => {
//   return await stripe.customers.retrieve(customerId);
// };

// 2 requeasts per second
let throttle = throttledQueue(2, 1000);


let refundIt = async (chargeId) => {
  try {
    // this returns a promise, which is whu it's wrapped with a try/catch statement
    return await stripe.refunds.create({
      charge: chargeId,
      amount: 10,
      metadata: {
        initiated_by: 'Adventure Club System',
        reason: 'overpay'
      }
    });
  } catch(e) {
    console.log('e', e);
  }
};


chargeIds.forEach(chargeId => {
  throttle(function() {
    new RefundService(chargeId, stripe, 10).create();
    // refundIt(chargeId).then((refundPayload) => {
    //   console.log('refund', refundPayload);
    // });
  });
});
