const jwt = require('jsonwebtoken')
const database = require('../database/connection')
const usersDatabase = require('../database/connection2')

const connectionUsers = usersDatabase.databaseConnection()
const connection = database.databaseConnection()

exports.adminLogin = async (userName, password) => {
    const adminUser =await (await (connectionUsers)).collection('admin').findOne({userName});
    if(password === adminUser.password){
        const token = jwt.sign({
            data : userName
        }, 'mySecret', {
            expiresIn: '2h'
        })

        return{
            status : 'OK',
            data : {token},
            message : ""
        }
    }else{
        return{
            status : 'OK',
            data : {},
            message : "invalid password"
        }
    }
}

exports.addAdmin = async (userName, password) => {
    try {
        const response = await (await (connectionUsers)).collection('admin').insertOne({userName, password})
        if(response){
            return{
                status : 'OK',
                data : {adminId : response.insertedId},
                message : ""
            }
        }
    } catch (error) {
        console.log(error)
    }
}

exports.addAgency = (agencyName, password, confirmPassword, email, phoneNumber) => {
    if(password === confirmPassword){
        try {
            const response = await (await (connection)).collection('agency').insertOne({agencyName, password, email, confirmPassword, phoneNumber})
            if(response){
                return{
                    status : 'OK',
                    data : {adminId : response.insertedId},
                    message : ""
                }
            }
        } catch (error) {
            
        }    
    }

}