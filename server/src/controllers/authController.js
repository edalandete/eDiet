/* eslint-disable no-underscore-dangle */
const passport = require('passport');
const jwt = require('jsonwebtoken');

function authController() {
  async function signup(req, res) {
    res.json({
      message: 'Signup successful',
      user: req.user,
    });
  }

  async function login(req, res, next) {
    passport.authenticate(
      'login',
      async (err, user) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');

            return next(error);
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, email: user.email };
              const token = jwt.sign({ user: body }, process.env.SECRET_OR_KEY);
              return res.json({ user, token });
            },
          );
        } catch (error) {
          return next(error);
        }
      },
    )(req, res, next);
  }

  return {
    signup,
    login,
  };
}

module.exports = authController;
