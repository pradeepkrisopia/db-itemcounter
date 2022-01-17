module.exports = {
    entityCategory: require('./category.json'),
    getDocClient: () => {
    let AWS = require('aws-sdk')
    let DynamoDB = new AWS.DynamoDB({ region: 'us-west-2' })
    return new AWS.DynamoDB.DocumentClient({ service: DynamoDB })
    }
}