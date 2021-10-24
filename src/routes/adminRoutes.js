const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')
const authentication = require('../middlewares/authentication');

router.post('/login', adminController.adminLogin);
router.post('/signUp', adminController.addAdmin);
router.post('/signUp/agency', authentication, adminController.addAgency);


module.exports = router
