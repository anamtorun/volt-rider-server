const { ObjectId } = require('mongodb');
const { client } = require('../config/connectDB');
const productCollection = client.db('fireTools').collection('products');

exports.getProducts = async (req, res) => {
  const products = await productCollection.find().toArray();
  res.send(products);
};

exports.getSingleProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productCollection.findOne({ _id: ObjectId(id) });

  res.send(product);
};

exports.updateAvailableQuantity = async (req, res) => {
  const { id } = req.params;
  const { available_quantity } = req.body;

  const exists = await productCollection.findOne({ _id: ObjectId(id) });

  if (!exists) {
    return res.status(404).send({ message: 'Product not found.' });
  }

  await productCollection.updateOne({ _id: ObjectId(id) }, { $set: { available_quantity } });

  return res.status(200).send('Success');
};
