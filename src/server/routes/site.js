const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');

router.delete('/delete', productController.delete);
router.put('/update', productController.update);
router.post('/create', productController.create);
router.get('/home', productController.index);

module.exports = router;