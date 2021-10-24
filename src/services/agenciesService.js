const jwt = require('jsonwebtoken')
const usersDatabase = require('../database/connection2')

const connectionUsers = usersDatabase.databaseConnection()

exports.loginAgent = async (email, password) => {
    const adminUser =await (await (connectionUsers)).collection('agency').findOne({email});
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

exports.addAgent = async (email, password, confirmPassword, agencyName) => {
    try {
        if(confirmPassword === password){
            const agency =await (await (connectionUsers)).collection('agency').findOne({agencyName});
            console.log(agency.insertedId);
            const agencyId = agency.insertedId
            const response = await (await (connection)).collection('agents').insertOne({email, password, agencyId})
            if(response){
                return{
                    status : 'OK',
                    data : {agent : response.insertedId},
                    message : ""
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
}

exports.getAllAgencies = () => {
    const response =await (await (connectionUsers)).collection('agency').find();
    if(response){
        return{
            status : 'OK',
            data : response,
            message : ""
        }
    }
}