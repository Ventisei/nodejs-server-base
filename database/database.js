const mysql = require("mysql2");
const IS_DEV_ENV = process.env.NODE_ENV == "development";

const dbConnection = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

function testConnection(req, res, next)
{
    dbConnection.getConnection((err, conn) => {
        if(err)
        {
            console.log("DB connection error: " + err);
            let msg = "DB connection error." + (IS_DEV_ENV ? (" - " + err) : "");
            res.status(500).send({
                message: msg
            });
        }
        else
        {
            conn.release();
            console.log("DB connection ok.");
            next();
        }
    });    
}

module.exports = { dbConnection, testConnection };