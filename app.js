const express = require('express');
const path = require('path');
const resultRouter = require('./routes/resultRoutes');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json({ limit: '10kb' }));

app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/api/v1/results', resultRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
