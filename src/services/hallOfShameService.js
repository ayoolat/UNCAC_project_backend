const database = require('../database/connection')
const responseService = require('./responseService')

const connection = database.databaseConnection()

exports.addToHallOfShame = async(fullName, crime, consequence, gender) => {
    try {
        const response = await (await (connection)).collection('hallOfShame').insertOne({fullName, gender, crime, consequence})
        if(response){
            return responseService.responseService(true, response.insertedId, 'Entry into hall of shame successful')
        }
    } catch (error) {
        console.log(error);
        return responseService.responseService(false, error.message, 'An error occurred')
    }
}

exports.uploadImage = async(Image, hallOfShameId) => {
    try {
        const response = await (await (connection)).collection('hallOfShameImages').insertOne({Image, hallOfShameId})
        if(response){
            return responseService.responseService(true, response, 'Image uploaded')
        }
    } catch (error) {
        return responseService.responseService(false, error.message, 'An error occurred')
    }
}

exports.getAllFromHallOfShame = async() => {
    try {
        const hallOfShame = await (await (connection)).collection('hallOfShame').find().toArray()
        if(hallOfShame){
            return responseService.responseService(true, hallOfShame, 'Entry into hall of shame successful')
        }
    } catch (error) {
        return responseService.responseService(false, error.message, 'An error occurred')
    }
}