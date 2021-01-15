const reportWriter = require('./lib/ReportWriter');

let messageOne = {
  "id": "re_1I8qW82eZvKYlo2C3TOlqHdT",
  "object": "refund",
  "amount": 100,
  "balance_transaction": null,
  "charge": "ch_1I8qW82eZvKYlo2C3gDngLtS",
  "created": 1610471932,
  "currency": "usd",
  "metadata": {'order_id': '276109', 'foo':'bar'},
  "payment_intent": null,
  "reason": null,
  "receipt_number": null,
  "source_transfer_reversal": null,
  "status": "succeeded",
  "transfer_reversal": null
}
let messageTwo = {
  "id": "re_fds89fdsHJ89fds78fdsHJKD",
  "object": "refund",
  "amount": 70,
  "balance_transaction": null,
  "charge": "ch_222222vgLtS",
  "created": 4510471999,
  "currency": "usd",
  "metadata": {'order_id': '276109', 'foo':'bar'},
  "payment_intent": null,
  "reason": null,
  "receipt_number": null,
  "source_transfer_reversal": null,
  "status": "succeeded",
  "transfer_reversal": null
}

let messageError = { "charge": "ch_54545454vgLtS", 
  "status": "failed", "error": "error message" }

// writes messages to file in /tmp/results.csv
try {
  reportWriter.write(messageOne);
  reportWriter.write(messageTwo);
  reportWriter.write(messageError);
  reportWriter.end();
} catch(e) {
  console.log('error', e);
}
