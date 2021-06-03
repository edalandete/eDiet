const { model, Schema } = require('mongoose');

const patientsSchema = Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: Number,
  birthdate: Date,
  idCard: String,
  bmi: String,
  picture: String,
  height: String,
  weight: [String],
  perimeter: {
    biceps: String,
    shoulders: String,
    wist: String,
    back: String,
    quadriceps: String,
  },
  goal: String,
  lastVisit: Date,
  diet: { type: Schema.Types.ObjectId, ref: 'Diets' },
  appointment: { type: Schema.Types.ObjectId, ref: 'Appointments' },
  isActive: Boolean,

});

module.exports = model('Patients', patientsSchema);
