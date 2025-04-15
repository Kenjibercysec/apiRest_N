const express = require('express');
const router = express.Router();
const paymentService = require('../services/paymentService');
const { protect } = require('../middleware/auth');

// Criar intenção de pagamento
router.post('/create-payment-intent', protect, async (req, res) => {
  try {
    const { amount } = req.body;
    const result = await paymentService.createPaymentIntent(amount);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Webhook do Stripe
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['stripe-signature'];

  try {
    const result = await paymentService.handleWebhook(req.body, signature);
    res.json(result);
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

module.exports = router; 