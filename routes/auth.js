import HttpStatus from 'http-status';
import jwt from 'jwt-simple';
import bcrypt from 'bcrypt';
export default (server) => {
  const config = server.config;
  const User = server.datasource.models.Users;
  const token = (req, res) => {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;
      User.findOne({ where: { email } })
        .then((user) => {
          const validate = bcrypt.compareSync(password, user.password);
          if (validate) {
            const payload = { id: user.id };
            res.json({
              token: jwt.encode(payload, config.jwtSecret),
            });
          } else {
            res.send(HttpStatus.UNAUTHORIZED);
          }
        })
        .catch(() => res.send(HttpStatus.UNAUTHORIZED));
    } else {
      res.send(HttpStatus.UNAUTHORIZED);
    }
  };

  server.post('/token', token);
};
