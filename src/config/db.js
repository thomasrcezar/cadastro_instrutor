const { Pool } = require("pg"); 

module.exports = new Pool({
    user: "thomas", 
    password: "thomas123", 
    host: "localhost",
    port: 5432, 
    database: "db_cadastro"
});