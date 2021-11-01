const mongoose = require('mongoose')

module.exports.databaseConnection = async() => {
    try {
        return mongoose.createConnection(process.env.MONGO_DB_URI);
    } catch (error) {
        console.log(error);
    }
}