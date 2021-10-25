const jwt = require('jsonwebtoken')
const database = require('../database/connection')
const usersDatabase = require('../database/connection2')
const responseService = require('./responseService')
const crypt = require('crypto-js')

const connectionUsers = usersDatabase.databaseConnection()
const connection = database.databaseConnection()

exports.adminLogin = async (userName, password) => {
    const adminUser =await (await (connectionUsers)).collection('admin').findOne({userName});
    const bytes = crypt.AES.decrypt(adminUser.password, 'mySecret')
    const decryptPassword = bytes.toString(crypt.enc.Utf8)
    
    if(!adminUser){
        return responseService.responseService(false, userName, 'User does not exist')
    }
    else if(password === decryptPassword){
        const token = jwt.sign({
            data : userName
        }, 'mySecret', {
            expiresIn: '2h'
        })
        return responseService.responseService(true, token, 'admin logged in')
    }  
}

exports.addAdmin = async (userName, password) => {
    try {
        const encryptPassword = crypt.AES.encrypt(password, 'mySecret').toString()
        const response = await (await (connectionUsers)).collection('admin').insertOne({userName, password:encryptPassword})
        if(response){
            return responseService.responseService(true, response.insertedId, 'admin sign up successful')
        }
    } catch (error) {
        return responseService.responseService(false, error.message, 'An error occurred')
    }
}

exports.addAgency = async(agencyName, email, phoneNumber) => {
    try {
        const response = await (await (connection)).collection('agency').insertOne({agencyName, email, phoneNumber})
        if(response){
            return responseService.responseService(true, response.insertedId, 'Agency sign up successful')
        }
    } catch (error) {
        return responseService.responseService(false, error.message, 'An error occurred')
    }    
}