const foodModel = require("../models/foodModel");
const userModel = require("../models/userModel");

const addToCart = async (req, res) => {
    try {
        // Find the user by ID
        let userData = await userModel.findOne({ _id: req.body.userId });
        console.log("userData", userData);

        // Check if the cart exists, initialize it if not
        if (!userData.cart) {
            userData.cart = [];
        }

        // Check if the item already exists in the cart
        const itemIndex = userData.cart.findIndex(item => item._id.toString() === req.body.itemId);
        
        if (itemIndex > -1) {
            // If the item exists, increment its quantity
            userData.cart[itemIndex].quantity += 1;
        } else {
            // If the item doesn't exist, add it to the cart
            userData.cart.push({ _id: req.body.itemId, quantity: 1 });
        }

        // Save the updated user data
        await userModel.findByIdAndUpdate(req.body.userId, { cart: userData.cart });

        // Respond with success message
        res.json({ success: true, msg: "Item added to cart successfully", cart: userData.cart });

    } catch (error) {
        console.error("Error while adding item to cart:", error);
        res.status(500).json({ success: false, msg: "Error while adding item to cart" });
    }
};

const removeFromCart = async(req,res)=>{
    try {
        // Find the user by ID
        let userData = await userModel.findOne({ _id: req.body.userId });
        console.log("userData", userData);
        
        // Check if the cart exists
        if (!userData.cart) {
            return res.status(404).json({ msg: "Cart not found" });
        }
        
        // Find the item to remove by ID
        const itemIndex = userData.cart.findIndex(item => item._id.toString() === req.body.itemId);
        
        if (itemIndex > -1) {
            // If the item exists, remove it from the cart
            userData.cart.splice(itemIndex, 1);
        
            // Save the updated user data
            await userModel.findByIdAndUpdate(req.body.userId, { cart: userData.cart });
            
            // Respond with success message
            res.json({ success: true, msg: "Item removed from cart successfully", cart: userData.cart });
        } else {
            // If the item doesn't exist, respond with an error message
            return res.status(404).json({ msg: "Item not found in cart" });

        }
    } catch (error) {
        console.error("Error while removing item from cart:", error);
        res.status(500).json({ success: false, msg: "Error while removing item from cart" });
    }
}

const getCart = async (req, res) => {
    try {
        // Find the user by ID
        let userData = await userModel.findOne({ _id: req.body.userId });

        console.log("user data",userData);
        
        // Check if user data is found
        if (!userData) {
            return res.status(404).json({ msg: "User not found" });
        }

        console.log("userData", userData);

        // Check if the cart exists
        if (!userData.cart) {
            return res.status(404).json({ msg: "Cart not found" });
        }

        // Respond with the cart data and total cost
        res.json({ success: true, cart: userData.cart });
    } catch (error) {
        console.error("Error while getting cart:", error);
        res.status(500).json({ success: false, msg: "Error while getting cart" });
    }
};


module.exports = { addToCart, removeFromCart, getCart };