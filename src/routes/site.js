const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');

router.delete('/delete/:_id', productController.delete);
router.put('/update/:_id', productController.update);
router.post('/create', productController.create);
router.get('/home', productController.index);

module.exports = router;