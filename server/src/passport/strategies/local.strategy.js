const passport = require('passport');
const LocalStrategy = require('passport-local');
const md5 = require('md5');
const Dietician = require('../../models/dietician.model');

passport.use(
  'signup',
  new LocalStrategy.Strategy(
    {
      usernameField: process.env.USERNAME_FIELD,
      passwordField: process.env.PASSWORD_FIELD,
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
      usernameField: process.env.USERNAME_FIELD,
      passwordField: process.env.PASSWORD_FIELD,
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
