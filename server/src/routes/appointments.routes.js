const { Router } = require('express');
const appointmentsController = require('../controllers/appointmentsController')();

function appointmentsRouter() {
  const routes = Router();

  routes.route('/')
    .post(appointmentsController.createOne);
  routes.route('/day/:date')
    .get(appointmentsController.getDayAppointments);
  routes.route('/:appointmentId')
    .get(appointmentsController.getById)
    .delete(appointmentsController.deleteById)
    .put(appointmentsController.updateById);

  return routes;
}

module.exports = appointmentsRouter();
