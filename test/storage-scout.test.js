const storageScout = require ('../index.js');
// const sander = require('sander');
const assert = require('chai').assert;

let dataId;
const testData = JSON.stringify({
  title: 'test',
  data: 'Testing one.'
});

describe('storage-scout testing',() => {

  describe('create', () => {
    it('writes to json file and returns an object', (done) =>{
      storageScout.create(testData)
      .then(data => {
        let obj = JSON.parse(data);
        dataId = obj.id;
        assert.isOk(dataId);
        done();
      })
      .catch(err =>{
        done(err);
      });
    });
  });

  describe('update', () =>{
    it('renames a filename and resource and returns an object', (done) =>{
      storageScout.update(dataId, JSON.stringify({title:'updated', data: 'Testing one'}))
      .then( data => {
        let obj = JSON.parse(data);
        assert.equal(obj.id, dataId);
        assert.equal(obj.title, 'updated');
        done();
      })
      .catch( err => {
        done(err);
      });
    });
  });

  describe('readOne', () =>{
    it('gets single item by id', (done) =>{
      storageScout.readOne(dataId)
      .then( data => {
        let obj = JSON.parse(data);
        assert.equal(obj.id, dataId);
        done();
      })
      .catch( err => {
        done(err);
      });
    });
  });



  describe('delete', () =>{
    it('returns a delete message', (done) =>{
      storageScout.delete(dataId)
      .then( data => {
        let obj = JSON.parse(data);
        assert.equal(obj.message, `${dataId} deleted` );
        done();
      })
      .catch( err => {
        done(err);
      });
    });

  });
});
