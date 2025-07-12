const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const { amount, item_name, customer_name } = req.body;//sends the user securey to Payfast

// Your secure merchant details (never send these to frontend)
const MERCHANT_ID = '30810239';
const MERCHANT_KEY = 'hped2rlwupos2';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to handle PayFast redirection
app.post('/pay', (req, res) => {
  const { amount, item_name } = req.body;

  const paymentData = {
    merchant_id: MERCHANT_ID,
    merchant_key: MERCHANT_KEY,
    return_url: 'https://yourdomain.com/success',
    cancel_url: 'https://yourdomain.com/cancel',
    notify_url: 'https://yourdomain.com/notify',
    amount: parseFloat(amount).toFixed(2),
    item_name: item_name || 'Shuttle Booking'
  };

  const queryString = Object.entries(paymentData)
    .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
    .join('&');

  const payfastUrl = `https://www.payfast.co.za/eng/process?${queryString}`;
  res.redirect(payfastUrl);
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${3000}`);
});

