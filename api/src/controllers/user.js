const rescue = require('express-rescue');
const service = require('../service/user');

const login = ('/login', rescue(async (req, res, next) => {
  const user = await service.login(req.body);

  if (user.error) {
    return next({
      statusCode: 404,
      message: 'Not Found',
    });
  }
  return res.status(200).json(user);
}));

const register = ('/register', rescue(async (req, res, next) => {
  const user = await service.registerUser(req.body);

  if (user.error) {
    return next({
      statusCode: 404,
      message: 'Not Found',
    });
  }

  return res.status(200).json(user);
}));

module.exports = {
  login,
  register,
};