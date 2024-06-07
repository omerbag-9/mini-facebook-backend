import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(`mysql://ulrxllwjk6l8t1ns:mFw8OKEZrMbWoYPpqBvL@bavkgngzdlkitf9qvx2m-mysql.services.clever-cloud.com:3306/bavkgngzdlkitf9qvx2m`)

export const connectDB = ()=>{sequelize.authenticate().then(()=>{console.log("db connected successfully");})
.catch(()=>{console.log("failed to connect to db");})
}
