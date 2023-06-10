import { handler } from './handler.js';
import express from 'express';

const app = express();

// don't allow the app to operate on its fly.dev domain
const flydev = (req, res, next) => {
  if (req.headers.host !== 'statstag.com') {
    res.redirect('https://statstag.com');
  } else {
    next();
  }
};

app.use(flydev);

app.use(handler);

const server = app.listen(3000, () => {
  console.log('Listening on port 3000...');
});

function shutdown() {
  console.log('Interrupt received, shutting down gracefully...');

  server.close(() => {
    console.log('Shutdown complete');
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
