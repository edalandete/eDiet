const debug = require('debug')('app:dietsController');
const Diet = require('../models/diet.model');

function dieticiansController() {
  async function getAll(req, res) {
    try {
      debug('dentro de la function getAll');
      const diets = await Diet.find();
      res.json(diets);
    } catch (error) {
      res.send(404);
    }
  }

  async function createOne(req, res) {
    debug('dentro de la function createOne');
    const newDiet = new Diet(req.body);
    try {
      await newDiet.save();
      res.json(newDiet);
    } catch (error) {
      res.send(error);
      debug(error);
    }
  }

  async function getById(req, res) {
    const { dietId } = req.params;

    try {
      const dietById = await Diet.findById(dietId);
      res.status(200);
      res.json(dietById);
    } catch (error) {
      res.status(404);
      res.send(`The diet with the id ${dietId} doesn't exist`);
    }
  }

  async function deleteById(req, res) {
    const { dietId } = req.params;

    try {
      await Diet.findByIdAndDelete(dietId);
      res.status(204);
    } catch (error) {
      res.status(404);
    }
  }

  async function updateById(req, res) {
    const { dietId } = req.params;
    const updatedData = req.body;
    try {
      const updatedDiet = await Diet.findByIdAndUpdate(
        dietId,
        updatedData,
        { new: true },
      );

      res.json(updatedDiet);
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
