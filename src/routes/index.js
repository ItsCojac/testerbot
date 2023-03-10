const express = require('express');
const authRoutes = require('./auth');
const arbitrageRoutes = require('./arbitrage');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/arbitrage', arbitrageRoutes);

module.exports = router;
