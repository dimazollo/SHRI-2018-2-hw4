import { uptimeHandler } from './handlers/uptime';

import express from 'express';
const app = express();
const cors = require('cors');

// const errorHandler = require('./handlers/error');
import { errorHandler } from './handlers/error';
import { eventsHandler } from './handlers/events';

const port = 8000;

app.use(cors());

app.get('/status', uptimeHandler);
app.get('/api/events', eventsHandler);

app.use(errorHandler);

app.listen(port, () => {
  console.log('App listening on port ' + port);
});
