const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: {
        type: [
            {
                foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
                quantity: { type: Number, default: 1 }
            }
        ],
        default: [] // Ensures cart is initialized as an empty array
    }
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
module.exports = userModel;
