const reportsService = require('../services/reportsService')

exports.addReport = async(request, response) => {
    const {name ,email, report, title} = request.body
    const res = await reportsService.addNewReport(name, email, report, title)
    response.send(res)
}

exports.uploadSupportingDocuments = async(request, response) => {
    const {caseId} = request.params
    const res = await reportsService.uploadSupportingDocuments(request.files, caseId)
    response.send(res)
}

exports.updateReport = async(request, response) => {
    const {status, comment, caseId, agencyId} = request.body
    const res = await reportsService.updateCaseStatus(status, comment, caseId, agencyId)
    response.send(res)
}

exports.getUpdate = async(request, response) => {
    const {caseId} = request.params
    const res = await reportsService.getCaseUpdates(caseId)
    response.send(res)
}