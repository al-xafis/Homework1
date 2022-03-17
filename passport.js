const passport = require("passport");
const { getUserByUsername } = require("./utils");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.TOKEN_KEY,
};

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    let user = getUserByUsername(jwt_payload.username);

    if (user) {
      return done(null, user);
    }
    return done(null, false);
  })
);

const auth = passport.authenticate("jwt", { session: false });

module.exports = { passport, auth };
