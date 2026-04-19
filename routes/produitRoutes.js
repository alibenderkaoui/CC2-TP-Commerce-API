const express = require('express');
const router = express.Router();
const produitCtrl = require('../controllers/produitController');

router.post('/', produitCtrl.create);
router.get('/', produitCtrl.getAll);
router.get('/:id', produitCtrl.getById);
router.put('/:id', produitCtrl.update);
router.delete('/:id', produitCtrl.delete);

module.exports = router;
