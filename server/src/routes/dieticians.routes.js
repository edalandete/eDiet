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
  routes.route('/day/:date')
    .get(dieticiansController.getAvailableHours);
  return routes;
}

module.exports = dieticiansRouter();
