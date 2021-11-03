require("dotenv").config();
const jwt = require('jsonwebtoken')
const database = require('../database/connection')
const usersDatabase = require('../database/connection2')
const responseService = require('./responseService')
const crypt = require('crypto-js')

const connectionUsers = usersDatabase.databaseConnection()
const connection = database.databaseConnection()

exports.adminLogin = async (userName, password) => { 
    try {
        if(!userName || !password)  return responseService.responseService(false,{ msg : "Fields cannot be empty!"}, 'Fields cannot be empty!')
 
        const adminUser =await (await (connectionUsers)).collection('te_admin').findOne({userName});
        const bytes = crypt.AES.decrypt(adminUser.password, process.env.SECRET_KEY)
        const decryptPassword = bytes.toString(crypt.enc.Utf8)
        
        if(!adminUser){
            return responseService.responseService(false, userName, 'Admin does not exist')
        }
        if(password === decryptPassword){
            const token = jwt.sign({
                adminID: adminUser._id,
                admin: adminUser.userName
            }, process.env.SECRET_KEY, {
                expiresIn: '2h'
            })
            return responseService.responseService(true, { userName: adminUser.userName, token}, 'Admin logged in')
        }  else {
            return responseService.responseService(false, {msg: "Invalid Login Details"}, 'Invalid Login Details!')
        }
    } catch (error) {
        return responseService.responseService(false, error.message, 'An error occurred')
    }
}

exports.addAdmin = async (userName, password) => {
    try {
        const encryptPassword = crypt.AES.encrypt(password, process.env.SECRET_KEY).toString()
        const adminUser =await (await (connectionUsers)).collection('te_admin').findOne({userName});

        if(adminUser) {
            return responseService.responseService(false, { msg: 'Admin already exists'}, 'Admin already exists!') 
        } else {
            const response = await (await (connectionUsers)).collection('te_admin').insertOne({userName, password:encryptPassword})
            if(response){
                return responseService.responseService(true, { adminID: response.insertedId }, 'Admin registration successful')
            } else {
                return responseService.responseService(false, { msg: 'Admin registration failed'}, 'Admin registration failed!') 
            }
        }
    } catch (error) {
        return responseService.responseService(false, error.message, 'An error occurred')
    }
}

exports.addAgency = async(agencyName, email, phoneNumber) => {
    try {
        let password = Math.random().toString(36).slice(-8);
        const encryptPassword = crypt.AES.encrypt(password, process.env.SECRET_KEY).toString()
        const agencyUser = await (await (connectionUsers)).collection('te_agency').findOne({agencyName});

        if(agencyUser) {
            return responseService.responseService(false, { msg: 'Agency already exists'}, 'Agency already exists!') 
        } else {
            const response = await (await (connectionUsers)).collection('te_agency').insertOne({agencyName, email, phoneNumber, password:encryptPassword})
            if(response){
                return responseService.responseService(true, { agencyName, email, agencyID: response.insertedId, password }, 'Agency registration successful!')
            } else {
                return responseService.responseService(false, { msg: 'Agency registration failed'}, 'Agency registration failed!') 
            }
        }
    } catch (error) {
        return responseService.responseService(false, error.message, 'An error occurred')
    }    
}