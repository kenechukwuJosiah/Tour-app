const express = require('express');
const { protected, restrictTo } = require('../controlers/authControler');
const {
  allReviews,
  createReview,
  getReview,
  updateReview,
  deleteReview,
  setTourUserIds,
} = require('../controlers/reviewControler');

// router.use('/:tourId/reviews', reviewRouter);
const router = express.Router({ mergeParams: true });

router.use(protected);

router
  .route('/')
  .get(allReviews)
  .post(restrictTo('user'), setTourUserIds, createReview);

router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('user', 'admin'), updateReview)
  .delete(restrictTo('user', 'admin'), deleteReview);

module.exports = router;
