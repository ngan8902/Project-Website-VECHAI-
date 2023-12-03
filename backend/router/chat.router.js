const express = require("express")
const router = express.Router()
const ChatController = require("../controller/chat.controller")
//const { authentication } = require('../authentication/checkAuth')

router.post("/create", ChatController.createChats)
router.get("/getbypost",  ChatController.getMessByPost)
router.get("/getbyuser",  ChatController.getAllMessageByUser)



module.exports = router;