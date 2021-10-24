const reportsService = require('../services/reportsService')

exports.addReport = async(request, response) => {
    const {name ,email, report, title, supportingDocuments} = request.body
    const res = await reportsService.addNewReport(name, email, report, title, supportingDocuments)
    response.send(res)
}

exports.updateReport = async(request, response) => {
    const {status, comment, caseId} = request.body
    const res = await agencyService.updateCaseStatus(status, comment, caseId)
    response.send(res)
}

exports.getUpdate = async(request, response) => {
    const {caseId} = request.params
    const res = await agencyService.getCaseUpdates(caseId)
    response.send(res)
}