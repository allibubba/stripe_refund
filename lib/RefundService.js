import StripeCommError from '../errors/RefundError'
const fs = require('fs');
class RefundService {
  constructor(charge, stripe, amount) {
    this.charge = charge;
    this.stripe = stripe;
    this.amount = amount;
  }

  //write to log file
  static reporter = (...items) => {
    console.log("this", this, items);
    let message = items.join(" | ");
    fs.appendFile('log.txt', message + "\n",  {'flag':'a'}, (err) => {
      if (err) throw err;
      console.log('entry was logged as expected');
    });
  }

  async wtf (x = 0){
    throw new StripeCommError(1,2);
  }

  async create(){
    try {
      return await this.stripe.refunds.create({
        charge: this.charge,
        amount: this.amount,
        metadata: { initiated_by: 'Adventure Club System', reason: 'overpay' }
      });
    } catch(err) {
      switch (err.type) {
        case "StripeAPIError":
        case "StripeConnectionError":
        throw new StripeCommError(this.charge, err);
        break;
        default:
          // its a failure (log this)
      }
    }
  }
}
module.exports = RefundService;
