require("dotenv").config();
const mongoose = require('mongoose')

module.exports.databaseConnection = async() => {
    try {
        console.log(process.env.MONGO_DB_URI)
        return mongoose.createConnection(process.env.MONGO_DB_URI);
    } catch (error) {
        console.log(error);
    }
}