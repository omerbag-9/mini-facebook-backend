// import modules
import express from 'express'
import { connectDB, sequelize } from './db/connection.js'
import { userModel } from './db/models/user.model.js'
import { postModel } from './db/models/post.model.js'
import { commentModel } from './db/models/comment.model.js'
import userRouter from './src/modules/user/user.router.js'
import postRouter from './src/modules/post/post.router.js'
import { commentRouter } from './src/modules/comment/comment.router.js'



const app = express()
const port = process.env.Port || 3000
app.use(express.json())
app.use('/users',userRouter)
app.use('/posts',postRouter)
app.use('/comment',commentRouter)

connectDB()
sequelize.sync();

app.listen(port,()=>{console.log("server is running...");})