const {Router} = require("express");
const { addFood, listFood, removeFood } = require("../controllers/foodController");
const multer = require("multer");

const foodRouter = Router();


// image 

const storage = multer.diskStorage({
    destination:"uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood);
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)

module.exports = foodRouter;