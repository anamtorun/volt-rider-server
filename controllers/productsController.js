const { client } = require('../config/connectDB');
const productCollection = client.db('fireTools').collection('products');

exports.getProducts = async (req, res) => {
  const products = await productCollection.find().toArray();

  res.send(products);
};
