const { model, Schema } = require('mongoose');

const patientsSchema = Schema({
  firstName: String,
  lastName: String,
  email: String,
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
  diet: [Schema.Types.ObjectId],
  appointment: [Schema.Types.ObjectId],
  isActive: Boolean,

});

module.exports = model('Patients', patientsSchema);
