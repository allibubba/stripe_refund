import StripeCommError from '../errors/RefundError'

class RefundService {
  constructor(charge, stripe, amount) {
    this.charge = charge;
    this.stripe = stripe;
    this.amount = amount;
  }

  async create(){
    try {
      return await this.stripe.refunds.create({
        charge: this.charge,
        amount: this.amount,
        metadata: { initiated_by: 'Adventure Club System', reason: 'overpay' }
      });
    } catch (error) {
      throw new StripeCommError(this.charge, err);
    }
  }
}
module.exports = RefundService;
