const { Router } = require('express');
const dietsController = require('../controllers/dietsController')();

function dietsRouter() {
  const routes = Router();

  routes.route('/')
    .get(dietsController.getAll)
    .post(dietsController.createOne);
  routes.route('/:dietId')
    .get(dietsController.getById)
    .delete(dietsController.deleteById)
    .put(dietsController.updateById);

  routes.route('/type/:dietType')
    .get(dietsController.getByType);

  return routes;
}

module.exports = dietsRouter();
