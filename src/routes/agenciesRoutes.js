const express = require('express');
const router = express.Router();
const agenciesController = require('../controllers/agenciesController')
const validation = require('../middlewares/validator')
const schema = require('../models/joiModels')

router.post('/agents/login', agenciesController.agentLogin);
router.post('/agents/signUp', validation(schema.signUpAgent), agenciesController.addAgent);
router.get('/agencies/findAll', agenciesController.getAllAgencies);

module.exports = router