const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Handles sync unhandle exception
process.on('uncaughtException', (err) => {
  console.log('App shotting down...');
  console.log(err.name, err.message);
  process.exit();
});

dotenv.config({ path: './config.env' });
const app = require('./app');

/*
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
*/

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('DB connection successful');
  });
// .catch(() => {
//   console.log('DB ERROR: Could not connect');
// });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log('App running on port 3000');
});

// Handles async unhandled rejection
process.on('unhandledRejection', (err) => {
  console.log('App shoting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
