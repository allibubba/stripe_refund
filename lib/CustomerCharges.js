// retrieve array of charges from stripe per customer Id
// likely unused

class CustomerCharges {
  constructor(customerId, stripe) {
    throw 'this is a depreciated class';
    this.customerId = customerId;
    this.stripe = stripe;
  }

  async fetchCharges(options = {limit: 1}) {
    let opts = { customer: this.customerId, ...options }
    return await this.stripe.charges.list(opts);
  };
}
module.exports = CustomerCharges;
