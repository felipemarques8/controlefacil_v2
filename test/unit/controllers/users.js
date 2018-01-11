import UsersController from '../../../controllers/user';

describe('Controllers: Users', () => {
  describe('GET all users: getAll()', () => {
    it('should return a list of users', () => {
      const Users = {
        findAll: td.function(),
      };
      const expectedResponse = [{
        id: 1,
        name: 'Default User',
        email: 'lipemarques8@gmail.com',
        password: 'felipe123@',
        created_at: '2018-01-01T23:55:36.692Z',
        updated_at: '2018-01-01T23:55:36.692Z',
      }];

      td.when(Users.findAll({})).thenResolve(expectedResponse);

      const usersController = new UsersController(Users);
      return usersController.allUsers()
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('GET a user: getUser()', () => {
    it('should return a user', () => {
      const Users = {
        findOne: td.function(),
      };
      const expectedResponse = [{
        id: 1,
        name: 'Default User',
        email: 'lipemarques8@gmail.com',
        password: 'felipe123@',
        created_at: '2018-01-01T23:55:36.692Z',
        updated_at: '2018-01-01T23:55:36.692Z',
      }];

      td.when(Users.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);

      const usersController = new UsersController(Users);
      return usersController.getUser({ id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Create a user: createUser()', () => {
    it('should create a user', () => {
      const Users = {
        create: td.function(),
      };

      const requestBody = {
        name: 'Default User',
        email: 'lipemarques8@gmail.com',
        password: 'felipe123@',
      };

      const expectedResponse = [{
        id: 1,
        name: 'Default User',
        email: 'lipemarques8@gmail.com',
        password: 'felipe123@',
        created_at: '2018-01-01T23:55:36.692Z',
        updated_at: '2018-01-01T23:55:36.692Z',
      }];

      td.when(Users.create(requestBody)).thenResolve(expectedResponse);

      const usersController = new UsersController(Users);
      return usersController.createUser(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(201);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Update a user: updateUser()', () => {
    it('should update a user', () => {
      const Users = {
        update: td.function(),
      };

      const requestBody = {
        id: 1,
        name: 'Default User Updated',
        email: 'lipemarques8@gmail.com',
        password: 'felipe123@',
      };

      const expectedResponse = [{
        id: 1,
        name: 'Default User Updated',
        email: 'lipemarques8@gmail.com',
        password: 'felipe123@',
      }];

      td.when(Users.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);

      const usersController = new UsersController(Users);
      return usersController.updateUser(requestBody, { id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Delete a user: updateUser()', () => {
    it('should update a user', () => {
      const Users = {
        destroy: td.function(),
      };

      td.when(Users.destroy({ where: { id: 1 } })).thenResolve([]);

      const usersController = new UsersController(Users);
      return usersController.deleteUser({ id: 1 })
        .then(response => expect(response.statusCode).to.be.eql(204));
    });
  });
});
