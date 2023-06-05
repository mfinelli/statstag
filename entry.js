// https://github.com/sveltejs/kit/issues/6841#issuecomment-1330555730
import { server as app } from './index.js';

function gracefulShutdown() {
  console.log('Shutting down...');
  app.server.close();
}

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
