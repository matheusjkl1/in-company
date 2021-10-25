const rescue = require('express-rescue');
const multer = require('multer');

const service = require('../service/certified');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => { callback(null, 'uploads/'); },
  filename: (_req, _file, callback) => { callback(null, `${new Date().toISOString()}.jpeg`); },
});

const upload = multer({ storage });

const getCertifiedByUser = ('/certified', rescue(async (req, res, next) => {
  const certified = await service.findCertified(req.body);

  if (certified.error) {
    return next({
      statusCode: 404,
      message: certified.error,
    });
  }
  return res.status(200).json(certified);
}));

const registerCertified = ('/certified',  upload.single('file'), rescue(async (req, res, next) => {
  const certified = await service.registerCertified(req.file, req.body);
  if (certified.error) {
    return next({
      statusCode: 404,
      message: certified.error,
    });
  }
  return res.status(200).json(certified);
}));

module.exports = {
  getCertifiedByUser,
  registerCertified,
};