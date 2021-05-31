const passport = require('passport');
require('./strategies/local.strategy')();

module.exports = function passportConfig(server) {
  server.use(passport.initialize());
};
