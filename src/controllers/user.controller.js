"use strict";
import User from '../entity/user.entity.js';
import { AppDataSource } from '../config/configDb.js';
export async function createUser(req, res) {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = req.body;
        if(!user) {
            return res.status(400).json({
                message: "Es necesario ingresar los datos del usuario.",
                data: null
            })
        }
        const newUser = userRepository.create({
            nombreCompleto: user.nombreCompleto,
            rut: user.rut,
            email: user.email
        });
        const userSaved = await userRepository.save(newUser);
        res.status(201).json({
            message: "Usuario creado exitosamente",
            data: userSaved
        })
    } catch (error) {
        console.error("Error al crear un usuario, el error es: ", error);
    }
}
export async function getUser(req, res) {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const id = req.params.id;
        const userFound = await userRepository.findOne({
            where: {
                id: id
            }
        })
        if(!userFound) {
            return res.status(404).json({
                message: "Usuario no encontrado",
                data: null
            })
        }
        res.status(200).json({
            message: "Usuario encontrado",
            data: userFound
        })
    } catch (error) {
        console.error('Error al obtener un usuario, el error: ', error);
    }
}
export async function getUsers(req, res) {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
        
        if(!users || users.length === 0) {
            return res.status(404).json({
                message: "No se encontraron usuarios",
                data: null
            })
        }
        res.status(200).json({
            message: "Usuarios encontrados",
            data: users
        })
    } catch (error) {
        console.error('Error al obtener un usuarios, el error: ', error);
    }
}
//nuevo codigo calse 4
export async function updateUser(req, res) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const id = req.params.id;
        const user = req.body;

        const userFound = await userRepository.findOne({
            where: [{
                id: id
            }]
        });

        if(!userFound){
            return res.status(404).json({
                message: "usuario no encontrado",
                data: null
            });
        }

        await userRepository.update(id, user);

        const userData = await userRepository.findOne({
            where: [{
                id: id
            }]
        });

        res.status(200).json({
            message: "susuario actualizado correctamente ",
            data: userData
        })

    } catch (error) {
        console.error("error al actualizar un usuario : ", error);
        res.status(500).json({message: "error interno en el servidor"});
    }    
}
export async function deleteUser(req, res) {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const id = req.params.id;

        const userFound = await userRepository.findOne({
            where: [{
                id: id
            }]
        });

        if(!userFound){
            return res.status(404).json({
                message: "usuario no encontrado",
                data: null
            });
        }

        const userDeleted = await userRepository.remove(userFound);
        res.status(200).json({
            message: "Usuario eliminado correctamente",
            data: userDeleted
        })
    } catch (error) {
        console.error("error al eliminar un usuario : ", error);
        res.status(500).json({message: "error interno en el servidor"});
    }
}