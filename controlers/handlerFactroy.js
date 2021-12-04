const catchAsync = require('../util/catchAsync');
const ErrorHandler = require('../util/errHandler');
const APIFeatures = require('../util/apiFeature');

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };
    // Execute query
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // const docs = await features.query.explain();
    const docs = await features.query;
    res.status(200).json({
      status: 'success',
      results: docs.length,
      requestTime: req.requestTime,
      data: {
        data: docs,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(
        new ErrorHandler('No document found with the ID entered', 404)
      );
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(
        new ErrorHandler('No document found with the ID entered', 404)
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, popOpt) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    console.log('REAChED');

    res.cookie('cook', 'lksjdoislkdjslkdjslkdj', {
      secure: false,
      httpOnly: true,
      maxAge: 3333000,
    });

    if (popOpt) query = Model.findById(req.params.id).populate(popOpt);
    const doc = await query;

    if (!doc) {
      return next(
        new ErrorHandler('No doccument found with the ID entered', 404)
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
