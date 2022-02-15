const express = require('express');
const {
  getCheckoutSession,
  createBooking,
  getBooking,
  getAllBooking,
  updateBooking,
  deleteBooking,
} = require('../controlers/bookingController');
const { protected, restrictTo } = require('../controlers/authControler');

const router = express.Router();

router.use(protected);

router.get('/checkout-session/:tourID', protected, getCheckoutSession);

router.use(restrictTo('admin', 'lead-guide'));

router.route('/').get(getAllBooking).post(createBooking);
router.route('/:id').get(getBooking).patch(updateBooking).delete(deleteBooking);
module.exports = router;
