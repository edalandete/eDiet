const debug = require('debug')('server:heroesController');
const chalk = require('chalk');
const Dietician = require('../models/dietician.model');

function heroesController() {
  async function getAll(req, res) {
    try {
      debug(`dentro de la función ${chalk.magenta('getAll')}`);
      const users = await Dietician.find();
      res.json(users);
    } catch (error) {
      res.send(404);
    }
  }

  async function createOne(req, res) {
    const newDietician = new Dietician(req.body);

    try {
      debug(`dentro de la función ${chalk.magenta('createOne')}`);
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
      debug(`dentro de la función ${chalk.magenta('getById')}`);
      const dieticianById = await Dietician.findById(dieticianId);
      res.status(200);
      res.json(dieticianById);
    } catch (error) {
      res.status(404);
      res.send(`The hero with the id ${dieticianId} doesn't exist`);
      debug(error);
    }
  }

  async function deleteById(req, res) {
    const { dieticianId } = req.params;
    try {
      debug(`dentro de la función ${chalk.magenta('deleteById')}`);
      await Dietician.findByIdAndDelete(dieticianId);
      res.status(204);
      res.json();
    } catch (error) {
      res.status(404);
      debug(error);
    }
  }

  async function updateById(req, res) {
    const { dieticianId } = req.params;
    const updateData = req.body;
    try {
      debug(`dentro de la función ${chalk.magenta('updateById')}`);

      const updatedDietician = await Dietician.findByIdAndUpdate(
        dieticianId,
        updateData,
        { new: true },
      );
      res.json(updatedDietician);
    } catch (error) {
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

module.exports = heroesController;
