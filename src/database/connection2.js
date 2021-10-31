const mongoose = require('mongoose')

module.exports.databaseConnection = async() => {
    try {
        return mongoose.createConnection('mongodb://localhost:27017/usersDatabase')
        console.log("Successfully established DB Connection")
    } catch (error) {
        console.log(error);
    }
}