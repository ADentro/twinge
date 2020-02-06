const mysql = require('mysql');
const keys = require('../config/keys');

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: keys.mySQLUser,
    password: keys.mySQLPassword,
    database: 'twinge'
});

dbConnection.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

module.exports = dbConnection;
