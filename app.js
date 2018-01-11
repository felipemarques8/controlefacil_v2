import restify from 'restify';
import config from './config/config';
import datasource from './config/datasource';
import usersRouter from './routes/users';

const server = restify.createServer({
  name: 'Controlle Fácil',
  url: 'localhost',
  version: '1.0.0',
});

server.config = config;
server.datasource = datasource(server);

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

const User = server.datasource.models.Users;

usersRouter(server, User);

export default server;
