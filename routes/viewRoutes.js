const express = require('express');
const {
  getOverview,
  getTour,
  login,
  getAccount,
  updateUserData,
  getMyTours,
} = require('../controlers/viewsControler');
const { isLoggedIn, protected } = require('../controlers/authControler');
const { createBookingCheckout } = require('../controlers/bookingController');
const router = express.Router();

router.get('/', createBookingCheckout, isLoggedIn, getOverview);

router.get('/login', isLoggedIn, login);

router.get('/tour/:slug', isLoggedIn, getTour);

router.get('/me/:name', protected, getAccount);

router.post('/submit-user-data', protected, updateUserData);

router.get('/my-tours', protected, getMyTours);
module.exports = router;
