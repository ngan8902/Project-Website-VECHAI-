const express = require("express")
const router = express.Router()
const CartController = require("../controller/cart.controller")
const { authentication } = require('../authentication/checkAuth')

router.get("/addproduct", express.urlencoded({ extended: false }), CartController.addproduct)

module.exports = router;