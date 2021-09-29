const express = require('express');
const { getOverview, getTour, login } = require('../controlers/viewsControler');
const { protected } = require('../controlers/authControler');

const router = express.Router();

router.get('/', getOverview);

router.get('/tour/:slug', protected, getTour);

router.get('/login', login);

module.exports = router;
