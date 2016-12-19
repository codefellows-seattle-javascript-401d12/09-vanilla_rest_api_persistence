'use strict';
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

const storage = {};

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

    console.log('here I am!!');
    fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then(data => {
      if(data){
        fs.unlinkSyncProm(`${__dirname}/../data/${schemaName}/${id}.json`);
        return resolve();
      }
      if(!data) return reject(new Error('item not found'));
    })
    .catch(err => Promise.reject(err));
  });
};

exports.put = function(schemaName, id, item){
  return new Promise(function(resolve, reject){
    if(!schemaName) return reject (new Error('schemaName expected'));
    if(!id) return reject(new Error('item id expected!!'));
    if(!item) return reject(new Error('item expected!'));

    fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then(data => {
      if(data){
        var itemFound = JSON.parse(data.toString());

        if(item.name) itemFound.name = item.name;
        if(item.content) itemFound.content = item.content;
        if(item.favFood) itemFound.favFood = item.favFood;
        if(item.place) itemFound.place = item.place;

        return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${id}.json`, JSON.stringify(itemFound))
      .then(() => resolve(item))
      .catch(err => Promise.reject(err));
      }
      if(!data) return reject(new Error('item not found'));
    })
    .catch(err => Promise.reject(err));
  });
};
