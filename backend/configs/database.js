import mysql from 'mysql2'; 

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306, 
    user: 'root',
    password: '123456', 
    database: 'food_delivery_system',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
const database = pool.promise()

export default database