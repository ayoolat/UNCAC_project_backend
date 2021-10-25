const express = require('express');
const router = express.Router();
const hallOfShameController = require('../controllers/hallOfShameController')
const authentication = require('../middlewares/authentication');
const validation = require('../middlewares/validator')
const schema = require('../models/joiModels')

router.get('/get', hallOfShameController.viewToHallOfShame);
router.post('/new', authentication, validation(schema.addToHallOfShame), hallOfShameController.addToHallOfShame);
router.post('/upload/image/:hallOfShameId', authentication, hallOfShameController.addImage);

module.exports = router