# lib-dbitemcounter
Nodejs module that provides functionality to increment, decrement and get counter values for each dynamodb entity in Albert

# How to use the module

1. Instantiate the db-itemcounter function with the name of the dynamodb table name as below
```
let counterObject= require('./index.js')('albert-dev');
```
or after installing the node module through npm install use
```
let counterObject= require('lib-dbitemcounter')('albert-dev');
```
* IMPORTANT - always get the table name from the .env file variable and avoid hardcoding table name. 

2. then use getCount function to get the count of the specific module, category for a tenantId

```
console.log('getCount is ', await counterObject.getCount('TEN0','INV', 'A'));
getCount is 0
```
* If there is no counter record for the given valid  tenant, entity (and category) combination initially, 0 will be returned

3. use increment function to increment the counter by value 1

```
console.log('increment is ', await myTest.increment('TEN0','INV', 'A'));
increment is 1
```
* After the first increment function call on a valid entity (and category combination), the return value is 1 and gets incremented sequentially by 1 after each following call.

4. use decrement function to decrement the counter by value 1 and return the resultant value

```
console.log('decrement is ', await myTest.decrement('TEN0','INV', 'A'));
decrement is 0
```
* a counter for a valid entity (and category combination) can be decremented till 0, below which error would be thrown upon calling decrement.

```
console.log('getCount is ', await myTest.getCount('TEN0','DAC'));
console.log('decrement is ', await myTest.decrement('TEN0','DAC'));
console.log('getCount is ', await myTest.getCount('TEN0','DAC'));

getCount is  0
decrement is  { error: 'The conditional request failed : Trying to decrement below 0 / Count does not exist for the given combination'}
getCount is  0
```

* If the specific entity or category combination does not exist, error is thrown by all functions

```
console.log('getCount is ', await myTest.getCount('TEN0','DACX'));
console.log('decrement is ', await myTest.decrement('TEN0','INV', 'Q'));
console.log('getCount is ', await myTest.increment('TEN0','HHH'));

getCount is  { error: 'Valid TenantId / Entity required' }
decrement is  { error: 'The Entity / Category combination is invalid' }
getCount is  { error: 'Valid TenantId / Entity required' }
```

* You can include a new entity, and its sub categories inside the category.json file in the module folder.

