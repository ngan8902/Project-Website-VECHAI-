'use strict'

const PostModel = require('../model/post.repo')

class PostController {

    static getPosts = async (req, res, next) => {
        try {
            const results = await PostModel.getRoles({ ...req.query })
            if (!results) throw new Error("Don't have data");
            res.status(200).json({
                message: 'Get roles success!',
                data: results
            })
        }
        catch (err) {
            console.log(err)
            res.status(500).json({
                code: 500,
                message: 'Error::: c',
                error: err.message
            })
        }
    }

    static createPost = async (req, res, next) => {
        try {
            const { userId, name, content, image, expect_price, items, status } = req.body;
            const result = await PostModel.create({
                userId, name, content, image, expect_price, items, status
            })
            if (!result) throw new Error("Can't create post");
            res.status(200).json({
                message: 'Create post success!',
                data: result
            })
        }
        catch (err) {
            res.status(500).json({
                code: 500,
                message: 'Error:::',
                error: err.message
            })
        }
    }

}
module.exports = PostController