const {Router} = require("express")
const authMiddleware = require("../middleware/auth")
const { placeOrder } = require("../controllers/orderController")

const orderRouter = Router()

orderRouter.post("/place",authMiddleware,placeOrder)



module.exports = orderRouter