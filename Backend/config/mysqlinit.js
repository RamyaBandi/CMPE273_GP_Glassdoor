// module.exports = {
//     jwtsecret: "knuvv76u188zd2xu8c4xa",
//     encrAlgorithm: "aes256",
//     encrSecret: "1hmmp2sk8owpg8mtxxe8a",
//     sql_host: 'localhost',
//     sql_port: "3306",
//     sql_user: 'root',
//     sql_password: 'mathias1991',
//     sql_database: 'glassdoor',
//     sql_connectionLimit: 50,
//     initDb: process.env.INITDB === "true"
// };

module.exports = {
    jwtsecret: "knuvv76u188zd2xu8c4xa",
    encrAlgorithm: "aes256",
    encrSecret: "1hmmp2sk8owpg8mtxxe8a",
    sql_host: 'glassdoordb.cxg41nicgzid.us-west-1.rds.amazonaws.com',
    sql_port: "3306",
    sql_user: 'admin',
    sql_password: '273GlassDoor',
    sql_database: 'glassDoor',
    sql_connectionLimit: 50,
    initDb: process.env.INITDB === "true"
};