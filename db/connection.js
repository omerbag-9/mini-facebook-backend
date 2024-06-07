import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('minifacebook','root','',{
    host:'localhost',
    dialect:'mysql'
})

export const connectDB = ()=>{sequelize.authenticate().then(()=>{console.log("db connected successfully");})
.catch(()=>{console.log("failed to connect to db");})
}
