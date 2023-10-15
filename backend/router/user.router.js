const express = require("express")
const router = express.Router()
const UserController = require("../controller/user.controller")
const { authentication } = require('../authentication/checkAuth')

router.post("/signup", UserController.signUp)
router.post("/login", UserController.logIn)

router.get("/authen", authentication, UserController.authenCustomer)
router.get("/getbytoken", authentication, UserController.getUserWithRole)

module.exports = router;