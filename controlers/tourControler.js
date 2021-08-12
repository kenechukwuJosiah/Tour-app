const Tour = require('../model/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    //Build query
    // 1) filtering
    const queryObj = { ...req.query };
    const excludedFeilds = ['page', 'sort', 'limit', 'feilds'];
    excludedFeilds.forEach((el) => delete queryObj[el]);
    console.log(queryObj);

    // 1B) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // console.log('Query:', JSON.parse(queryStr));

    let query = Tour.find(JSON.parse(queryStr));

    // 2)
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // {difficulty: 'easy', duration: {$gte: 5 }}
    // { difficulty: 'easy', duration: { gte: '5' } }
    // const tours = Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    // Execute query
    const tours = await query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      requestTime: req.requestTime,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: 'Error Fetching Tours',
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: 'Invaild Id',
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(200).json({
      status: 'failed',
      message: 'failed to create',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(204).json({
      status: 'failed',
      message: 'Invalid id entered',
    });
  }
};
