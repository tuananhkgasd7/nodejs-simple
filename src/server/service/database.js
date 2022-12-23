const mongoose = require('mongoose');
const { pool } = require('mssql/msnodesqlv8');
const sql = require('mssql');
const config = require('../config/base');
require('dotenv').config();

const mongoConnection = async () => {
    try {
        await mongoose.connect(config.mongoConfig.host, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connection MongoDb successfully!');
        return true;
    } catch (error){
        console.log('Connection MongoDb failure!');
        return false;
    }
}

const sqlConnection = async () => new Promise((resolve, reject) => {
    new sql.ConnectionPool(config.sqlConfig).connect()
    .then(pool => resolve(pool))
    .catch(err => reject(err));
});

const retrieveData = async (sqlCmdSp, requestMethod, parameters) => new Promise( async (resolve, reject) => {
        try {
            const connection = await sqlConnection();
            try {
                const sqlRequest = await connection.request();
                // parameters && parameters.forEach(element => sqlRequest.input(element.name, element.value));
                if(parameters) 
                    for (const [name, value] of Object.entries(parameters)) {
                        sqlRequest.input(name, value);
                    }
                    
                sqlRequest[requestMethod](sqlCmdSp, (err, result) => {
                    connection.close();
                    err ? reject(err) : resolve(result);
                })
            } catch (error) {
                connection.close();
                reject(error);
            }
        }
        catch (error) {
            reject(error);
        }
    }
)

const executeSqlCommand = async (sqlCommand, parameters) => retrieveData(sqlCommand, 'query', parameters);

const executeStoreProcedure = async (storeProcedureName, parameters) => retrieveData(storeProcedureName, 'execute', parameters);

module.exports = { executeSqlCommand, executeStoreProcedure, mongoConnection, retrieveData, sqlConnection };
