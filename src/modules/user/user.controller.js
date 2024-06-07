import { commentModel } from "../../../db/models/comment.model.js"
import { postModel } from "../../../db/models/post.model.js"
import { userModel } from "../../../db/models/user.model.js"
import bcrypt from "bcrypt"

export const signup = async (req, res, next) => {
    const { userName, email, Password } = req.body
    const password = bcrypt.hashSync(Password, 10)

    try {
        const newUser = await userModel.create({ userName, email, password })
        res.status(201).json({ message: "user Created Successfully", data: newUser, success: true })
    }
    catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ message: "Email already exists", success: false });
        } else {
            next(err);
        }
    }
}

export const login = async (req, res, next) => {
    const { email, Password } = req.body
    try {
        const loginUser = await userModel.findAll(
            {
                where: {
                    email: email,
                },
            }
        )
        if (bcrypt.compareSync(Password, loginUser[0].dataValues.password) === false) {
            return res.status(400).json({ message: "invalid credentials", success: false })
        }

        return res.status(201).json({ message: "welcome", data: loginUser, success: true })
    }
    catch (err) {
        if (err) {
            return res.status(400).json({ message: "invalid credentials", success: false })
        }
    }


}

export const logout = async (req, res, next) => {
    return res.status(200).json({message:"user loged out successfully",success:true})
}

export const specificUser = async (req, res, next) => {
    const { userId, postId } = req.params;

    try {
      const user = await userModel.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found', success: false });
      }

      const post = await postModel.findOne({ where: { id: postId, userId } });
      if (!post) {
        return res.status(404).json({ message: 'Post not found', success: false });
      }

      const comment = await commentModel.findAll({ where: { postId } });

      return res.status(200).json({ user: user.dataValues.userName, post, comment, success: true });
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving user, post, and comments', error, success: false });
    }
}

// logout