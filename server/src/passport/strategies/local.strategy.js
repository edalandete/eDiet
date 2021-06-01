const passport = require('passport');
const LocalStrategy = require('passport-local');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const md5 = require('md5');
const Dietician = require('../../models/dietician.model');

module.exports = function localStrategyConfig() {
  passport.use(
    'signup',
    new LocalStrategy.Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },

      async (req, email, password, done) => {
        try {
          const existingUser = await Dietician.findOne({ email });
          if (existingUser) {
            return done(null, false, { message: 'User alredy exists' });
          }

          const user = await Dietician.create(
            {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              idCard: req.body.idCard,
              schedule: req.body.schedule,
              email: email.toLowerCase(),
              password: md5(password),
            },
          );

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );
  passport.use(
    'login',
    new LocalStrategy.Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await Dietician.findOne({ email });

          if (!user) {
            return done(null, false, { message: 'User not found' });
          }

          const validate = await user.verifyPassword(password);

          if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
          }

          return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
          return done(error);
        }
      },
    ),
  );
  passport.use(
    new JWTstrategy(
      {
        secretOrKey: process.env.SECRET_OR_KEY,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );
};