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
