"user strict";
import { EntitySchema } from "typeorm";

const UserSchema = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        nombreCompleto: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        rut: {
            type: "varchar",
            length: 12,
            nullable: false,
            unique: true,
        },
        email: {
            type: "varchar",
            length: 255,
            nullable: false,
            unique: true,
        },
        createdAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            nullable: false,
        },
        updatedAT: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
            nullable: false,
        }

    }
})

export default UserSchema;