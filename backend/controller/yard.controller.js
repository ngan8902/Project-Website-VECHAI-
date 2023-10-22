'use strict'

const YardModel = require('../model/yard.repo')

class YardController {
    static getYard = async (req, res, next) => {
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

    static createYard = async (req, res, next) => {
        try {
            console.log(req.body)
            const { userId, address, name, open_time, image, lag_lat} = req.body;
            const result = await PostModel.create({
                userId, address, name, open_time, image, lag_lat
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
module.exports = YardController
