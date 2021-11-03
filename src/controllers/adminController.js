require("dotenv").config();
const adminService = require('../services/adminServices');
const jwt = require('jsonwebtoken');

exports.adminLogin = async(request, response) => {
    try {
        const {userName, password} = request.body
        const res = await adminService.adminLogin(userName, password)
        let result  = res;
        (result["status"] == true) ? response.status(200).send(res) : response.status(400).send(res);
    } catch (e) {
        return response.status(400).send({ status: 400, msg: e.message });
    }
}

exports.addAdmin = async(request, response) => {
    try {
        const {userName, password} = request.body
        const res = await adminService.addAdmin(userName, password)
        let result  = res;
        (result["status"] == true)  ? response.status(200).send(res) : response.status(400).send(res);
    } catch (e) {
        return response.status(400).send({ status: 400, msg: e.message });
    }
}

exports.addAgency = async(request, response) => {
    try {
        const {agencyName, email, phoneNumber} = request.body
        const res = await adminService.addAgency(agencyName, email, phoneNumber)
        let result  = res;
        (result["status"] == true)  ? response.status(200).send(res) : response.status(400).send(res);
    } catch (e) {
        return response.status(400).send({ status: 400, msg: e.message });
    }
}

exports.verifyAdminToken = async(request, response) => {
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