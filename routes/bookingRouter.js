const express = require('express');
const { getCheckoutSession } = require('../controlers/bookingController');
const { protected } = require('../controlers/authControler');

const router = express.Router();

router.get('/checkout-session/:tourID', protected, getCheckoutSession);

module.exports = router;
