import { where } from "sequelize"
import { postModel } from "../../../db/models/post.model.js"
import { userModel } from "../../../db/models/user.model.js"

export const addPost = async (req, res, next) => {
    const { title, content, userId } = req.body
    // get name to put it in the author column
    const authorName = await userModel.findAll({
        where: { id: userId }
    })
    const author = authorName[0].userName
    // add post
    try {
        const newPost = await postModel.create({ title, content, author, userId })
        res.status(201).json({ message: "post created successfully", data: newPost, success: true })
    }
    catch (err) {
        res.status(404).json({ message: "user is not found", success: false })
    }
}

export const getPosts = async (req, res, next) => {
    const getPost = await postModel.findAll(
        {
            include: {
                model: userModel,
                attributes:{exclude:['password']}
            },
           
        }
    )
    res.status(200).json({ data: getPost, success: true })
}

export const updatePost = async (req, res, next) => {
    const { title, content } = req.body
    const { id } = req.params
    const updatePost = await postModel.update({ title: `${title}`, content: `${content}` }
        , {
            where: {
                id: id
            }
        }
    )
    if (updatePost[0] === 0) {
        return res.status(404).json({ message: "post is not found", success: false })
    }
    res.status(201).json({ message: "post updated successfully", data: updatePost, success: true })
}

export const deletePost = async (req, res, next) => {
    const { id } = req.params
    const deletePost = await postModel.destroy(
        {
            where: {
                id: id
            },

        },

    )
    if (deletePost === 0) {
        return res.status(404).json({ message: "post is not found", success: false })
    }
    res.status(201).json({ message: "post deleted successfully", success: true })
}

export const SpecificPost = async (req, res, next) => {
    const { author,id } = req.params
    const getSpecificPost = await postModel.findAll({
        where: { author: author ,id:id}
    })
    if(getSpecificPost[0]){
        return res.status(200).json({ data: getSpecificPost, success: true })
    }
    res.status(404).json({ message: "author is not found", success: false }) 
}