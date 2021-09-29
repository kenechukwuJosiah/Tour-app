const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const Tour = require('../../model/tourModel');
const User = require('../../model/userModel');
const Review = require('../../model/reviewModel');

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    // .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('DB connection successful');
  })
  .catch(() => {
    console.log('DB ERROR: Could not connect');
  });

// Read json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

// Import data into database
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Data successfully Loaded');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

//Delete all data from database

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Deleted successfully');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
