const express = require('express');
const router = express.Router();
const autosController = require('../controllers/autosController');

router.get('/', autosController.index);
router.get('/:marcas/:dato?', autosController.marca);

module.exports = router;