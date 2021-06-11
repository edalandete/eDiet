const { Router } = require('express');
const passport = require('passport');
const authController = require('../controllers/authController')();

function authRouter() {
  const routes = Router();

  routes.route('/signup')
    .post(passport.authenticate('signup', { session: false }),
      authController.signup);

  routes.route('/login')
    .post(authController.login);

  return routes;
}

module.exports = authRouter();
