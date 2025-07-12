// index.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Your secure merchant details (never send these to frontend)
const MERCHANT_ID = '30810239';
const MERCHANT_KEY = 'hped2rlwupos2';


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/pay', (req, res) => {
  const { amount, item_name } = req.body;
  // Simulate PayFast redirect or log data
  res.send(`Received booking for ${item_name} at R${amount}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
