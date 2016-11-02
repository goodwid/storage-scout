const storageScout = require ('../index.js');
// const sander = require('sander');
const assert = require('chai').assert;

let dataId;
const testData = {
  title: 'test',
  data: 'Testing one.'
};

describe('storage-scout testing',() => {

  describe('create', () => {
    it('writes to json file and returns an object', (done) =>{
      storageScout.create(JSON.stringify(testData))
      .then(data => {
        let obj = JSON.parse(data);
        dataId = obj.id.toString();
        assert.isOk(dataId);
        done();
      })
      .catch(err =>{
        done(err);
      });
    });
    it('returns an error when given non-JSON data', (done) =>{
      storageScout.create({data: 'bad'})
      .then(data => {
        done(data);
      })
      .catch(err =>{
        assert.equal(err, '{"message":"Data provided is not valid JSON.  Please check your inputs."}');
        done();
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
      .catch(done);
    });
    it('returns an error when given non-JSON data', done =>{
      storageScout.update('1', {data: 'bad'})
      .then(data => {
        done(data);
      })
      .catch(err =>{
        assert.equal(err, '{"message":"Data provided is not valid JSON.  Please check your inputs."}');
        done();
      });
    });
  });

  describe('readOne', () =>{
    it('gets single item by id', (done) =>{
      storageScout.readOne(dataId)
      .then(data => {
        let obj = JSON.parse(data);
        assert.equal(obj.id, dataId);
        done();
      })
      .catch(done);
    });
  });

  describe('readAll', () =>{
    it('returns an array', (done) =>{
      storageScout.readAll()
      .then(data => {
        let array = JSON.parse(data);
        assert.isArray(array);
        done();
      })
      .catch(done);
    });
  });


  describe('delete', () =>{
    it('valid id request returns a delete message', (done) =>{
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
    it('invalid id returns an error message.', (done) =>{
      let badId = '34';
      storageScout.delete(badId)
      .then(data => {
        done(data);
      })
      .catch( err => {
        let obj = JSON.parse(err);
        assert.equal(obj.err, `Unable to locate ${badId}`);
        done();
      });
    });

  });
});
