const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');
const authentication = require('../middlewares/authentication');

router.post('/new/report', reportsController.addReport);
router.post('/update/report', authentication, reportsController.updateReport);
router.post('/findAll/reports', reportsController.getUpdate);

module.exports = router