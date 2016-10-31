# storage-scout

This is (yet another) JSON-centric file-system-based storage API, using [sander](https://www.npmjs.com/package/sander) to store data in a folder in `.json` files, one file per data point.

### API

There are five methods exposed:

##### storageScout.create
*  Requires one parameter, a JSON string containing a data element.   
*  Returns a promise, with the data object with an ID added.

##### storageScout.readAll
*  Requires zero parameters.  
*  Returns a promise, with a JSON string with all data elements in an array.

##### storageScout.readOne
*  Requires one parameter, an ID.  
*  Returns a promise, with a JSON string with the data element requested.

##### storageScout.update
*  Requires two parameters, first, an ID, second, a JSON string containing new data.  
*  Returns a promise, with the new data set.

##### storageScout.delete
*  Requires one parameter, an ID.  
*  Returns a promise, a message confirming deletion of the ID

These are standard CRUD operations on data.  Appropriate errors are returned if operations fail or if data provided is not JSON.

