const mongoose = require('mongoose');

const connectToDatabase = async()=>{
    await mongoose.connect(process.env.DB_URL)
    console.log('Connected to MongoDB')
}

module.exports = connectToDatabase;