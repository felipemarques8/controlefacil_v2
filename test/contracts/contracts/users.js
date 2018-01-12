import jwt from 'jwt-simple';

describe('Routes Users', () => {
  const User = server.datasource.models.Users;
  const jwtSecrets = server.config.jwtSecret;
  const defaultUsers = {
    id: 1,
    name: 'Default User',
    email: 'lipemarques8@gmail.com',
    password: 'felipe123@',
  };

  let token;
  beforeEach((done) => {
    User
      .destroy({ where: {} })
      .then(() => User.create(defaultUsers))
      .then((user) => {
        token = jwt.encode({ id: user.id }, jwtSecrets);
        done();
      });
  });

  describe('Route GET /users', () => {
    it('should return a list of users', (done) => {
      const usersList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        email: Joi.string(),
        password: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      }));
      request
        .get('/users')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          joiAssert(res.body, usersList);
          done(err);
        });
    });
  });

  describe('Route GET /user/{id}', () => {
    it('should return a user', (done) => {
      const user = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        email: Joi.string(),
        password: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });
      request
        .get('/user/1')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          joiAssert(res.body, user);
          done(err);
        });
    });
  });

  describe('Route POST /users', () => {
    it('should create a users', (done) => {
      const newUsers = {
        id: 2,
        name: 'New User',
        email: 'karinebarreto10@gmail.com',
        password: 'karine123@',
      };

      const user = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        email: Joi.string(),
        password: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });

      request
        .post('/users')
        .send(newUsers)
        .end((err, res) => {
          joiAssert(res.body, user);
          done(err);
        });
    });
  });

  describe('Route PUT /user/{id}', () => {
    it('should update a users', (done) => {
      const updateUser = {
        id: 1,
        name: 'Updated User',
        email: 'updated10@gmail.com',
        password: 'karine123@',
      };

      const updatedCount = Joi.array().items(1);

      request
        .put('/user/1')
        .set('Authorization', `bearer ${token}`)
        .send(updateUser)
        .end((err, res) => {
          joiAssert(res.body, updatedCount);
          done(err);
        });
    });
  });

  describe('Route DELETE /user/{id}', () => {
    it('should delete a users', (done) => {
      request
        .delete('/user/1')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});

