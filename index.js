import server from './app';

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`%s listening at http://localhost:${port}`, server.name);
});
