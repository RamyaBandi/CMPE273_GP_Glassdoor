// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("yelp", "Vamsi", "Sakura", { host: "localhost", dialect: "mysql", operatorAliases: "false" })

// try {
//     sequelize.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }


// module.exports = sequelize;

const mysql = require('mysql2');

const dbConfig = {
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
}
// const con = mysql.createConnection({ ...dbConfig, multipleStatements: true });


// con.connect(function (err) {
//     //console.log(process.env);
//     if (err) throw err;
//     console.log('Connected to DB!');
// });




const pool = mysql.createPool({ ...dbConfig, multipleStatements: true });
pool.getConnection(function (err) {
    //console.log(process.env);
    if (err) throw err;
    console.log("Connected to DB!");
});

module.exports = pool;




// const connection = async (server, config) => {
//     let pool = null;

//     const closePool = async () => {
//         try {
//             // try to close the connection pool
//             await pool.close();

//             // set the pool to null to ensure
//             // a new one will be created by getConnection()
//             pool = null;
//         } catch (err) {
//             // error closing the connection (could already be closed)
//             // set the pool to null to ensure
//             // a new one will be created by getConnection()
//             pool = null;
//             server.log(["error", "data"], "closePool error");
//             server.log(["error", "data"], err);
//         }
//     };

//     const getConnection = async () => {
//         try {
//             if (pool) {
//                 // has the connection pool already been created?
//                 // if so, return the existing pool
//                 return pool;
//             }
//             // create a new connection pool
//             pool = await mysql.createConnection({ ...dbConfig });

//             // catch any connection errors and close the pool
//             pool.on("error", async err => {
//                 server.log(["error", "data"], "connection pool error");
//                 server.log(["error", "data"], err);
//                 await closePool();
//             });
//             return pool;
//         } catch (err) {
//             // error connecting to SQL Server
//             server.log(["error", "data"], "error connecting to sql server");
//             server.log(["error", "data"], err);
//             pool = null;
//         }
//     };

//     return getConnection();
// };

// module.exports = connection;




// module.exports = con;