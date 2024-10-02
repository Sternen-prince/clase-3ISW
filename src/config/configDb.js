"use strict";
import { DataSource } from "typeorm";
import { DATABASE, DB_USERNAME, HOST, PASSWORD } from './configEnv.js';

export const AppDataSource = new DataSource({
    type: "postgres", //tipo de base de datos
    host: `${HOST}`,//DIRECCION QUE UTILIZA LA BASE DE DATOS
    port: 5432,
    username: `${DB_USERNAME}`, // NOMBRE DE USUSARIO PARA AUTENTICAR LA CONEXION A LA BASE DE DATOS
    password: `${PASSWORD}`, // contraseña del usuario a autenticar
    database: `${DATABASE}`,
    entities: ["src/entity/**/*.js"], //defione a la ruta de archivos que contiene a las entidades
    synchronize: true, // opcion para que typeORM se encarge de gestionar nuestra base de datos
    logging: false, // muestra las consultas que se realizan por debajo de la aplicacion
});

export async function connectDB() {
    try {
        await AppDataSource.initialize();
        console.log("=> conexion a la base de datos exitosa!");
    } catch (error) {
        console.error("Error al conectarse a la base de datos: ", error);
    }
}