'use strict';
const http = require('http');
const PORT = 3000;
const Router = require('./lib/router.js');
const router = new Router();
require('./routes/server-routes.js')(router);

const server = http.createServer(router.route());

server.listen(PORT, function(){
  console.log('server is on!!');
});
