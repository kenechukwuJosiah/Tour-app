const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
// const crypto = require('crypto');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');
//Utils
const ErrorHandler = require('./util/errHandler');
const contentSecurityPolicy = require('./util/CSP');
const errControler = require('./controlers/errorControler');
//Routes
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/usersRouter');
const reviewRouter = require('./routes/reviewRouter');
const viewRouter = require('./routes/viewRoutes');
const bookingRouter = require('./routes/bookingRouter');

const app = express();

app.use(cors());

app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//1) Global middleware
app.use(express.static(path.join(__dirname, 'public')));

//limit request to the same api
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!',
});

app.use('/api', limiter);

//Protects head
const noncejs = 'aced5c0b7ab3e5e6b0bfeedfdbef3f12';
// const nonce = crypto.randomBytes(16).toString('hex');
const nonceimg = 'c5d09af037061w8079f0d11290e0816f';
const noncefont = 'c5d09af037061few37f0d11290e0816f';
const noncestyle = 'c5d09af037061w8079f0d11290e0816f';
app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use(contentSecurityPolicy(noncejs, nonceimg, noncefont, noncestyle));

console.log(process.env.NODE_ENV);

//Body parser i.e reading data from the request body
app.use(express.json({ limit: '20kb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

//Data sanitization against NOSQl query injection
app.use(mongoSanitize());

//Data Sanitizatin against XSS attacks
app.use(xss());

//prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Serving static files
// app.use(express.static(`${__dirname}/public`));

//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) Base Routes
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/booking', bookingRouter);

app.all('*', (req, res, next) => {
  next(new ErrorHandler(`Can't find ${req.originalUrl} in this server`, 404));
});

app.use(errControler);

module.exports = app;
