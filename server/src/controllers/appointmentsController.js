const debug = require('debug')('app:appointmentsController');
const Appointment = require('../models/appointment.model');

function appointmentsController() {
  async function getDayAppointments(req, res) {
    const { date } = req.params;
    const { dieticianId } = req.body;
    try {
      debug('dentro de la function getDayAppointments');
      const appointments = await Appointment.find({ date, dieticianId });
      res.json(appointments);
    } catch (error) {
      res.send(404);
    }
  }

  async function createOne(req, res) {
    const newAppointment = new Appointment(req.body);

    try {
      await newAppointment.save();
      res.json(newAppointment);
    } catch (error) {
      res.send(error);
      debug(error);
    }
  }

  async function getById(req, res) {
    const { appointmentId } = req.params;

    try {
      const appointmentById = await Appointment.findById(appointmentId);
      res.status(200);
      res.json(appointmentById);
    } catch (error) {
      res.status(404);
      res.send(`The appointment with the id ${appointmentId} doesn't exist`);
    }
  }

  async function deleteById(req, res) {
    const { appointmentId } = req.params;

    try {
      await Appointment.findByIdAndDelete(appointmentId);
      res.status(204);
    } catch (error) {
      res.status(404);
    }
  }

  async function updateById(req, res) {
    const { appointmentId } = req.params;
    const updatedData = req.body;
    try {
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        appointmentId,
        updatedData,
        { new: true },
      );

      res.json(updatedAppointment);
    } catch (error) {
      res.send(404);
      debug(error);
    }
  }

  return {
    getDayAppointments,
    createOne,
    getById,
    deleteById,
    updateById,
  };
}

module.exports = appointmentsController;
