class CustomerCharges {
  constructor(customerId, stripe) {
    this.customerId = customerId;
    this.stripe = stripe;
  }

  async fetchCharges(options = {limit: 1}) {
    let opts = { customer: this.customerId, ...options }
    return await this.stripe.charges.list(opts)
  };
}
module.exports = CustomerCharges;

