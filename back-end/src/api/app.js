require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const middlewares = require('../middlewares/error')
const userController = require('../controllers/user')
const certifiedController = require('../controllers/certified')

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(`${__dirname}/public`));

app.use('/uploads', express.static('uploads'));

app.post('/login', userController.login);

app.post('/register', userController.register)

app.get('/certified', certifiedController.getCertifiedByUser)

app.post('/certified', certifiedController.registerCertified)

app.use(middlewares)

module.exports = app;
