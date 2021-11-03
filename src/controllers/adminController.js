const adminService = require('../services/adminServices')

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