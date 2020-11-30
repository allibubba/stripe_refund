# stripe refund app

- intake source from csv, or json TBD (list of charge id's to refund)
- retrieve PaymentIntent(s) for customer from Stripe
- calculate if partial refund should be created

In terminal from the project root:

    docker build . -t stripe-bulk-refund

### Run
$ docker run -ti --rm \
-v $PWD:/app \
-e STRIPE_API_KEY=sk_test_xxx \
stripe-bulk-refund demo







$ docker run -ti --rm \
-v $PWD:/app \
-e STRIPE_API_KEY=sk_test_xxx \
stripe-bulk-refund demo
