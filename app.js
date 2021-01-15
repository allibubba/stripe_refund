const RefundService = require('./lib/RefundService');
const reportWriter = require('./lib/ReportWriter');

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_API_KEY);

const throttledQueue = require('throttled-queue');
const throttle = throttledQueue(2, 1000);

const AWS = require('aws-sdk');

// UPLOAD TO S3
const uploadFile = (fileName = "tmp/esults.csv") => {
  const fileContent = fs.readFileSync(fileName);
  const s3 = new aws.S3();
  const params = {
    Bucket: stripe_refund,
    Key: `refund_${new Date().toLocaleDateString('en-US').split('/').join('_')}.csv`,
    Body: fileContent
  };

  s3.upload(params, function(err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};


// DATA SAMPLE
const chargeIds = [
  {"charge_id": "ch_1HrRv3KQX4KqDlTwahHSSagZ", "amount": 10 },
  {"charge_id": "ch_1HgDqBKQX4KqDlTwHReZtUR4", "amount": 10 },
  {"charge_id": "ch_1HVKnLKQX4KqDlTwFhFYoHDu", "amount": 10 },
  {"charge_id": "ch_1HK5z7KQX4KqDlTwEnIAsXj8", "amount": 10 },
  {"charge_id": "ch_1H8rCsKQX4KqDlTwjcCkW1nc", "amount": 10 }
]

// NOTE: 2 requests per second
const refund = async (chargeId) => {
  ref = new RefundService(chargeId, stripe, amount);
  let message;
  try {
    message = await ref.create()
  } catch(error) {
    message = { "charge": chargeId, "status": "failed" "error": err }
  } finally {
    reportWriter.write(message);
  }
};


// TODO: read intake file
chargeIds.forEach(chargeId => {
  throttle(function() {
    try {
      await refund(chargeId);
    } catch(error) {
      console.log('error', error);
    }
  });
});

// CLOSE THE STREAM & UPLOAD
reportWriter.end();
uploadFile("tmp/esults.csv");
console.log('∆ -------------------------------------')
console.log('PROGRAM COMPLETE')
console.log('∆ -------------------------------------')
exit(0);
