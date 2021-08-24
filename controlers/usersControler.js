const User = require('../model/userModel');
const catchAsync = require('../util/catchAsync');
const ErrorHandler = require('../util/errHandler');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user Posts password data
  if (req.body.password || req.body.passwordConfirm)
    return next(new ErrorHandler('This route is not for password update', 400));
  // 2) Filtered out unwanted fields

  const filteredBody = filterObj(req.body, 'name', 'email');

  //Updated user data
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = (req, res, next) => {
  res.status(500).json({
    status: 'faild',
    message: 'Route not yet implemented',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'faild',
    message: 'Route not yet implemented',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'faild',
    message: 'Route not yet implemented',
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'faild',
    message: 'Route not yet implemented',
  });
};
