const jwt = require('jsonwebtoken')
const usersDatabase = require('../database/connection2')
const database = require('../database/connection')
const responseService = require('./responseService')

const connection = database.databaseConnection()
const connectionUsers = usersDatabase.databaseConnection()

exports.loginAgent = async (email, password, agencyId) => {
    try {
        const agent =await (await (connection)).collection('agents').findOne({email});
        if(password === agent.password){
            const token = jwt.sign({
                data : {
                    email, 
                    password, 
                    agencyId
                }
            }, 'mySecret', {
                expiresIn: '2h'
            })
            return responseService.responseService(true, token, 'Agent login successful')
        }else{
            return responseService.responseService(false, email, `Incorrect password for ${email}`)
        }
    } catch (error) {
        return responseService.responseService(false, error.message, 'An error occurred')
    }
}

exports.addAgent = async (email, password, confirmPassword, agencyName) => {
    try {
        if(confirmPassword === password){
            const agency =await (await (connection)).collection('agency').findOne({agencyName});
            const agencyId = agency._id
            const response = await (await (connection)).collection('agents').insertOne({email, password, agencyId})
            if(response){
                return responseService.responseService(true, response.insertedId, 'Agent login successful')
            }
        }
    } catch (error) {
        return responseService.responseService(false, error.message, 'An error occurred')
    }
}

exports.getAllAgencies = async() => {
    const response =await (await (connection)).collection('agency').find({});
    if(response){
        return responseService.responseService(true, response, 'All agencies successfully fetched')
    }
}