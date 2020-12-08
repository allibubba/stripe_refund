const RefundService = require('./lib/RefundService');
const ReportWriter = require('./lib/ReportWriter');

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_API_KEY);
const throttledQueue = require('throttled-queue');

const intake = [
  {"charge_id": "ch_1HrRv3KQX4KqDlTwahHSSagZ", "amount": 10 },
  {"charge_id": "ch_1HgDqBKQX4KqDlTwHReZtUR4", "amount": 10 },
  {"charge_id": "ch_1HVKnLKQX4KqDlTwFhFYoHDu", "amount": 10 },
  {"charge_id": "ch_1HK5z7KQX4KqDlTwEnIAsXj8", "amount": 10 },
  {"charge_id": "ch_1H8rCsKQX4KqDlTwjcCkW1nc", "amount": 10 }
]




// 2 requests per second
let throttle = throttledQueue(2, 1000);

let refundIt = async (chargeId) => {
  ref = new RefundService(chargeId, stripe, amount);
  try {
    await ref.create()
  } catch(error) {
    // write report
    new ReportWriter(error);
  }
};

// read intake file
// for each charge

chargeIds.forEach(chargeId => {
  throttle(function() {
    try {
      await refundIt(chargeId);
    } catch(error) {
      console.log('error', error);
    }
  });
});
