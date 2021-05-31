const { Router } = require('express');
const heroesController = require('../controllers/dieticiansController')();

function dieticiansRouter() {
  const routes = Router();

  routes.route('/')
    .get(heroesController.getAll)
    .post(heroesController.createOne);
  routes.route('/:dieticianId')
    .get(heroesController.getById)
    .delete(heroesController.deleteById)
    .put(heroesController.updateById);

  return routes;
}

module.exports = dieticiansRouter();
