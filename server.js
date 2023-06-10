import { handler } from './handler.js';
import express from 'express';

const app = express();

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
