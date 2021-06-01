const debug = require('debug')('app:dieticiansController');
const Dietician = require('../models/dietician.model');

function dieticiansController() {
  async function getAll(req, res) {
    try {
      debug('dentro de la function getAll');
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

  return {
    getAll,
    createOne,
    getById,
    deleteById,
    updateById,
  };
}

module.exports = dieticiansController;
