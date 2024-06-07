import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import { userModel } from "./user.model.js";

export const postModel = sequelize.define(
    'post',
    {
        title:{
            type:DataTypes.STRING(20)
        },
        content:{
            type:DataTypes.STRING
        },
        author:{
            type:DataTypes.STRING
        }
    },
    {
        paranoid:true,
        timestamps:true,
        deletedAt: "deletedAt",
    }
)

postModel.belongsTo(userModel)
userModel.hasMany(postModel)