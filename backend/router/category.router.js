const express = require("express")
const router = express.Router()
const CategoryController = require("../controller/category.controller")
const { authentication } = require('../authentication/checkAuth')

router.get(`/`, CategoryController.getCategories)

module.exports=router