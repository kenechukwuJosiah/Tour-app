const express = require('express');
const {
  checkId,
  getAllTours,
  createTour,
  updateTour,
  deleteTour,
  getTour,
  checkBody,
} = require('./../controlers/tourControler');

const router = express.Router();

router.param('id', checkId);

router.route('/').get(getAllTours).post(checkBody, createTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
