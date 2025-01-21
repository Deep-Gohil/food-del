const {Router} = require("express")
const authMiddleware = require("../middleware/auth")
const { placeOrder, verifyOrder } = require("../controllers/orderController")

const orderRouter = Router()

orderRouter.post("/place",authMiddleware,placeOrder)
orderRouter.post("/verify",verifyOrder)


module.exports = orderRouter