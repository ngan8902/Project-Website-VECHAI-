const express = require("express")
const router = express.Router()
const UserRouter = require("./user.router")
const RoleRouter = require('./role.router')
const PostRouter = require('./post.router')
const YardRouter = require('./yard.router')

router.use('/customer', UserRouter);
router.use('/role', RoleRouter);
router.use('/post', PostRouter);
router.use('/yard', YardRouter);

module.exports = router;