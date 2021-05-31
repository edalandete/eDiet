const { model, Schema } = require('mongoose');

const dietsSchema = Schema({
  type: String,
  breakfast: String,
  midDay: String,
  lunch: String,
  snack: String,
  dinner: String,
});

module.exports = model('Diets', dietsSchema);
