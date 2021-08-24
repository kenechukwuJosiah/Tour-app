const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const catchAsync = require('../util/catchAsync');
const ErrorHandler = require('../util/errHandler');
const sendEmail = require('../util/email');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_PKEY, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

const createSendToken = (user, statuscode, res) => {
  const token = signToken(user._id);
  const cookieOpt = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    //secure: false, makes it secure via https,
    httpOnly: true, //makes it impossible for the cookie to be modified in any way by the browser
  };

  if (process.env.NODE_ENV === 'production') cookieOpt.secure = true;

  res.cookie('jwt', token, cookieOpt);

  user.password = undefined;

  res.status(statuscode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return next(new ErrorHandler('please provide email and password', 400));
  }

  //Check if  user exist && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new ErrorHandler('Incorrect email or password', 401));

  //if everything is ok, send back JWT
  createSendToken(user, 200, res);
});

exports.protected = catchAsync(async (req, res, next) => {
  //Get token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token)
    return next(
      new ErrorHandler(`You're not logged in Please login to get access.`, 401)
    );

  //verification of token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_PKEY
  ).catch((err) => next(err));
  //check if user still exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    return next(new ErrorHandler('This user no longer exist', 401));
  //check if user changed password after the token was issued
  if (currentUser.isPasswordChanged(decoded.iat))
    return next(
      new ErrorHandler(
        'User recently changed password! Please log in again',
        401
      )
    );
  // Grant access to the protect routes
  req.user = currentUser;
  next();
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new ErrorHandler('You do not have access to perform this action', 403)
      );

    next();
  };

exports.forgetPassword = async (req, res, next) => {
  // 1) Get user bases on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new ErrorHandler('User email does not exist', 404));
  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  // 3) send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetpassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfime to: ${resetURL}.\nIf you did'nt forget your password, please ignor this email `;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your Password reset token (valid for 10min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new ErrorHandler('There was an error sending mail. Try again!', 500)
    );
  }
};

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) if token is not expired, and there is user, set the new password

  if (!user)
    return next(new ErrorHandler('Token is invalid or has expired', 400));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) update password property for the user => implemented in the pre hook middleware.

  // 4) log the user in, and send jwt
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from the collection
  const user = await User.findById(req.user.id).select('+password');
  // 2) Check if the posted password is correct
  if (!(await user.correctPassword(req.body.currentPass, user.password)))
    return next(new ErrorHandler('password is incorrect', 401));
  // 3) If the password is correct then update the password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // 4) Log the user in
  createSendToken(user, 200, res);
});