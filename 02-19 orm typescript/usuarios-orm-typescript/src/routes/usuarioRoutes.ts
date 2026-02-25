import { Router } from "express";
import * as controlador from "../controllers/usuarioController";

const router = Router();

router.get("/", controlador.obtenerUsuarios);

// Página para crear un usuario
router.get("/crear", controlador.renderCrearUsuario);
router.post("/crear", controlador.crearUsuario);

// Página para editar un usuario
router.get("/editar/:id", controlador.renderEditarUsuario);
router.post("/editar/:id", controlador.editarUsuario);

// Eliminar un usuario
router.post("/eliminar/:id", controlador.eliminarUsuario);

export default router;
