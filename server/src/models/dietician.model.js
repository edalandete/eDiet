const mongoose = require('mongoose');
const md5 = require('md5');

const dieticianSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  idCard: String,
  password: String,
  schedule: {
    monday: [String],
    tuesday: [String],
    wednesday: [String],
    thursday: [String],
    friday: [String],
  },
});

dieticianSchema.methods.verifyPassword = function verifyPassword(password) {
  return md5(password) === this.password;
};

module.exports = mongoose.model('Dieticians', dieticianSchema);
