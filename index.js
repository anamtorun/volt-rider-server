require('dotenv').config();
const { client } = require('./config/connectDB');

const {
  getProducts,
  getSingleProduct,
  updateAvailableQuantity,
} = require('./controllers/productsController');
const { createUser } = require('./controllers/usersController');
const { bookOrder, getMyOrders } = require('./controllers/ordersController');

const cors = require('cors');
const express = require('express');
const verifyToken = require('./middleware/verifyToken');

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
    app.patch('/products/:id', verifyToken, updateAvailableQuantity);

    app.put('/users', createUser);

    app.post('/orders', verifyToken, bookOrder);
    app.get('/orders/:email', verifyToken, getMyOrders);
  } finally {
  }
}

run().catch(console.dir);
