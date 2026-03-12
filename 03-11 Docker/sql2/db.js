const mysql = require('mysql2');
// Configuración de la conexión
const connection = mysql.createConnection({
  host: 'mysql_db',   // para conectar al anfitrion  
  user: 'root',          // Usuario de tu base de datos
  password: '12345',  // Contraseña de tu base de datos
  database: 'bd_ventas'  // Nombre de la base de datos
});
// Conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
    console.log('Conexión exitosa a la base de datos');
});
module.exports = connection;
