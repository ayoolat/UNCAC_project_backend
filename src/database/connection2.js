const mongoose = require('mongoose')

module.exports.databaseConnection = async() => {
    try {
        return mongoose.createConnection('mongodb://localhost/usersDatabase')
    } catch (error) {
        console.log(error);
    }
}