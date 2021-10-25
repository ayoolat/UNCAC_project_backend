const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')
const authentication = require('../middlewares/authentication');
const validation = require('../middlewares/validator')
const schema = require('../models/joiModels')

router.post('/login', adminController.adminLogin);
router.post('/signUp', validation(schema.signUpAdmin), adminController.addAdmin);
router.post('/signUp/agency', validation(schema.signUpAgency),authentication, adminController.addAgency);

module.exports = router