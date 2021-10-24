const adminService = require('../services/adminServices')

exports.adminLogin = async(request, response) => {
    const {userName, password} = request.body
    const res = await adminService.adminLogin(userName, password)
    response.send(res)
}

exports.addAdmin = async(request, response) => {
    const {userName, password} = request.body
    const res = await adminService.addAdmin(userName, password)
    response.send(res)
}

exports.addAgency = async(request, response) => {
    const {agencyName, password, confirmPassword, email, phoneNumber} = request.body
    const res = await adminService.addAgency(agencyName, password, confirmPassword, email, phoneNumber)
    response.send(res)
}