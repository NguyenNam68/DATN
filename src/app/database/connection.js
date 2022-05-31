const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

conn.connect(err=>{
    if(!err){
        console.log(`Database connection successful`);
    }else{
        console.log(`Database connection failed: ${err}`);
    }
});

module.exports = conn;