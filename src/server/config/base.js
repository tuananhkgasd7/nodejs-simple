require('dotenv').config()

module.exports = {
    sqlConfig: {
        server: process.env.SQL_HOST,
        user: process.env.SQL_USERNAME,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_NAME,
        options: {
            trustServerCertificate: true,
        },
        
    },
    mongoConfig: {
        host: process.env.MG_HOST
    },
    typeDatabase: process.env.TYPE_DATABASE
}