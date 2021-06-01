const { Router } = require('express');
const dieticiansController = require('../controllers/dieticiansController')();

function dieticiansRouter() {
  const routes = Router();

  routes.route('/')
    .get(dieticiansController.getAll)
    .post(dieticiansController.createOne);
  routes.route('/:dieticianId')
    .get(dieticiansController.getById)
    .delete(dieticiansController.deleteById)
    .put(dieticiansController.updateById);

  return routes;
}

module.exports = dieticiansRouter();
