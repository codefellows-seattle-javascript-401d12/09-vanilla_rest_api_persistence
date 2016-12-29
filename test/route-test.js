'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');
var note = null;

describe('note routes', function(){
  describe('POST: /api/note', function(){
    it('should generate a note', function(done){
      request.post('localhost:3000/api/note')
      .send({name:'apple', content:'apple is a fruit'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        console.log('res.body= ', res.body);
        expect(res.body.name).to.equal('apple');
        expect(res.body.content).to.equal('apple is a fruit');
        note = res.body;
        done();
      });
    });
  });

  describe('GET: /api/note', function(){
    it('should return note', function(done){
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
    it('should return note', function(done){
      request.put(`localhost:3000/api/note?id=${note.id}`)
      .send({name:'test name', content:'test content', favFood:'food', place:'place', id:`${note.id}`})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(`${note.id}`);
        expect(res.body.name).to.equal('test name');
        expect(res.body.content).to.equal('test content');
        expect(res.body.favFood).to.equal('food');
        expect(res.body.place).to.equal('place');
        done();
      });
    });
  });
  describe('DELETE: /api/note', function(){
    it('should delete note', function(done){
      console.log('note id= ', note.id);
      request.delete(`localhost:3000/api/note?id=${note.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal(undefined);
        expect(res.body.content).to.equal(undefined);
        done();
      });
    });
  });
});
