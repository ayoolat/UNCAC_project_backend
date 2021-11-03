const reportsService = require('../services/reportsService')

exports.addReport = async(request, response) => { 
    const {title, type, description1, description2, preferredAgency} = request.body
    const res = await reportsService.addNewReport(title, type, description1, description2, preferredAgency);
    (res.status == true) ? response.status(200).send(res) : response.status(400).send(res);
}

exports.createReport = async(request, response) => { 
    try {
        let supportingDocuments;
        const {title, type, description1, description2, preferredAgency} = request.body
        if(!response.files || Object.keys(response.files).length === 0) {
            supportingDocuments = false; 
        } else {
            supportingDocuments = response.files;
        }
        const res = await reportsService.createNewReport(title, type, description1, description2, preferredAgency, "open", supportingDocuments);
        let result  = res;
        (result["status"] == true) ? response.status(200).send(result) : response.status(400).send(result);
    } catch (e) {
        return response.status(400).send({ status: 400, msg: e.message });
    }
}

exports.uploadSupportingDocuments = async(request, response) => {
    const {caseId} = request.params
    const res = await reportsService.uploadSupportingDocuments(request.files, caseId)
    (res.status == true) ? response.status(200).send(res) : response.status(400).send(res);
}

exports.updateReport = async(request, response) => {
    const {status, comment, caseId, agencyId} = request.body
    const res = await reportsService.updateCaseStatus(status, comment, caseId, agencyId)
    (res.status == true) ? response.status(200).send(res) : response.status(400).send(res);
}

exports.getAllCases = async(request, response) => {
    try {
        const res = await reportsService.getAllReportsFull()
        let result  = res;
        (result["status"] == true) ? response.status(200).send(result) : response.status(400).send(result);
    } catch (e) {
        return response.status(400).send({ status: 400, msg: e.message });
    }
}

exports.getAllReports = async(request, response) => {
    try {
        const res = await reportsService.getAllCases()
        let result  = res;
        (result["status"] == true) ? response.status(200).send(res) : response.status(400).send(res);
    } catch (e) {
        return response.status(400).send({ status: 400, msg: e.message });
    }
}
exports.getAllCaseStatus = async(request, response) => {
    const {status, agencyId} = request.body;
    const res = await reportsService.getAllCaseStatus(status, agencyId);
    (res.status == true) ? response.status(200).send(res) : response.status(400).send(res);
}

exports.getUpdate = async(request, response) => {
    try {
        const {caseId} = request.params
        const res = await reportsService.getCaseUpdates(caseId)
        let result  = res;
        (result["status"] == true) ? response.status(200).send(result) : response.status(400).send(result);
    } catch (e) {
        return response.status(400).send({ status: 400, msg: e.message });
    }
}