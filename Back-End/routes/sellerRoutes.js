// routes/sellerRoutes.js
const express = require('express');
const router = express.Router();
const sellerController = require('../Controllers/sellerController');

router.post('/register', sellerController.registerSeller);
router.get('/status/:email', sellerController.getSellerStatus);

module.exports = router;