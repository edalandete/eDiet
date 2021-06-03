const { model, Schema } = require('mongoose');

const appointmentsSchema = Schema({
  dieticianId: String,
  patient: { type: Schema.Types.ObjectId, ref: 'Patients' },
  patientName: String,
  date: String,
  time: String,
});

module.exports = model('Appointments', appointmentsSchema);
