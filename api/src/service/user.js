require('dotenv').config();
const md5 = require('md5');
const { validateUser, userRegister } = require('../models/user');
const generateToken = require('../utils/generateToken');

const login = async ({ registrationNumber, password: passwordUser }) => {
  const passwordMd5 = md5(passwordUser);
  const checkUserAlreadyExists = await validateUser({ registrationNumber, password: passwordMd5 });
  if (checkUserAlreadyExists) {

    const { _id: id, password, email, ...userWithOutPassword } = checkUserAlreadyExists;

    const token = generateToken(id);

    return { ...userWithOutPassword, token };
  } 

  return { error: 'user_not_found' };
};

const registerUser = async ({ name, email, password: passwordUser }) => {
  const registrationNumber = (Math.floor(100000000 + Math.random() * 900000000)).toString();

  const passwordMd5 = md5(passwordUser);

    const modelResponse = await userRegister({
      name,
      email,
      registrationNumber,
      password: passwordMd5,
      role: 'user'
    })
  
    const { _id: id, password, ...userWithOutPassword } = modelResponse;
  
    const token = generateToken(id);
  
    return { ...userWithOutPassword, token };

};

module.exports = {
  login,
  registerUser,
};