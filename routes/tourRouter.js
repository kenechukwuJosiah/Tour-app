const express = require('express');
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
router.route('/tour-stat').get(getTourStat);

router.route('/get-monthly-plan/:year').get(getMonthlyPlan);

router.route('/').get(getAllTours).post(createTour);

router.route('/top-cheap-courses').get(aliasTopCourse, getAllTours);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
