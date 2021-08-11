const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

mongoose
  .connect(process.env.DATABASE_LOCAL, {
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('App running on port 3000');
});
