const { ObjectId } = require('mongodb');
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
  const { userId } = req.params;

  const response = await ordersCollection.find({ userId }).toArray();
  return res.status(200).send(response);
};

exports.cancelOrder = async (req, res) => {
  const { id } = req.params;
  const findOrder = await ordersCollection.findOne({ _id: ObjectId(id) });

  if (!findOrder) {
    return res.status(404).send({ message: 'Not found!' });
  }

  const response = await ordersCollection.deleteOne({ _id: ObjectId(id) });

  return res.status(200).send({ response });
};
