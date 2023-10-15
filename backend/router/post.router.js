const express = require("express")
const router = express.Router()
const PostController = require("../controller/post.controller")
//const { authentication } = require('../authentication/checkAuth')

router.post("/create", PostController.createPost)
router.get("/get",  PostController.getPosts)

module.exports = router;