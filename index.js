const sander = require('sander');
const path = require('path');
const storageScout = {
  filePath: 'storageScoutFiles/',
  dir: 'storageScoutFiles'
};

if (!sander.existsSync(storageScout.dir)) sander.mkdir(storageScout.dir);

storageScout.create = function(data){
  return generateId()
  .then(id => {
    let obj = JSON.parse(data);
    obj.id = id;
    const outFile = generateFilename(id);
    const outData = JSON.stringify(obj);
    return sander.writeFile(outFile, outData);
  });
};

storageScout.readAll = function() {
  return sander.readdir(storageScout.filePath)
  .then(files => files.map(file => storageScout.filePath + file))
  .then(filefilePaths => filefilePaths.map(file => sander.readFile(file, {encoding: 'utf-8'})))
  .then(data => Promise.all(data))
  .then(data => JSON.stringify(data.map(datum => JSON.parse(datum))));
};

storageScout.readOne = function(id) {
  return sander.readdir(storageScout.filePath)
  .then(files => files.map(file => file.split('.')[0]))
  .then(filenames => {
    if (filenames.indexOf(id) > -1) {
      return sander.readFile(generateFilename(id), {encoding: 'utf-8'});
    } else {
      return Promise.reject(JSON.stringify({err: `Unable to locate ${id}`}));
    }
  });
};

storageScout.update = function(id, data){
  const outFile = generateFilename(id);
  if (sander.existsSync(outFile)) {
    sander.unlink(outFile);
    let obj = JSON.parse(data);
    obj.id = id;
    return sander.writeFile(outFile, JSON.stringify(obj));
  } else {
    return Promise.reject(JSON.stringify({err: `Unable to locate ${id}`}));
  }
};

storageScout.delete = function(id){
  return new Promise((resolve, reject) => {
    const outFile = generateFilename(id);
    if (sander.existsSync(outFile)) {
      sander.unlink(outFile);
      resolve(JSON.stringify({message: `${id} deleted`}));
    } else {
      reject(JSON.stringify({err: `Unable to locate ${id}`}));
    }
  });
};

function generateFilename(id) {
  return `${storageScout.filePath}${id}.json`;
}

function generateId(){
  return sander.readdir(storageScout.filePath)
    .then(fileNames => {
      const ids = fileNames.map(file => path.basename(file,'.json'));
      return ids.length ? Math.max.apply(0, ids) + 1 : 1;
    });
}

module.exports = storageScout;
