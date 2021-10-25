const connection = require('./connection');

const validateUser = async ({ email, password }) => {
    return connection()
    .then((db) => db.collection('users').findOne({ email, password }))
    .then((item) => (item));
};

const userRegister = async ({ name, email, cpf, password, role }) => {
    return connection()
    .then((db) => db.collection('users').insertOne({ name, email, cpf, password, role }))
}

module.exports = {
    validateUser,
    userRegister,
};
