import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import usuarioRoutes from "./routes/usuarioRoutes";
import { connectDB } from "./database";

dotenv.config();

const app = express();

// Configuración de middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

// Configuración del motor de vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Rutas
app.use("/usuarios", usuarioRoutes);
app.use("/", (req, res) => {
    res.send("Bienvenido a la página principal!!");
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
};

startServer();
