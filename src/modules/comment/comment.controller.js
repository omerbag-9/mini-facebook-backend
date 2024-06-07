import { commentModel } from "../../../db/models/comment.model.js"
import { userModel } from "../../../db/models/user.model.js"

export const addComment = async (req, res, next) => {
    const { content, postId, userId } = req.body
    try {
        const newComment = await commentModel.create({ content, postId, userId })
        res.status(201).json({ message: "comment created successfully", data: newComment, success: true })
    }
    catch (err) {
        res.status(404).json({ message: "user or post is not found", success: false })
    }
}

export const getComment = async (req, res, next) => {
    const getComment = await commentModel.findAll(
        {
            include: [{
                model:userModel,
                attributes:{exclude:['password']}
            }]
        }
    )
    res.status(200).json({ data: getComment, success: true })
}

export const updateComment = async (req, res, next) => {
    const { content } = req.body
    const { id } = req.params
    const updatedComment = await commentModel.update({ content: `${content}` }
        , {
            where: {
                id: id
            }
        }
    )
    if (updatedComment[0] === 0) {
        return res.status(404).json({ message: "comment is not found", success: false })
    }
    res.status(201).json({ message: "comment updated successfully", data: updatedComment, success: true })
}

export const deleteComment = async (req, res, next) => {
    const { id } = req.params
    const deleteComment = await commentModel.destroy(
        {
            where: {
                id: id
            },

        },

    )
    if (deleteComment === 0) {
        return res.status(404).json({ message: "comment is not found", success: false })
    }
    res.status(201).json({ message: "comment deleted successfully", success: true })
}