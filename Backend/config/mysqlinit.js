module.exports = {
    jwtsecret: "knuvv76u188zd2xu8c4xa",
    encrAlgorithm: "aes256",
    encrSecret: "1hmmp2sk8owpg8mtxxe8a",
    sql_host: 'localhost',
    sql_port: "3306",
    sql_user: 'root',
    sql_password: 'mathias1991',
    sql_database: 'glassdoor',
    sql_connectionLimit: 50,
    initDb: process.env.INITDB === "true"
};