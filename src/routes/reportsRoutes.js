const express = require('express');
const router = express.Router();
const fileUpload = require('../middlewares/fileUpload')
const reportsController = require('../controllers/reportsController');
const validation = require('../middlewares/validator')
const schema = require('../models/joiModels')
const authentication = require('../middlewares/authentication');

router.post('/new', validation(schema.addReport),reportsController.addReport);
router.post('/new-report', validation(schema.createReport), reportsController.createReport);
router.post('/upload/:caseId', fileUpload.fileUpload, reportsController.uploadSupportingDocuments);
router.post('/update', validation(schema.updateReport), authentication, reportsController.updateReport);
router.get('/find/:caseId', reportsController.getUpdate);
router.get('/find', reportsController.getAllCases);
router.get('/all', reportsController.getAllReports);
router.get('/find/caseStatus/:status/:agencyId', authentication, reportsController.getAllCaseStatus);

module.exports = router