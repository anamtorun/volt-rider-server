const { client } = require('../config/connectDB');
const ordersCollection = client.db('fireTools').collection('orders');

exports.bookOrder = async (req, res) => {
  const { name, email, address, phoneNumber, orderQuantity, total, productName, productId, paid } =
    req.body;

  if (
    !name ||
    !email ||
    !address ||
    !phoneNumber ||
    !orderQuantity ||
    !total ||
    !productName ||
    !productId ||
    paid
  ) {
    return res.status(400).send({ message: 'Fill in all the values' });
  }

  const response = await ordersCollection.insertOne({ ...req.body, status: 'pending' });
  return res.send(response);
};

exports.getMyOrders = async (req, res) => {
  const email = req.params.email;
  const userEmailFromJWT = req.user.email;
  if (email !== userEmailFromJWT) {
    return res.status(403).send({ message: 'Access forbidden!' });
  }

  const response = await ordersCollection.find({ email }).toArray();
  return res.status(200).send(response);
};
