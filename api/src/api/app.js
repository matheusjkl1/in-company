require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const middlewares = require('../middlewares/error');
const userController = require('../controllers/user');
const certifiedController = require('../controllers/certified');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));

app.use('/uploads', express.static('uploads'));

app.post('/login', userController.login);

app.post('/register', userController.register)

app.get('/admin/certified', certifiedController.getAllCertified)

app.put('/admin/certified/:id', certifiedController.updateStatus)

app.get('/certified/:id', certifiedController.getCertifiedById)

app.get('/certified', certifiedController.getCertifiedByUser)

app.post('/certified', certifiedController.registerCertified)

app.put('/certified/:id', certifiedController.updateCertified)

app.use(middlewares)

module.exports = app;
