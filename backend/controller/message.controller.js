'use strict'

const MessageModel = require('../model/message.repo')

class MessageController {

    static getMessageByPost = async (req, res, next) => {
        try {
            const results = await MessageModel.getMessageByPost({ ...req.query })
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

    static getAllMessageByUser = async (req, res, next) => {
        try {
            const results = await MessageModel.getAllMessageByUser({ ...req.query })
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

    static createMessage = async (req, res, next) => {
        try {
            console.log(req.body)
            const { buyerId, salerId, postId, content } = req.body;
            const result = await MessageModel.create({
                buyerId, salerId, postId, content
            })
            if (!result) throw new Error("Can't create message");
            res.status(200).json({
                message: 'Create message success!',
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
module.exports = MessageController