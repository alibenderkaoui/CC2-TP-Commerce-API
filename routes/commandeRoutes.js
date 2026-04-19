const express = require('express');
const router = express.Router();
const commandeCtrl = require('../controllers/commandeController');

router.post('/', commandeCtrl.create);
router.get('/', commandeCtrl.getAll);
router.get('/:id', commandeCtrl.getById);
router.put('/:id', commandeCtrl.update);
router.delete('/:id', commandeCtrl.delete);

module.exports = router;
