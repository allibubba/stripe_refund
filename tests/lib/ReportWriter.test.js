// import {
//   expect
// } from 'chai';

import chai, {expect} from 'chai';
import sinon from 'sinon';
import reportWriter from '../../lib/ReportWriter';

const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const validMessage = {
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

describe('ReportWriter', () => {
  let reportWriterInstance;

  context('success', () => {
    it('writes', () => {
      reportWriter.write(validMessage);
      reportWriter.end();
      // console.log('∆ -------------------------------------')
      // console.log(reportWriter)
      console.log('∆ -------------------------------------')
      expect(true).to.equal(false);
    });
  });
});
