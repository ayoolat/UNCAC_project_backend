const reportsService = require('../services/reportsService')

exports.addReport = async(request, response) => { 
    const {title, type, description1, description2, preferredAgency} = request.body
    const res = await reportsService.addNewReport(title, type, description1, description2, preferredAgency);
    (res.status) ? response.status(200).send(res) : response.status(400).send(res);
}

exports.createReport = async(request, response) => { 
    let supportingDocuments;
    const {title, type, description1, description2, preferredAgency} = request.body
    if(!response.files || Object.keys(response.files).length === 0) {
        supportingDocuments = false; 
    } else {
        supportingDocuments = response.files;
    }
    const res = await reportsService.createNewReport(title, type, description1, description2, preferredAgency, "open", supportingDocuments);
    (res.status) ? response.status(200).send(res) : response.status(400).send(res);
}

exports.uploadSupportingDocuments = async(request, response) => {
    const {caseId} = request.params
    const res = await reportsService.uploadSupportingDocuments(request.files, caseId)
    (res.status) ? response.status(200).send(res) : response.status(400).send(res);
}

exports.updateReport = async(request, response) => {
    const {status, comment, caseId, agencyId} = request.body
    const res = await reportsService.updateCaseStatus(status, comment, caseId, agencyId)
    (res.status) ? response.status(200).send(res) : response.status(400).send(res);
}

exports.getAllCases = async(request, response) => {
    const res = await reportsService.getAllReportsFull()
    (res.status) ? response.status(200).send(res) : response.status(400).send(res);
}

exports.getAllReports = async(request, response) => {
    const res = await reportsService.getAllCases()
    (res.status) ? response.status(200).send(res) : response.status(400).send(res);
}
exports.getAllCaseStatus = async(request, response) => {
    const {status, agencyId} = request.body;
    const res = await reportsService.getAllCaseStatus(status, agencyId);
    (res.status) ? response.status(200).send(res) : response.status(400).send(res);
}

exports.getUpdate = async(request, response) => {
    const {caseId} = request.params
    const res = await reportsService.getCaseUpdates(caseId)
    (res.status) ? response.status(200).send(res) : response.status(400).send(res);
}