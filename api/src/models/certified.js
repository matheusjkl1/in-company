const connection = require('./connection');
const ObjectID = require('mongodb').ObjectId;

const getAllCertifiedByUser = async (registrationNumber) => {
  return connection()
    .then((db) => db.collection('certified').find({ registrationNumber }).toArray())
    .then((items) => {
      return items.map(({
        _id, registrationNumber, certifiedName, certifiedImage, certifiedDescript, hours, status,
      }) => {
        return {
          id: _id, registrationNumber, certifiedName, certifiedImage, certifiedDescript, hours, status,
        };
      });
    });
};

const getCertifiedByUserId = async (id) => {
  return connection()
    .then((db) => db.collection('certified').findOne({ _id: ObjectID(id) }).toArray())
    .then((items) => {
      return items.map(({
        _id, registrationNumber, certifiedName, certifiedImage, certifiedDescript, hours
      }) => {
        return {
          id: _id, registrationNumber, certifiedName, certifiedImage, certifiedDescript, hours
        };
      });
    });
};

const getCertifiedById = async (id) => {
  return connection()
    .then((db) => db.collection('certified').findOne({ _id: ObjectID(id) }))
    .then(({ _id, registrationNumber, certifiedName, certifiedImage, certifiedDescript, hours }) => {
      return {
        id: _id, registrationNumber, certifiedName, certifiedImage, certifiedDescript, hours
      };
    });
};

const registerCertified = async ( { registrationNumber, certifiedImage, certifiedName, certifiedDescript, hours, status }) => {
  const response = await connection().then((db) => db
    .collection('certified')
    .insertOne({
      registrationNumber, certifiedName, certifiedImage, certifiedDescript, hours, status
    })).catch((err) => (err));

  return response;
};

const updateCertified = async ({ id, registrationNumber, certifiedImage, certifiedName, certifiedDescript, hours, status }) => {
  const query = { _id: ObjectID(id) }
  const newValues = { $set: { registrationNumber, certifiedImage, certifiedName, certifiedDescript, hours, status } }
  const response = await connection().then((db) => db
    .collection('certified')
    .updateOne(query, newValues)).catch((err) => (err));

  return response;
};

const updateStatus = async ({ id, status }) => {
  const query = { _id: ObjectID(id) }
  const newValues = { $set: { status } }
  const response = await connection().then((db) => db
    .collection('certified')
    .updateOne(query, newValues)).catch((err) => (err));

  return response;
};

const getAllCertified = async () => {
  return connection()
    .then((db) => db.collection('certified').find().toArray())
    .then((items) => {
      return items.map(({
        _id, registrationNumber, certifiedName, certifiedImage, certifiedDescript, hours, status,
      }) => {
        return {
          id: _id, registrationNumber, certifiedName, certifiedImage, certifiedDescript, hours, status,
        };
      });
    });
};

const deleteCertified = async (id) => {
  return connection()
    .then((db) => db.collection('certified').deleteOne({ _id: ObjectID(id) }))
    .then((item) => {
      return {
        item,
      };
    });
};

module.exports = {
  registerCertified,
  getAllCertifiedByUser,
  getCertifiedByUserId,
  getCertifiedById,
  updateCertified,
  getAllCertified,
  updateStatus,
  deleteCertified,
}