const { client } = require('../config/connectDB');
const userCollection = client.db('fireTools').collection('users');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

exports.createUser = async (req, res) => {
  const { email, name } = req.body;
  const updateDoc = { $set: { email, name } };
  const response = await userCollection.updateOne({ email }, updateDoc, { upsert: true });

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.send({ response, token });
};

exports.getUsers = async (req, res) => {
  const response = await userCollection.find().toArray();

  res.status(200).send(response);
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  const filter = { _id: ObjectId(userId) };
  const exists = await userCollection.findOne(filter);

  if (exists) {
    const response = await userCollection.deleteOne(filter);
    return res.status(204).send(response);
  }

  return res.status(404).send('Not found');
};

exports.isAdmin = async (req, res) => {
  const { email } = req.params;

  const user = await userCollection.findOne({ email });

  const isAdmin = user.role === 'admin';

  res.send({ admin: isAdmin });
};
