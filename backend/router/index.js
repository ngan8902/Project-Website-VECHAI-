const express = require("express")
const router = express.Router()
const UserRouter = require("./user.router")
const RoleRouter = require('./role.router')
const PostRouter = require('./post.router')
const YardRouter = require('./yard.router')
const MessageRouter = require('./message.router')

router.use('/customer', UserRouter);
router.use('/role', RoleRouter);
router.use('/post', PostRouter);
router.use('/yard', YardRouter);
router.use('/message', MessageRouter);

module.exports = router;