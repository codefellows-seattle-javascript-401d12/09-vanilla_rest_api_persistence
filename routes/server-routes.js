'use strict';


const Note = require('../model/note.js');
const storage = require('../lib/storage-persistance.js');
const response = require('../lib/response.js');
const Router = require('../lib/router.js');
const router = new Router();



module.exports = function(router){
  router.get('/api/note', function(req,res){
    if(req.url.query.id){
      storage.fetchItem('note', req.url.query.id)
      .then(note => {
        if(!note.id){
          res.writeHead(204, {'Content': 'text/plain'});
          res.write('no content in the body');
          res.end();
        }
        if(note.id){
          response.sendJSON(res, 200, note);
        }
      })
      .catch(err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
      });
      return;
    }
  });

  router.post('/api/note', function(req,res){
    try{
      var note = new Note(req.body.name, req.body.content, req.body.favFood, req.body.place);
      storage.createItem('note', note)
      .then(item => {
        response.sendJSON(res, 200, item);
        res.end();
      })
      .catch(err => {
        console.error(err);
        response.sendText(res, 404, 'bad request');
      });
      return;
    } catch(err){
      console.error(err);
      response.sendText(res, 400, 'bad request');
    }
  });

  router.delete('/api/note', function(req,res){
    if(req.url.query.id){
      storage.fetchDel('note', req.url.query.id)
       .then(() => {
         response.sendText(res, 200, 'item deleted!');
         res.end();
       })
       .catch(err => {
         console.error(err);
         response.sendText(res, 404, 'not found');
         res.end();
       });
    }
    return;
  });

  router.put('/api/note', function(req,res){
    if(req.body.id){
      try{
        var note = new Note(req.body.name, req.body.content, req.body.favFood, req.body.place);
        note.id = req.body.id;
        storage.createItem('note', note)
        .then(() => {
          response.sendJSON(res, 200, note);
        });
      }
      catch(err){
        console.error(err);
        response.sendText(res, 400, 'bad request');
      }
    }
    if(!req.body.id) response.sendText(res, 400, 'bad request : id missing');
  });
};
