const jwt = require('jsonwebtoken')
const usersDatabase = require('../database/connection2')

const connectionUsers = usersDatabase.databaseConnection()

exports.addNewReport = async (name ,email, report, title, supportingDocuments) => {
    const response = await (await (connection)).collection('reports').insertOne({name ,email, report, title, supportingDocuments, dateCreated : new Date()})
    if(response){
        return{
            status : 'OK',
            data : {caseId : response.id},
            message : ""
        }
    }
}

exports.updateCaseStatus = async (status, comment, caseId) => {
    try {
        const response = await (await (connection)).collection('reports').insertOne({status, comment, caseId, lastUpdated : new Date()})
        if(response){
            return{
                status : 'OK',
                data : {comment},
                message : ""
            }
        }
    } catch (error) {
        console.log(error)
    }
}

exports.getCaseUpdates = (caseId) => {
    try {
        const response =await (await (connectionUsers)).collection('reports').findOne({caseId});
        if(response){
            return{
                status : 'OK',
                data : {comment},
                message : ""
            }
        }
    } catch (error) {
        console.log(error)
    }
}