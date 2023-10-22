const express = require("express")
const router = express.Router()
const YardController = require("../controller/yard.controller")
//const { authentication } = require('../authentication/checkAuth')

router.post("/create", YardController.createYard)
router.get("/get",  YardController.getYard)

module.exports = router;