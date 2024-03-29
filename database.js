const mysql = require("mysql");
const { database } = require("./keys");
const { promisify } = require("util");

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code == "PROTOCOL_CONNECTION_LOST") {
            console.error("LA CONEXION DE LA BASE DE DATOS FUE CERRADA")
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has to many connections');
        }
        if (err.code == "ECONNREFUSED") {
            console.error("LA CONEXION DE LA BASE DE DATOS FUE RECHADADA")
        }
    }
    if (connection) connection.release();
    console.log("DB esta conectada a MySQL");
    return;
});

// CONVITIENDO A PROMESA LAS CONSULTAS DE SQL - ANTERIORMENTE ERA UN CALLBACK 
pool.query = promisify(pool.query);

module.exports = pool;