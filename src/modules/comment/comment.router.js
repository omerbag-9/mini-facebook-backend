import { Router } from "express";
import { addComment, deleteComment, getComment, updateComment } from "./comment.controller.js";

export const commentRouter = Router()

commentRouter.post('/',addComment)
commentRouter.get('/',getComment)
commentRouter.put('/:id',updateComment)
commentRouter.delete('/:id',deleteComment)
