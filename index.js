const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Use dynamic port for deployment (e.g. Render), fallback to 3000 locally
const port = process.env.PORT || 3000;

// Your secure merchant details (⚠️ NEVER expose to frontend)
const MERCHANT_ID = '30810239';
const MERCHANT_KEY = 'hped2rlwupos2';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Payment route
app.post('/pay', (req, res) => {
  const { amount, item_name, customer_name } = req.body;

  // Sanity check
  if (!amount || !item_name) {
    return res.status(400).send('Missing payment information.');
  }

  const paymentData = {
    merchant_id: MERCHANT_ID,
    merchant_key: MERCHANT_KEY,
    return_url: 'https://yourdomain.com/success',    // ✅ Replace with your actual URL
    cancel_url: 'https://yourdomain.com/cancel',     // ✅ Replace with your actual URL
    notify_url: 'https://yourdomain.com/notify',     // ✅ Optional for IPN
    amount: parseFloat(amount).toFixed(2),
    item_name: item_name,
    name_first: customer_name || 'Customer'
  };

  const queryString = Object.entries(paymentData)
    .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
    .join('&');

  const payfastUrl = `https://www.payfast.co.za/eng/process?${queryString}`;

  // Redirect the client to PayFast for secure payment
  res.redirect(payfastUrl);
});

// Start server
app.listen(port, () => {
  console.log(`✅ PayFast backend running on http://localhost:${port}`);
});

