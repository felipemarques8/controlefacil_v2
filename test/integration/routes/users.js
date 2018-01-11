describe('Routes Users', () => {
  const User = server.datasource.models.Users;
  const defaultUsers = {
    id: 1,
    name: 'Default User',
    email: 'lipemarques8@gmail.com',
    password: 'felipe123@',
  };
  beforeEach((done) => {
    User
      .destroy({ where: {} })
      .then(() => User.create(defaultUsers))
      .then(() => {
        done();
      });
  });

  describe('Route GET /users', () => {
    it('should return a list of users', (done) => {
      request
        .get('/users')
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultUsers.id);
          expect(res.body[0].name).to.be.eql(defaultUsers.name);
          expect(res.body[0].email).to.be.eql(defaultUsers.email);

          done(err);
        });
    });
  });

  describe('Route GET /user/{id}', () => {
    it('should return a user', (done) => {
      request
        .get('/user/1')
        .end((err, res) => {
          expect(res.body.name).to.be.eql(defaultUsers.name);
          expect(res.body.id).to.be.eql(defaultUsers.id);
          expect(res.body.email).to.be.eql(defaultUsers.email);

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

      request
        .post('/users')
        .send(newUsers)
        .end((err, res) => {
          expect(res.body.name).to.be.eql(newUsers.name);
          expect(res.body.email).to.be.eql(newUsers.email);

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
      };

      request
        .put('/user/1')
        .send(updateUser)
        .end((err, res) => {
          expect(res.body).to.be.eql([1]);

          done(err);
        });
    });
  });

  describe('Route DELETE /user/{id}', () => {
    it('should delete a users', (done) => {
      request
        .delete('/user/1')

        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);

          done(err);
        });
    });
  });
});
