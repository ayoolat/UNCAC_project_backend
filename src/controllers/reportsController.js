const reportsService = require('../services/reportsService')

exports.addReport = async(request, response) => { 
    const {title, type, description1, description2, preferredAgency} = request.body
    const res = await reportsService.addNewReport(title, type, description1, description2, preferredAgency);
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

exports.getAllCases = async(request, response) => {
    const res = await reportsService.getAllCases()
    response.send(res)
}
exports.getAllCaseStatus = async(request, response) => {
    const {status, agencyId} = request.body;
    const res = await reportsService.getAllCaseStatus(status, agencyId);
    response.send(res)
}

exports.getUpdate = async(request, response) => {
    const {caseId} = request.params
    const res = await reportsService.getCaseUpdates(caseId)
    response.send(res)
}