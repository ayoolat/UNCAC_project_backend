const express = require('express');
const router = express.Router();
const agenciesController = require('../controllers/agenciesController')

router.post('/login', agenciesController.agentLogin);
router.post('/signUp/agents', agenciesController.addAgent);
router.post('/findAll/agents', agenciesController.getAllAgencies);

module.exports = router