const passport = require("passport");
const User = require("./models/users");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.TOKEN_KEY,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    let user = await User.findOne({ username: jwt_payload.username });

    if (user) {
      return done(null, user);
    }
    return done(null, false);
  })
);

const auth = passport.authenticate("jwt", { session: false });

module.exports = { passport, auth };
