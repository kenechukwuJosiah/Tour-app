const express = require('express');
const {
  getOverview,
  getTour,
  login,
  getAccount,
  updateUserData,
} = require('../controlers/viewsControler');
const { isLoggedIn, protected } = require('../controlers/authControler');

const router = express.Router();

router.get('/', isLoggedIn, getOverview);

router.get('/login', isLoggedIn, login);

router.get('/tour/:slug', isLoggedIn, getTour);

router.get('/me/:name', protected, getAccount);

router.post('/submit-user-data', protected, updateUserData);

module.exports = router;
