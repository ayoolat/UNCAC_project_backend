const jwt = require('jsonwebtoken')
const usersDatabase = require('../database/connection2')
const database = require('../database/connection')
const { v4: uuidv4 } = require('uuid')
const responseService = require('./responseService')
const { ObjectId } = require('bson')

const connection = database.databaseConnection()
const connectionUsers = usersDatabase.databaseConnection()

exports.addNewReport = async (name ,email, report, title) => {
    try {
        const caseId = 'UNCAC-' + uuidv4()
        const response = await (await (connection)).collection('reports').insertOne({caseId, name ,email, report, title, dateCreated : new Date()})
        if(name || email){
            await (await (connectionUsers)).collection('whistleBlower').insertOne({name, email, caseId:response.insertedId, dateCreated: new Date()})
        }
        if(response){
            return responseService.responseService(true, caseId, 'Agent login successful')
        }
    } catch (error) {
        return responseService.responseService(false, error.message, 'An error occurred')
    }
}

exports.uploadSupportingDocuments = async (supportingDocuments, caseId) => {
    try {
        if(supportingDocuments){
            supportingDocuments.forEach(async(documents) => {
                const file = `uploads/${documents.originalname}`
                await (await (connection)).collection('supportingDocuments').insertOne({caseId, document:file, dateCreated: new Date()})
            });
        }
        return responseService.responseService(true, caseId, 'Documents successfully uploaded')
    } catch (error) {
        return responseService.responseService(false, error.message, 'An error occurred')
    }
}

exports.updateCaseStatus = async (status, comment, caseId, agencyId) => {
    try {
        const caseStatuses = {
            1 : "UnAccepted",
            2 : "Accepted",
            3 : "In Progress",
            4 : "Completed",
            5 : "False story",
        }
        const response = await (await (connection)).collection('updates').insertOne({status: caseStatuses[status], comment, caseId, agencyId, lastUpdated : new Date()})
        if(response){
            return responseService.responseService(true, comment, 'Agent login successful')
        }
    } catch (error) {
        return responseService.responseService(false, error.message, 'An error occurred')
    }
}

exports.getCaseUpdates = async (Id) => {
    try {
        const reports =await (await (connection)).collection('reports').findOne({caseId:Id});
        if(reports){
            const update = await (await (connection)).collection('updates').findOne({caseId:Id});
            const agencyId = update.agencyId
            const agency = await (await (connection)).collection('agency').find(ObjectId(agencyId)).toArray();
            const {name, email, report, title, dateCreated, caseId} = reports
            const {status, comment, lastUpdated} = update
            const {agencyName, phoneNumber} = agency[0]
            const agencyEmail = agency[0].email
            return responseService.responseService(true, { name, email, report, title, dateCreated, caseId, status, comment, lastUpdated, agencyName, phoneNumber, agencyEmail}, 'Report successfully fetched')
        }
    } catch (error) {
        return responseService.responseService(false, error.message, 'An error occurred')
    }
}

exports.getAllCases = async () => {
    try {
        const reports =await (await (connection)).collection('reports').find().toArray();
        if(reports){
            let result = [...reports];

            result.forEach( value => {
                    value.setName = "n/a";
                    value.setEmail = "n/a";
                }
            );

            return responseService.responseService(true, result, 'Reports successfully fetched')
        }
    } catch (error) {
        return responseService.responseService(false, error.message, 'An error occurred')
    }
}

exports.getAllCaseStatus = async (status, agencyId) => {
    try {
        const reports =await (await (connection)).collection('updates').find({status, agencyId},  { projection: { agencyId: 0 } }).toArray();
        if(reports){
            return responseService.responseService(true, reports, 'Reports successfully fetched')
        }
    } catch (error) {
        return responseService.responseService(false, error.message, 'An error occurred')
    }
}

exports.getAllUpdates = async (Id) => {
    try {
        const updates = await (await (connection)).collection('updates').find({caseId:Id});
        if(updates){
            return responseService.responseService(true, updates, 'Agent login successful')
        }
    } catch (error) {
        return responseService.responseService(false, error.message, 'An error occurred')
    }
}