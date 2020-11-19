var mysql = require('mysql')

// const { sql_host, sql_port, sql_user, sql_password, sql_database, sql_connectionLimit } = require('./mysqlinit');

const pool = mysql.createPool({

    connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    multipleStatements: true
});

// connect to database

pool.getConnection((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to the database successfully")
});



module.exports = pool;