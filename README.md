# db-itemcounter
Nodejs module that provides functionality to increment, decrement and get counter values for each dynamodb entity in Albert

# How to use the module

1. Instantiate the db-itemcounter function with the name of the dynamodb table name as below
```
let counterObject= require('./index.js')('albert-dev');
```
or after installing the node module through npm install use
```
let counterObject= require('db-itemcounter')('albert-dev');
```

2. then use getCount function to get the count of the specific module, category for a tenantId

```
console.log('getCount is ', await counterObject.getCount('TEN0','INV', 'A'));
```

3. use increment function to increment the counter by value 1

```
console.log('increment is ', await myTest.increment('TEN0','INV', 'A'));
```
* After the first increment function call on a valid entity (and category combination), the return value is 1 and gets incremented sequentially by 1 after each following call.

4. use decrement function to decrement the counter by value 1

```
console.log('increment is ', await myTest.decrement('TEN0','INV', 'A'));
```
* a counter for a valid entity (and category combination) can be decremented till 0, below which error would be thrown upon calling decrement.

* If the specific entity or category combination does not exist, error is thrown by all functions
* You can include a new entity, and its sub categories inside the categories.json file in the module folder.

