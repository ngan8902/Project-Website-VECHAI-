'use strict'
const { products } = require('../data')
const JWT = require('jsonwebtoken')
const CategoryModel = require('../model/category.repo')
 
class CategoryController{
    static getCategories = async (req, res, next) => {
        try {

            const results = await CategoryModel.getCategories()
            console.log(results)
            if (!results) throw new Error("Don't have data");
            res.status(200).json({
                message: 'Get categories success!',
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
module.exports = CategoryController