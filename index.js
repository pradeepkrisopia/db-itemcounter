const {entityCategory, getDocClient} = require('./boot.js')
const dotenv = require('dotenv').config()

module.exports = function (tableName) {
    increment = async (tenantId, entity, category) => {
        try {
            let pk, documentClient = await getDocClient()
            if(!(tenantId && entityCategory[entity])) {throw "Valid TenantId / Entity required"} else           
            if (category){
                if (!(entityCategory[entity].includes(category))) {throw "The Entity / Category combination is invalid"}
                //category = Array.isArray(category) ? category.join('#') : category
                pk = `${tenantId}#${entity}#${category}`
            } else {
                pk = `${tenantId}#${entity}`    
            }           
            let id = { PK: `${pk}`, SK: `${entity}` };
            let result = await documentClient.update({
                "TableName": tableName,
                "ReturnValues": "UPDATED_NEW",
                "ExpressionAttributeValues": {
                    ":increment": 1,
                    ":zero": 0
                },
                "ExpressionAttributeNames": {
                    "#param": "count"
                },
                "UpdateExpression": "SET #param = if_not_exists(#param, :zero) + :increment",
                "Key": id
            }).promise();

            return await processResult(result)  

        } catch(exception) {
            exception = exception.message || exception;
            return { error: exception }
        }

    },

    decrement = async (tenantId, entity, category) => {
        try {
            let pk, documentClient = await getDocClient()
            if(!(tenantId && entityCategory[entity])) {throw "Valid TenantId / Entity required"} else           
            if (category){
                if (!(entityCategory[entity].includes(category))) {throw "The Entity / Category combination is invalid"}
                //category = Array.isArray(category) ? category.join('#') : category
                pk = `${tenantId}#${entity}#${category}`
            } else {
                pk = `${tenantId}#${entity}`    
            }

            let id = { PK: `${pk}`, SK: `${entity}` };
            let result = await documentClient.update({
                "TableName": tableName,
                "ReturnValues": "UPDATED_NEW",
                "UpdateExpression": "SET #param = #param - :decrement",
                "ConditionExpression": "#param > :zero",                
                "ExpressionAttributeValues": {
                    ":decrement": 1,
                    ":zero": 0
                },
                "ExpressionAttributeNames": {
                    "#param": "count"
                },                
                "Key": id
            }).promise()

            return await processResult(result)            

        } catch(exception) {
            exception = exception.message || exception
            exception = exception.includes('The conditional request failed') ? `${exception} : Trying to decrement below 0 / Count does not exist for the given combination` : exception
            return { error: exception }
        }
    },

    getCount = async(tenantId, entity, category) => {
        try {

            let pk, documentClient = await getDocClient()
            if(!(tenantId && entityCategory[entity])) {throw "Valid TenantId / Entity required"} else           
            if (category){
                if (!(entityCategory[entity].includes(category))) {throw "The Entity / Category combination is invalid"}
                //category = Array.isArray(category) ? category.join('#') : category
                pk = `${tenantId}#${entity}#${category}`
            } else {
                pk = `${tenantId}#${entity}`    
            }

            let id = { PK: `${pk}`, SK: `${entity}` }
            let result = await documentClient.get({
                "TableName": tableName,
                "Key": id
            }).promise()   

            //return (await processResult(result)) || 0 
            return await processResult(result)                      

        } catch (exception) {
            exception = exception.message || exception
            return { error: exception }            
        }
    }

    const processResult = async (result) => {
        return result.Item ? result.Item.count : (result.Attributes ? result.Attributes.count : ((Object.keys(result).length === 0) ? 0 : result))
    }

    return {increment, decrement, getCount}       
}