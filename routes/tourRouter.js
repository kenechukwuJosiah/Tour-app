const express = require('express');
const { protected, restrictTo } = require('../controlers/authControler');
const {
  getAllTours,
  createTour,
  updateTour,
  deleteTour,
  getTour,
  aliasTopCourse,
  getTourStat,
  getMonthlyPlan,
  getToursWithin,
  getDistances,
  uploadTourImages,
  resizeTourImages,
} = require('../controlers/tourControler');
const reviewRouter = require('./reviewRouter');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

// router.param('id', checkId);
router.route('/tour-stat').get(getTourStat);

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getToursWithin);

router.route('/center/:latlng/unit/:unit').get(getDistances);

router
  .route('/get-monthly-plan/:year')
  .get(protected, restrictTo('admin', 'lead-guide', 'guide'), getMonthlyPlan);

router
  .route('/')
  .get(getAllTours)
  .post(protected, restrictTo('admin', 'lead-guide'), createTour);

router.route('/top-cheap-courses').get(aliasTopCourse, getAllTours);

router
  .route('/:id')
  .get(getTour)
  .patch(
    protected,
    restrictTo('admin', 'lead-guide'),
    uploadTourImages,
    resizeTourImages,
    updateTour
  )
  .delete(protected, restrictTo('admin', 'lead-guide'), deleteTour);

// router
//   .route('/:tourId/reviews')
//   .post(protected, restrictTo('user'), createReview)
//   .get(protected, allReviews);

module.exports = router;
