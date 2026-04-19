const express = require('express');
const router = express.Router();
const clientCtrl = require('../controllers/clientController');

router.post('/', clientCtrl.create);
router.get('/', clientCtrl.getAll);
router.get('/:id', clientCtrl.getById);
router.put('/:id', clientCtrl.update);
router.delete('/:id', clientCtrl.delete);

module.exports = router;
