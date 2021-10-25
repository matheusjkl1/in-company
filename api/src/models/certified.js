const connection = require('./connection');

const getAllCertifiedByUser = async (cpf) => {
  return connection()
    .then((db) => db.collection('certified').find({ cpf: cpf }).toArray())
    .then((items) => {
      return items.map(({
        _id, userCpf, certifiedName, certifiedImage, certifiedDescript, hours
      }) => {
        return {
          id: _id, userCpf, certifiedName, certifiedImage, certifiedDescript, hours
        };
      });
    });
};

const registerCertified = async ( { cpf, certifiedImage, certifiedName, certifiedDescript, hours }) => {
  const response = await connection().then((db) => db
    .collection('certified')
    .insertOne({
      cpf, certifiedName, certifiedImage, certifiedDescript, hours
    })).catch((err) => (err));

  return response;
};

module.exports = {
  registerCertified,
  getAllCertifiedByUser
}