import UserController from '../controllers/user';

export default (server) => {
  const userController = new UserController(server.datasource.models.Users);

  const createUser = (req, res) => {
    userController.createUser(req.body)
      .then((response) => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  };

  const allUsers = (req, res) => {
    userController.allUsers()
      .then((response) => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  };

  const getUser = (req, res) => {
    userController.getUser(req.params)
      .then((response) => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  };

  const updateUser = (req, res) => {
    userController.updateUser(req.body, req.params)
      .then((response) => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  };

  const deleteUser = (req, res) => {
    userController.deleteUser(req.params)
      .then((response) => {
        res.send(response.statusCode);
      });
  };

  server.post('/users', createUser);
  server.get('/users', allUsers);
  server.get('/user/:id', getUser);
  server.put('/user/:id', updateUser);
  server.del('/user/:id', deleteUser);
};
