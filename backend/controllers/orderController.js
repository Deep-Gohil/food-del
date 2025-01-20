const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";

    try {
        console.log(req.body);

        // Create a new order in the database
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            ammount: req.body.ammount,
            address: req.body.address,
        });
        await newOrder.save();

        // Clear the user's cart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Prepare line items for Stripe
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100*80, // Correct spelling here
            },
            quantity: item.quentity, // Ensure the correct key is used (it's likely `quentity` based on your input)
        }));

        // Add delivery charges
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 2 * 100 *80, // Correct spelling here
            },
            quantity: 1,
        });

        // Create Stripe session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Error while placing order:", error);
        res.status(500).json({ success: false, msg: "Error while placing order" });
    }
};

module.exports = { placeOrder };
