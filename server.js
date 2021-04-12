const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Global synchronous error handler
process.on('uncaughtException', (err) => {
  console.log(err.name, '-', err.message);
  console.log('Uncaught exception, shutting down...');
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB CONNECTION SUCCESS'));

const port = process.env.PORT || 3005;
const server = app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});

process.on('SIGTERM', () => {
  console.log(
    'SIGTERM received, shutting down gracefully. All impending requests will be processed before shutdown.'
  );
  server.close(() => {
    console.log('Process terminated.');
  });
});
