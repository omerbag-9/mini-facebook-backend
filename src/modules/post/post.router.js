import { Router } from "express";
import { SpecificPost, addPost, deletePost, getPosts, updatePost } from "./post.controller.js";

export const postRouter = Router()

postRouter.post('/',addPost)
postRouter.get('/',getPosts)
postRouter.put('/:id',updatePost)
postRouter.delete('/:id',deletePost)
postRouter.get('/:author/:id',SpecificPost)


export default postRouter
