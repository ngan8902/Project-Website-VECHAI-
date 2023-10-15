const express = require("express")
const router = express.Router()
const UserRouter = require("./user.router")
const RoleRouter = require('./role.router')

router.use('/customer', UserRouter);
router.use('/role', RoleRouter);

module.exports = router;