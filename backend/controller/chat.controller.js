'use strict'

const ChatModel = require('../model/chat.repo')

class ChatController {

    static getMessByPost = async (req, res, next) => {
        try {
            console.log(req.query)
            const results = await ChatModel.getMessByPost({ ...req.query })
            if (!results) throw new Error("Don't have data");
            res.status(200).json({
                message: 'Get mss success!',
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

    static createChats = async (req, res, next) => {
        try {
            console.log(req.body)
            const { buyerId, salerId, postId, content} = req.body;
            const result = await ChatModel.create({
                buyerId, salerId, postId, content
            })
            if (!result) throw new Error("Can't create mss");
            res.status(200).json({
                message: 'Create mss success!',
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

    static getAllMessageByUser = async (req, res, next) => {
        try {
            const results = await ChatModel.getAllMessageByUser({ ...req.query })
            if (!results) throw new Error("Don't have data");
            res.status(200).json({
                message: 'Get message success!',
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

}
module.exports = ChatController