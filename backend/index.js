const express = require("express")
require("dotenv").config()
const cors = require("cors")
const connectToDatabase = require("./config/db")
const foodRouter = require("./routers/foodRouter")


const app = express()

// middlware 
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Hello from server")
})

// routes
app.use("/api/food",foodRouter)
app.use("/images",express.static("uploads"))


let port = process.env.PORT || 8090
app.listen(port,()=>{
    console.log(`Listening on http://localhost:${port}`);
    connectToDatabase()
})