import restify from 'restify';
import config from './config/config';
import datasource from './config/datasource';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import authorization from './auth';

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

const auth = authorization(server);

const User = server.datasource.models.Users;

server.use(auth.initialize());
server.auth = auth;

usersRouter(server, User);
authRouter(server);

export default server;
