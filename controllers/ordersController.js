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

  const response = await ordersCollection.insertOne(req.body);
  return res.send(response);
};
