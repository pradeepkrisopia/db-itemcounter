const start = async function() {let myTest= require('./index.js')('albert-dev');
console.log('getCount is ', await myTest.getCount('TEN0','DAC'));
console.log('increment is ', await myTest.increment('TEN0','DAC'));
console.log('getCount is ', await myTest.getCount('TEN0','DAC'));
console.log('decrement is ', await myTest.decrement('TEN0','DAC'));
console.log('getCount is ', await myTest.getCount('TEN0','DAC'));
}

start()