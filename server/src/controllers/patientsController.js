const debug = require('debug')('app:patientsController');
const Patient = require('../models/patient.model');

function patientsController() {
  async function getAllByName(req, res) {
    let patient = null;
    if (req.query.fullName) { patient = { fullName: { $regex: req.query.fullName, $options: 'i' } }; }
    try {
      debug('dentro de la function getAllByName');
      const patients = await Patient.find(patient);
      res.json(patients);
    } catch (error) {
      res.send(404);
    }
  }

  async function createOne(req, res) {
    const newPatient = new Patient(req.body);

    try {
      debug('dentro de la function createOne');
      await newPatient.save();
      res.json(newPatient);
    } catch (error) {
      res.send(error);
      debug(error);
    }
  }

  async function getById(req, res) {
    const { patientId } = req.params;

    try {
      debug('dentro de la function getById');
      const patientById = await Patient.findById(patientId).populate(['diet', 'appointment']);
      res.status(200);
      res.json(patientById);
    } catch (error) {
      res.status(404);
      res.send(`The appointment with the id ${patientId} doesn't exist`);
    }
  }

  async function updateById(req, res) {
    const { patientId } = req.params;
    const updatedData = req.body;
    try {
      debug('dentro de la function updateById');
      const updatedPatient = await Patient.findByIdAndUpdate(
        patientId,
        updatedData,
        { new: true },
      );

      res.json(updatedPatient);
    } catch (error) {
      res.send(404);
      debug(error);
    }
  }

  return {
    getAllByName,
    createOne,
    getById,
    updateById,
  };
}

module.exports = patientsController;
