const { Router } = require('express');
const patientsController = require('../controllers/patientsController')();

function patientsRouter() {
  const routes = Router();

  routes.route('/')
    .post(patientsController.createOne);
  routes.route('/:patientId')
    .get(patientsController.getById)
    .put(patientsController.updateById);

  return routes;
}

module.exports = patientsRouter();
