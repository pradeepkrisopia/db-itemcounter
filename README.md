# db-itemcounter
Nodejs module that provides functionality to increment, decrement and get counter values for each dynamodb entity in Albert

# How to use the module

Instantiate the db-itemcounter function with the name of the dynamodb table name as below
```
let counterObject= require('./index.js')('albert-dev');
```
or after installing the node module through npm install use
```
let counterObject= require('db-itemcounter')('albert-dev');
```

then use getCount function to get the count of the specific module, category for a tenantId

```
console.log('getCount is ', await counterObject.getCount('TEN0','INV', 'A'));
```
use increment function to increment the counter by value 1

```
console.log('increment is ', await myTest.increment('TEN0','INV', 'A'));
```

use decrement function to decrement the counter by value 1

```
console.log('increment is ', await myTest.decrement('TEN0','INV', 'A'));
```
