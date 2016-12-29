'use strict';
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});


module.exports = exports = {};

exports.createItem = function(schemaName, item){
  if(!schemaName) return Promise.reject(new Error('expected schemaName'));
  if(!item) return Promise.reject(new Error('expected item'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
.then(() => item)
.catch(err => Promise.reject(err));
};

exports.fetchItem = function(schemaName, id){

  return new Promise(function(resolve, reject) {
    if(!schemaName) return reject(new Error('schemaName expected'));
    return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then(data => {
      let item = JSON.parse(data.toString());
      console.log('data:= ', item);
      return  resolve(item);
    })
     .catch(err => Promise.reject(err));
  });
};

exports.fetchDel = function(schemaName, id){
  return new Promise(function(resolve, reject){
    if(!schemaName) return reject(new Error('schemaName expected!'));
    if(!id) return reject(new Error('id expected!'));

    fs.readdirProm(`${__dirname}/../data/${schemaName}`)
    .then( data => {
      console.log(data);


      var files = data.filter(function(item){
        return item === `${id}.json`;
      });
      console.log('files ', files);
      if(files[0]){
        fs.unlinkSyncProm(`${__dirname}/../data/${schemaName}/${id}.json`);
        return resolve();
      }
      if(!files[0]){
        return  reject(new Error('item not found'));
      }
    }).catch(err => Promise.reject(err));


  });
};
