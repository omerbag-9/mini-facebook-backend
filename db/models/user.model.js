import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

export const userModel = sequelize.define(
    'user',
    {
        userName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        }
    }
)

