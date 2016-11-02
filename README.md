# storage-scout

This is (yet another) JSON-centric file-system-based storage API, using [sander](https://www.npmjs.com/package/sander) to store data in a folder in `.json` files, one file per data point.

### API

There are five methods exposed:

##### storageScout.create
*  Requires one parameter, a JSON string containing a data element.   
*  Returns a promise, with the data object with an ID added.

``` js
const data = '{"Name":"Dune", "Author":"Frank Herbert"}';

storageScout.create(data)
  .then (result => console.log(result)) // '{"Name":"Dune", "Author":"Frank Herbert", "id": "1"}'
  .catch (err => console.error(error));
```

##### storageScout.readAll
*  Requires zero parameters.  
*  Returns a promise, with a JSON string with all data elements in an array.

``` js
storageScount.readAll()
  .then(results => console.log(results)) // '[{"Name":"Dune", "Author":"Frank Herbert", "id": "1"}]'
  .catch(err => console.error(err));
```

##### storageScout.readOne
*  Requires one parameter, an ID as a string.  
*  Returns a promise, with a JSON string with the data element requested.

``` js
storageScount.readAll('1')
  .then(result => console.log(result)) //  '{"Name":"Dune", "Author":"Frank Herbert", "id": "1"}'
  .catch(err => console.error(err));
```

##### storageScout.update
*  Requires two parameters, first, an ID as a string, second, a JSON string containing new data.  
*  Returns a promise, with the new data set.

``` js
const newData = '{"Name":"Dune Messiah", "Author":"Frank Herbert"}';
storageScout.update('1', newData)
  .then(result => console.log(result)) // '{"Name":"Dune Messiah", "Author":"Frank Herbert", "id": "1"}'
  .catch(err => console.error(err));
```

##### storageScout.delete
*  Requires one parameter, an ID as a string.  
*  Returns a promise, a message confirming deletion of the ID

``` js
storageScout.delete('1')
  .then(result => console.log(result)) // '{"message":"1 deleted"}'
  .catch(err => console.error(err));
```


These are standard CRUD operations on data.  Appropriate errors are returned if operations fail or if data provided is not valid JSON.
