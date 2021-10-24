const agencyService = require('../services/agenciesService')

exports.agentLogin = async(request, response) => {
    const {email, password} = request.body
    const res = await agencyService.loginAgent(email, password)
    response.send(res)
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