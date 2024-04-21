const express = require('express');
const router = express.Router();
const cartController = require('../controlers/cartControllers');

router.get('/getCart', cartController.getCart)
router.post('/saveCart', cartController.saveCart)
router.delete('/deleteCart/:id', cartController.deleteCart)

module.exports = router;