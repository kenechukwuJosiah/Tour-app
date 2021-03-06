const Tour = require('../model/tourModel');
const User = require('../model/userModel');
const Booking = require('../model/BookingModel');
const catchAsync = require('../util/catchAsync');
const ErrorHandler = require('../util/errHandler');
const factory = require('../controlers/handlerFactroy');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();
  // 2) Build Template
  // 3) Render that template using tour data form 1)
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour including the reviews and guides
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) return next(new ErrorHandler('Tour not found!', 404));
  //2)Build template
  // console.log(tour);
  // 3) Render template using data from 1)
  return res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Login into your account',
  });
});

exports.getAccount = catchAsync(async (req, res, next) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    { new: true, runValidators: true }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user,
  });
});

exports.getMyTours = catchAsync(async (req, res, next) => {
  //Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  //Find tours with the retured Ids
  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', { title: 'My Tours', tours });
});
