const debug = require('debug')('app:dieticiansController');
const Dietician = require('../models/dietician.model');
const Appointment = require('../models/appointment.model');
const { calculateAvailableHours } = require('../helpers/datesHelper');

function dieticiansController() {
  async function getAll(req, res) {
    try {
      const dieticians = await Dietician.find();
      res.json(dieticians);
    } catch (error) {
      res.send(404);
    }
  }

  async function createOne(req, res) {
    const newDietician = new Dietician(req.body);

    try {
      await newDietician.save();
      res.json(newDietician);
    } catch (error) {
      res.send(error);
      debug(error);
    }
  }

  async function getById(req, res) {
    const { dieticianId } = req.params;

    try {
      const dieticianById = await Dietician.findById(dieticianId);
      res.status(200);
      res.json(dieticianById);
    } catch (error) {
      res.status(404);
      res.send(`The user with the id ${dieticianId} doesn't exist`);
    }
  }

  async function deleteById(req, res) {
    const { dieticianId } = req.params;

    try {
      await Dietician.findByIdAndDelete(dieticianId);
      res.status(204);
    } catch (error) {
      res.status(404);
    }
  }

  async function updateById(req, res) {
    const { dieticianId } = req.params;
    const updatedData = req.body;
    try {
      const updatedDietician = await Dietician.findByIdAndUpdate(
        dieticianId,
        updatedData,
        { new: true },
      );

      res.json(updatedDietician);
    } catch (error) {
      res.send(404);
      debug(error);
    }
  }

  async function getAvailableHours(req, res) {
    const { date } = req.params;
    const { dieticianId } = req.body;

    try {
      debug('dentro de la function getAvailableHours');
      const { schedule } = await Dietician.findById(dieticianId);
      const appointments = await Appointment.find({ date });
      const availableHours = calculateAvailableHours(schedule, date, appointments);
      res.json(availableHours);
    } catch (error) {
      res.send(404);
    }
  }

  return {
    getAll,
    createOne,
    getById,
    deleteById,
    updateById,
    getAvailableHours,
  };
}

module.exports = dieticiansController;
