const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const logger = require('../config/logger');

exports.createPaymentIntent = async (amount, currency = 'brl') => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      status: 'success',
      clientSecret: paymentIntent.client_secret
    };
  } catch (error) {
    logger.error('Payment intent creation error:', error);
    throw new Error('Error creating payment intent');
  }
};

exports.handleWebhook = async (payload, signature) => {
  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case 'payment_intent.succeeded':
        // Handle successful payment
        logger.info('Payment succeeded:', event.data.object);
        break;
      case 'payment_intent.payment_failed':
        // Handle failed payment
        logger.error('Payment failed:', event.data.object);
        break;
      default:
        logger.info(`Unhandled event type: ${event.type}`);
    }

    return { received: true };
  } catch (error) {
    logger.error('Webhook error:', error);
    throw new Error('Webhook signature verification failed');
  }
}; 