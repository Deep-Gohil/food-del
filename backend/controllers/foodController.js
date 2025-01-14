const fs = require('fs');
const foodModel = require('../models/foodModel');

// add food 
const addFood = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: "No file uploaded" });
        }

        const image_filename = req.file.filename;
        console.log("Uploaded File:", req.file);

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename,
        });

        await food.save();
        res.json({ msg: "Food Added Successfully" });
    } catch (error) {
        console.error("Error While Adding Food:", error);
        res.status(500).json({ msg: "Error While Adding Food" });
    }
};

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ data: foods });
    }
    catch (error) {
        console.error("Error While Listing Foods:", error);
        res.status(500).json({ msg: "Error While Listing Foods" });
    }
}

const removeFood = async (req, res) => {
try {
    let {id} = req.params
    const food = await foodModel.findById(req.body.id)
    fs.unlink(`uploads/${food.image}`,()=>{})

    await foodModel.findByIdAndDelete(id)
    res.json({ msg: "Food Removed Successfully" })

} catch (error) {
    console.error("Error While Removing Food:", error);
    res.status(500).json({ msg: "Error While Removing Food" });
}
}

module.exports = { addFood, listFood,removeFood }