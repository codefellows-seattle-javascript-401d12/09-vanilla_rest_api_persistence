'use strict';
const Router = require('./router.js');

module.exports = exports = {};

exports.sendJSON = function(res, status, data){
  res.writeHead(status, {
    'content-Type':'application/json'
  });

  res.write(JSON.stringify(data));
  res.end();
};

exports.sendText = function(res, status, msg){
  res.writeHead(status, {
    'content-Type':'text/plain'
  });
  res.write(msg);
  res.end();
};
