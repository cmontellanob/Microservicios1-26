import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Usuario } from "../entities/Usuario";
import bcrypt from "bcrypt";

const usuarioRepository = AppDataSource.getRepository(Usuario);

// Obtener todos los usuarios
export const obtenerUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await usuarioRepository.find();
        res.render("usuarios/index", { usuarios });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
};

// Crear un nuevo usuario
export const crearUsuario = async (req: Request, res: Response) => {
    try {
        const { correo, contraseña, nombre, rol } = req.body;
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        
        const nuevoUsuario = usuarioRepository.create({
            correo,
            contraseña: hashedPassword,
            nombre,
            rol,
        });
        
        const resultado = await usuarioRepository.save(nuevoUsuario);
        
        
        res.redirect("/usuarios");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al crear usuario");
    }
};

// Actualizar un usuario
export const editarUsuario = async (req: Request, res: Response) => {
    try {
        const { correo, nombre, rol } = req.body;
        const { id } = req.params;
        const usuario = await usuarioRepository.findOneBy({ id: parseInt(id as string) });
        
        if (usuario) {
            usuario.correo = correo;
            usuario.nombre = nombre;
            usuario.rol = rol;
            await usuarioRepository.save(usuario);
            res.redirect("/usuarios");
        } else {
            res.status(404).send("Usuario no encontrado");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al actualizar usuario");
    }
};

// Eliminar un usuario
export const eliminarUsuario = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await usuarioRepository.delete(parseInt(id as string));
        res.redirect("/usuarios");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al eliminar usuario");
    }
};

// Form renderers
export const renderCrearUsuario = (req: Request, res: Response) => {
    res.render("usuarios/crear");
};

export const renderEditarUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usuario = await usuarioRepository.findOneBy({ id: parseInt(id as string) });
    if (!usuario) return res.status(404).send("Usuario no encontrado");
    res.render("usuarios/editar", { usuario });
};
