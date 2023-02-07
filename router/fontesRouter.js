const express = require('express');
const router = express.Router();
const fontesController = require('../controllers/fontesController')




// Rota de Fontes:
router.get('/', fontesController.fontes)
















module.exports = router;