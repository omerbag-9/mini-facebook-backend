import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import { postModel } from "./post.model.js";
import { userModel } from "./user.model.js";

export const commentModel = sequelize.define(
    'comment',
    {
        content:{
            type:DataTypes.STRING
        }
    }
)
commentModel.belongsTo(postModel,{onDelete:"CASCADE"})
postModel.hasMany(commentModel)
commentModel.belongsTo(userModel,{onDelete:"CASCADE"})
userModel.hasMany(commentModel)