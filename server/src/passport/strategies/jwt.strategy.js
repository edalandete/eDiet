const passport = require('passport');
const JWTstrategy = require('passport-jwt');

passport.use(
  new JWTstrategy.Strategy(
    {
      secretOrKey: process.env.SECRET_OR_KEY,
      jwtFromRequest: JWTstrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
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
