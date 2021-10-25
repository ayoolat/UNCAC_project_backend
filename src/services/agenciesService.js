const jwt = require('jsonwebtoken')
const usersDatabase = require('../database/connection2')
const database = require('../database/connection')
const responseService = require('./responseService')
const crypt = require('crypto-js')

const connection = database.databaseConnection()

exports.loginAgent = async (email, password, agencyId) => {
    try {
        const agent =await (await (connection)).collection('agents').findOne({email});
        const bytes = crypt.AES.decrypt(agent.password, 'mySecret')
        const decryptPassword = bytes.toString(crypt.enc.Utf8)
        if(password === decryptPassword){
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
            const encryptPassword = crypt.AES.encrypt(password, 'mySecret').toString()
            const agency =await (await (connection)).collection('agency').findOne({agencyName});
            const agencyId = agency._id
            const response = await (await (connection)).collection('agents').insertOne({email, password:encryptPassword, agencyId})
            if(response){
                return responseService.responseService(true, response.insertedId, 'Agent login successful')
            }
        }
    } catch (error) {
        return responseService.responseService(false, error.message, 'An error occurred')
    }
}

exports.getAllAgencies = async() => {
    try {
        const agencies = await (await (connection)).collection('agency').find({}).toArray();
        if(agencies){
            return responseService.responseService(true, agencies, 'All agencies successfully fetched')
        }
    } catch (error) {
        return responseService.responseService(false, error.message, 'An error occurred')
    }
}