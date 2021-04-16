const express = require('express');
const {getAllTours, getTour, createTour, updateTour, deleteTour, aliasTopTours, getTourStats, getMonthlyPlan} = require('./../controllers/tourController');

const router = express.Router();


router.get('/top-5',aliasTopTours, getAllTours);
router.get('/monthly-plan/:year', getMonthlyPlan);
router.get('/tourstats',getTourStats);

router
  .route('/')
  .get(getAllTours)
  .post(createTour);

router
  .route('/:id')
  .get(getTour)
  .put(updateTour)
  .delete(deleteTour);

module.exports = router;