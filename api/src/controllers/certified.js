const rescue = require('express-rescue');
const multer = require('multer');
const validateJwt = require('../middlewares/validateJwt.js');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => { callback(null, 'uploads/'); },
  filename: (_req, _file, callback) => { callback(null, `${new Date().toISOString()}.jpeg`); },
});

const upload = multer({ storage });

const service = require('../service/certified');

const getCertifiedById = ('/certified/:id', [
  validateJwt,
  rescue(async (req, res, next) => {
    const { id } = req.params;
    const certified = await service.findCertifiedById(id);

    if (certified.error) {
      return next({
        statusCode: 404,
        message: certified.error,
      });
    }
    return res.status(200).json(certified);
})]);

const getCertifiedByUser = ('/certified', [
  validateJwt,
  rescue(async (req, res, next) => {

    const UserRegistrationNumber = req.user;

    const certified = await service.findCertified(UserRegistrationNumber);
    
    if (certified.error) {
      return next({
        statusCode: 404,
        message: certified.error,
      });
    }
    return res.status(200).json(certified);
  })
]);

const registerCertified = ('/certified', [validateJwt, upload.single('file'), rescue(async (req, res, next) => {
  console.log(req.body);
  const certified = await service.registerCertified(req.file.path, req.user, req.body);
  if (certified.error) {
    return next({
      statusCode: 404,
      message: certified.error,
    });
  }
  return res.status(200).json(certified);
})]);

const updateCertified = ('/certified', [validateJwt, upload.single('file'), rescue(async (req, res, next) => {
  const { id } = req.params;
  let image = ""
  if (req.file) {
    image = req.file.path
  } else {
    image = req.body.file
  }

  const certified = await service.updateCertified(id, image, req.user, req.body);
  if (certified.error) {
    return next({
      statusCode: 404,
      message: certified.error,
    });
  }
  return res.status(200).json(certified);
})]);

const updateStatus = ('/certified', [validateJwt, rescue(async (req, res, next) => {
  const { id } = req.params;
  const certified = await service.updateStatus(id, req.body);
  if (certified.error) {
    return next({
      statusCode: 404,
      message: certified.error,
    });
  }
  return res.status(200).json(certified);
})]);

const getAllCertified = ('/admin/certified', [validateJwt, rescue(async (_req, res, next) => {
  const certified = await service.getAllCertified();
  if (certified.error) {
    return next({
      statusCode: 404,
      message: certified.error,
    });
  }
  return res.status(200).json(certified);
})]);

const deleteCertified = ('/certified/:id', [
  validateJwt,
  rescue(async (req, res, next) => {
    const { id } = req.params;
    const certified = await service.deleteCertified(id);

    if (certified.error) {
      return next({
        statusCode: 404,
        message: certified.error,
      });
    }
    return res.status(200).json(certified);
})]);

module.exports = {
  getCertifiedByUser,
  getCertifiedById,
  registerCertified,
  updateCertified,
  getAllCertified,
  updateStatus,
  deleteCertified,
};