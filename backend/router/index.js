const express = require("express")
const router = express.Router()
const UserRouter = require("./user.router")
const RoleRouter = require('./role.router')
const PostRouter = require('./post.router')

router.use('/customer', UserRouter);
router.use('/role', RoleRouter);
router.use('/post', PostRouter);

module.exports = router;