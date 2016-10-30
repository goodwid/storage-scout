const storageScout = require ('../index.js');
const assert = require('chai').assert;


describe('books module',() => {

  describe('on create', () =>{

    it('writes to json file and returns an object', ( done ) =>{
      storageScout.create({title:'herbook', pub_year:'1986'})
      .then(data => {
        assert.isJson(data);
        done();
      })
      .catch(error =>{
        assert.isOk(error);
        done();
      });
    });

  });

  describe('on update', () =>{
    it('renames a filename and resource and returns an object', (done) =>{
      storageScout.update(1, {title:'herbook', pub_year:'2008', resource:'herbook_2008'})
      .then( data => {
        assert.isOk(data);
        done();
      })
      .catch( err => {
        assert.isOk(err);
        done();
      });
    });

  });

  describe('on delete', () =>{

    it('returns a delete message', (done) =>{
      storageScout.delete(1)
      .then( data => {
        assert.equal(data.message, 'deleted herbook_2008');
        done();
      })
      .catch( err => {
        assert.isOk(err);
        done();
      });
    });

  });
});
