'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('note routes', function(){
  var note = null;
  describe('POST: /api/note', function(){
    it('should post a note', function(done){
      request.post('localhost:3000/api/note')
      .send({name:'apple', content:'apple is a fruit'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('apple');
        expect(res.body.content).to.equal('apple is a fruit');
        note = res.body;
        done();
      });
    });
  });
  describe('GET: /api/note', function(){
    it('should get and return note', function(done){
      request.get(`localhost:3000/api/note?id=${note.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('apple');
        expect(res.body.content).to.equal('apple is a fruit');
        done();
      });
    });
  });
  describe('PUT: /api/note', function(){
    it('should update the note', function(done){
      request.put('localhost:3000/api/note')
      .send({id: `${note.id}`, name:'Banana', content:'Eat yummy banana every day!!', favFood:'Banana shake', place:'Seattle'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Banana');
        expect(res.body.content).to.equal('Eat yummy banana every day!!');
        expect(res.body.favFood).to.equal('Banana shake');
        expect(res.body.place).to.equal('Seattle');
        done();
      });
    });
  });
  describe('DELETE: /api/note', function(){
    it('should delete the note', function(done){
      request.delete(`localhost:3000/api/note?id=${note.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
});
