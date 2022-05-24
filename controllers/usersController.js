const { client } = require('../config/connectDB');
const userCollection = client.db('fireTools').collection('users');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  const { email, name, role } = req.body;
  const updateDoc = { $set: { email, name, role } };
  const response = await userCollection.updateOne({ email }, updateDoc, { upsert: true });

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.send({ response, token });
};

exports.getUser = async (req, res) => {
  const response = await userCollection.find();
  res.status(200).send(response);
};

exports.isAdmin = async (req, res) => {
  const { email } = req.params;
  const user = await userCollection.findOne({ email });

  const isAdmin = user.role === 'admin';

  res.send({ admin: isAdmin });
};
