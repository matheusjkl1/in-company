/* eslint-disable no-unused-vars */
require('dotenv').config();
const md5 = require('md5');
const { validateUser, userRegister } = require('../models/user');
const generateToken = require('../utils/generateToken');

const login = async ({ email, password }) => {
  const passwordMd5 = md5(password);

  const user = await validateUser({ email, password: passwordMd5 });

  return user

  // if (!user.length) return { error: 'user_not_found' };

  // const token = generateToken(user.id);

  // const { id, ...withOutId } = user[0].dataValues;

  // return { ...withOutId, token };
};

const registerUser = async ({ name, email, password: passwordUser }) => {
  
  const passwordMd5 = md5(passwordUser);
  const checkUserAlreadyExists = await validateUser({ email, password: passwordMd5 });
  
  if (checkUserAlreadyExists) {
    const { _id: id, password, ...userWithOutPassword } = checkUserAlreadyExists;

    const token = generateToken(id);

    return { ...userWithOutPassword, token };
  }


  const modelResponse = await userRegister({
    name,
    email,
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