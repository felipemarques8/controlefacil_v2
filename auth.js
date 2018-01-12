import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export default (server) => {
  const User = server.datasource.models.Users;
  const opts = {};
  opts.secretOrKey = server.config.jwtSecret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

  const strategy = new Strategy(opts, (payload, done) => {
    User.findById(payload.id)
      .then((user) => {
        if (user) {
          return done(null, {
            id: user.id,
            email: user.email,
          });
        }
        return done(null, false);
      })
      .catch(error => done(error, null));
  });

  passport.use(strategy);

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', server.config.jwtSecret),
  };
};
