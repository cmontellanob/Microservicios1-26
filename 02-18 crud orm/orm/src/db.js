const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "bd_ventas",
  synchronize: true, // elimina y vuelve a crear la base de datos cada vez que se inicia la aplicación
  logging: false,
  entities: ["./entity/*.js"], // Adjusted path to potentially be correct from root execution, assuming user runs from root. Original was "./entity/*.js" which is dubious from root.
});

module.exports = AppDataSource;
