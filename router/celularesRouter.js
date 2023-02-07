const express = require('express');
const router = express.Router();
const celularesController = require('../controllers/celularesController')



router.get('/', celularesController.celulares);




module.exports = router