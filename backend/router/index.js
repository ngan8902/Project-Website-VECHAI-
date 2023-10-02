const express = require("express")
const router = express.Router()
const ProductRouter = require("./product.router")
const CustomerRouter = require("./customer.router")
const ShopRouter = require('./shop.router')
const CategoryRouter = require('./category.router')
const CartRouter = require('./cart.router')

router.use('/product', ProductRouter);
router.use('/customer', CustomerRouter);
router.use('/shop', ShopRouter);
router.use('/category',CategoryRouter )
router.use('/cart',CartRouter )
module.exports = router;