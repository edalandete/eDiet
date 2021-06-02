const debug = require('debug')('app:patientsController');
const Patient = require('../models/patient.model');

function patientsController() {
  async function createOne(req, res) {
    const newAppointment = new Patient(req.body);

    try {
      await newAppointment.save();
      res.json(newAppointment);
    } catch (error) {
      res.send(error);
      debug(error);
    }
  }

  async function getById(req, res) {
    const { patientId } = req.params;

    try {
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
    createOne,
    getById,
    updateById,
  };
}

module.exports = patientsController;
