require('dotenv').config();
const { client } = require('./config/connectDB');
const { getProducts, getSingleProduct } = require('./controllers/productsController');

const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function run() {
  try {
    await client.connect();

    app.get('/', async (req, res) => {
      res.send('Running...');
    });

    console.log('DB connection established');
    app.listen(PORT, () => console.log('Listening on port:', PORT));

    app.get('/products', getProducts);
    app.get('/products/details/:id', getSingleProduct);
  } finally {
  }
}

run().catch(console.dir);
