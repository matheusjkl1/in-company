const CertifiedModel = require('../models/certified');

const findCertified = async ({ cpf }) => {
  const certified = await CertifiedModel.getAllCertifiedByUser(cpf)

  if (!certified) return { error: 'not_found_certified' };

  return certified

};

const registerCertified = async (certifiedImage, { cpf, certifiedName, certifiedDescript, hours }) => {
  const certified = await CertifiedModel.registerCertified({
    cpf, certifiedName, certifiedImage, certifiedDescript, hours
  })

  if (!certified) return { error: 'certified_not_register' };

  return certified

};

module.exports = {
  registerCertified,
  findCertified,
}