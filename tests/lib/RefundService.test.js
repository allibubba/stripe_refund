// import {
//   expect
// } from 'chai';

import chai, {expect} from 'chai';
import sinon from 'sinon';
import RefundService from '../../lib/RefundService';
import StripeCommError from '../../errors/RefundError'

const chaiAsPromised = require("chai-as-promised");
const stripe = require('stripe')('fake_key');
chai.use(chaiAsPromised);

describe('RefundService', () => {
  let stubStripe;
  let refundInstance;

  context('success', () => {
    before(() => {
      stubStripe = sinon.stub(stripe.refunds, 'create').resolves("hello there")
    });

    after(() => {
      stubStripe.reset();
    });

    it('creates successfully', async () => {
      refundInstance = new RefundService('test', stripe, 10);
      let resp = await refundInstance.create()
      expect(resp).to.equal("hello there");
    });

    it('raises error', async () => {
      refundInstance = new RefundService('test', stripe, 10);
      await expect(refundInstance.wtf()).to.be.rejectedWith(Error)
    });


    it('raises specific error', async () => {
      refundInstance = new RefundService('test', stripe, 10);
      try {
        await refundInstance.wtf();
        expect.fail();
      } catch(error) {
        expect(error).to.be.an.instanceOf(StripeCommError);
      }
    });
  });
});
