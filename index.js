const sander = require('sander');
const path = require('path');
const storageScout = {
  filePath: 'storageScoutFiles/',
  dir: 'storageScoutFiles'
};

if (!sander.existsSync(storageScout.dir)) sander.mkdir(storageScout.dir);

/**
 * Create a data element
 * @param {String} data - JSON string containing key-value pairs.
 * @returns {String} JSON string containing submitted data and assigned id, as a promise
 */
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

/**
 * Display all data elements.
 * @returns {String} JSON string containing array of all data elements, as a promise.
 */
storageScout.readAll = function() {
  return sander.readdir(storageScout.filePath)
  .then(files => files.map(file => storageScout.filePath + file))
  .then(filefilePaths => filefilePaths.map(file => sander.readFile(file, {encoding: 'utf-8'})))
  .then(data => Promise.all(data))
  .then(data => JSON.stringify(data.map(datum => JSON.parse(datum))));
};

/**
 * Display single data element by id.
 * @param {Number} id - id of element requested
 * @returns {String} JSON string containing single data elements, as a promise.
 */
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
/**
 * Update data element with new data. Replaces data with data submitted.
 * @param {Number} id - id of element being updated
 * @param {String} data - JSON string containing new data elements to update.
 * @returns {String} JSON string containing updated data element.
 */
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

/**
 * Delete a data element
 * @param {Number} id - id of element being updated
 * @returns {String} JSON message confirming id being deleted.
 */
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

/**
 * Generates a filename based on concatenating elements.
 * @param {Number} id - id to add to string.
 * @returns {String} path + id + .json
 */
function generateFilename(id) {
  return `${storageScout.filePath}${id}.json`;
}
/**
 * Generates a unique integer id based on existing ids in storage directory.
 * @returns {Number} next available id
 */
function generateId(){
  return sander.readdir(storageScout.filePath)
    .then(fileNames => {
      const ids = fileNames.map(file => path.basename(file,'.json'));
      return ids.length ? Math.max.apply(0, ids) + 1 : 1;
    });
}

module.exports = storageScout;
