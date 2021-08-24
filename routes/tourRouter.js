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
} = require('../controlers/tourControler');

const router = express.Router();

// router.param('id', checkId);
router.route('/tour-stat').get(protected, getTourStat);

router.route('/get-monthly-plan/:year').get(protected, getMonthlyPlan);

router.route('/').get(protected, getAllTours).post(createTour);

router.route('/top-cheap-courses').get(aliasTopCourse, getAllTours);

router
  .route('/:id')
  .get(protected, getTour)
  .patch(protected, updateTour)
  .delete(protected, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
