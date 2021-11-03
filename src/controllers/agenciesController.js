require("dotenv").config();
const agencyService = require('../services/agenciesService')
const jwt = require('jsonwebtoken')
const usersDatabase = require('../database/connection2')
const database = require('../database/connection')
const crypt = require('crypto-js')

const connectionUsers = usersDatabase.databaseConnection()
const connection = database.databaseConnection()

exports.agentLogin = async(request, response) => {
    const {email, password, agencyId} = request.body
    const res = await agencyService.loginAgent(email, password, agencyId)
    response.send(res)
}

exports.loginAgency = async (request, response) => {
    try {
        const { email, password } = request.body;
        if(!email || !password) {
            return response.status(400).send({
                status: 400, 
                msg : "Fields cannot be empty!"
            })
        }
        const agency = await (await (connectionUsers)).collection('te_agency').findOne({email});
        if(!agency) {
            return response.status(400).send({
                status: 400, 
                msg : `Account does not exists!`
            })
        }

        const bytes = crypt.AES.decrypt(agency.password, process.env.SECRET_KEY)
        const decryptPassword = bytes.toString(crypt.enc.Utf8)
        
        if(password === decryptPassword){
            const token = jwt.sign({
                data : {
                    agencyName : agency.agencyName,
                    email, 
                }
            }, process.env.SECRET_KEY, {
                expiresIn: '2h'
            })
            return response.status(200).send({
                status: 400, 
                data: {
                    token: token,
                    agencyName : agency.agencyName,
                    email
                },
                msg : "Agency login successful!"
            })
        } else {
            return response.status(400).send({
                status: 400, 
                msg : `Incorrect password for ${email}!`
            })
        }
    } catch (error) {
        return response.status(400).send({
            status: 400, 
            error: error.message,
            msg : "An error occurred"
        })    
    }
}

exports.verifyAgencyToken = async(request, response) => {
    try {
        const {token} = request.body
        if(!token || token == null){
            return response.status(400).json({error:" Token can be empty"})
        }
    
        jwt.verify(token, process.env.SECRET_KEY, (err, verified) => {
            if(err){
                return response.status(400).json({error: "Invalid or expired token"})
            }
            else{
                return response.status(200).send({ status: 200, data: verified });
            }
        })
    } catch (e) {
        return response.status(400).send({ status: 400, msg: e.message });
    }
}

exports.claimCase = async (request, response) => {
    try {
        const { caseId, agencyName } = request.body;
        if(!caseId) {
            return response.status(400).send({
                status: 400, 
                msg : "No case ID!"
            })
        }
        const report = await (await (connection)).collection('te_reports').findOne({caseId});
        if(!report) {
            return response.status(400).send({
                status: 400, 
                msg : `Petition does not exists!`
            })
        }

        const res = await (await (connection)).collection('te_updates').insertOne({caseId, agencyName, status: "in_progress", dateCreated : new Date()})
        if(res){
            var myquery = { caseId: caseId };
            var newvalues = { $set: {status: "In Progress" } };
            connection.collection("te_reports").updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
                return response.status(200).send({
                    status: 200,
                    data: {
                        caseId, agencyName, status: "in_progress"
                    }, 
                    msg : `Case claimed, \nCase ID: ${caseId}`
                });
            });
            
        }
    } catch (error) {
        return response.status(400).send({
            status: 400, 
            error: error.message,
            msg : "An error occurred"
        })    
    }
}

exports.addAgent = async(request, response) => {
    const {email, password, confirmPassword, agencyName} = request.body
    const res = await agencyService.addAgent(email, password, confirmPassword, agencyName)
    response.send(res)
}

exports.getAllAgencies = async(request, response) => {
    const res = await agencyService.getAllAgencies()
    response.send(res)
}