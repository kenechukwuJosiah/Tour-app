const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

//Midelware which is a function that can modify incoming data. it stands btw the req and res object
app.use(morgan('dev'));
app.use(express.json());

/*
app.get('/', (req, res) => {
  res.status('200');
  res.json({ message: 'Hello form the server side', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('you can post to the endpoint...'); 
});
*/

/* Building Natours App */

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', addTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);

app.listen(3000, () => {
  console.log('App running on port 3000');
});
