const connection = require('./connection');
const ObjectID = require('mongodb').ObjectId;

const validateUser = async ({ registrationNumber, password }) => {
  return connection()
   .then((db) => db.collection('users').findOne({ registrationNumber, password }))
   .then((item) => {
     return item
    });
};

const userRegister = async ({ name, email, registrationNumber, password, role }) => {
  return connection()
   .then((db) => db.collection('users').insertOne({ name, email, registrationNumber, password, role }))
}

const validateUserById = async (id) => {
  return connection()
   .then((db) => db.collection('users').findOne({ _id: ObjectID(id) }))
}

module.exports = {
    validateUser,
    userRegister,
    validateUserById,
};
