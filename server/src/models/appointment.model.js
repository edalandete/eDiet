const { model, Schema } = require('mongoose');

const appointmentsSchema = Schema({
  dieticianId: String,
  patientId: String,
  patientName: String,
  date: String,
  time: String,
});

module.exports = model('Appointments', appointmentsSchema);
