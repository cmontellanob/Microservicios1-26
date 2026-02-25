import { DataSource } from "typeorm";
import { Usuario } from "./entities/Usuario";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "ventas-orm",
  synchronize: true, // Solo para desarrollo
  logging: false,
  entities: [Usuario],
  subscribers: [],
  migrations: [],
});

export const connectDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Conexión a la base de datos establecida correctamente.");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        process.exit(1);
    }
};
