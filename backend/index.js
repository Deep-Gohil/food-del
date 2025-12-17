const express = require("express")
require("dotenv").config()
const cors = require("cors")
const connectToDatabase = require("./config/db")
const foodRouter = require("./routers/foodRouter")
const userRouter = require("./routers/userRoute")
const cartRouter = require("./routers/cartRouter")
const orderRouter = require("./routers/orderRouter")


const app = express()

// middlware 
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello from server")
})

// routes
app.use("/api/food", foodRouter)
app.use("/images", express.static("uploads"))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

const axios = require("axios");

// Your API base URL
const BASE_URL = "https://fitterritory-backend-1.onrender.com/api/v1";

// List of endpoints to hit randomly
const endpoints = [
    "/country/all",
    "/state/all/682c55cf62a5ebf6f55b09f8",
    "/city/all/682c55cf62a5ebf6f55b0c4f",
    "/",
];

// Function to hit a random endpoint
async function pingRandomEndpoint() {
    try {
        const randomEndpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
        const url = BASE_URL + randomEndpoint;

        console.log("Calling:", url);

        const res = await axios.get(url);
        console.log("Status:", res.status, "Time:", new Date().toLocaleTimeString());
    } catch (error) {
        console.log("Error calling endpoint:", error.message);
    }
}

// Run every 1 minute
setInterval(pingRandomEndpoint, 60 * 1000);

// First immediate call
pingRandomEndpoint();

let port = process.env.PORT || 8090
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
    connectToDatabase()
})