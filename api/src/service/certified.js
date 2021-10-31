const CertifiedModel = require('../models/certified');

const findCertified = async (registrationNumber) => {
  const certified = await CertifiedModel.getAllCertifiedByUser(registrationNumber)

  if (!certified.length) return { error: 'not_found_certified' };

  return certified
};

const findCertifiedById = async (id) => {
  const certified = await CertifiedModel.getCertifiedById(id);

  if (!certified) return { error: 'not_found_certified' };

  return certified
};

const registerCertified = async (certifiedImage, registrationNumber, { name: certifiedName, descript: certifiedDescript, hours }) => {
  const certified = await CertifiedModel.registerCertified({
    registrationNumber, certifiedName, certifiedImage, certifiedDescript, hours, status:'Não-Homologado'
  })

  if (!certified) return { error: 'certified_not_register' };

  return certified
};


const updateCertified = async (id, certifiedImage, registrationNumber, { name: certifiedName, descript: certifiedDescript, hours }) => {

  const certified = await CertifiedModel.updateCertified({
    id, registrationNumber, certifiedName, certifiedImage, certifiedDescript, hours, status:'Não-Homologado'
  })

  if (!certified) return { error: 'certified_not_register' };

  return certified
};

const updateStatus = async (id, { status }) => {
  const certified = await CertifiedModel.updateStatus({
    id, status
  })
  if (!certified) return { error: 'certified_not_register' };

  return certified
};

const getAllCertified = async () => {
  const certified = await CertifiedModel.getAllCertified()

  if (!certified.length) return { error: 'not_found_certified' };

  return certified
};

module.exports = {
  registerCertified,
  findCertified,
  findCertifiedById,
  updateCertified,
  getAllCertified,
  updateStatus,
}