require('dotenv').config();
const { client } = require('./config/connectDB');

const {
  getProducts,
  getSingleProduct,
  updateAvailableQuantity,
  reUpdateAvailableQuantity,
} = require('./controllers/productsController');
const { createUser } = require('./controllers/usersController');
const { bookOrder, getMyOrders, cancelOrder } = require('./controllers/ordersController');

const cors = require('cors');
const express = require('express');
const verifyToken = require('./middleware/verifyToken');
const { addReview, getLatestReviews } = require('./controllers/reviewsController');

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
    app.put('/products/:id', verifyToken, updateAvailableQuantity);
    app.put('/products/update-available-quantity/:id', verifyToken, reUpdateAvailableQuantity);

    app.put('/users', createUser);

    app.post('/orders', verifyToken, bookOrder);
    app.get('/orders/:userId', verifyToken, getMyOrders);
    app.delete('/orders/cancel/:id', verifyToken, cancelOrder);

    app.post('/reviews', verifyToken, addReview);
    app.get('/reviews', getLatestReviews);
  } finally {
  }
}

run().catch(console.dir);
