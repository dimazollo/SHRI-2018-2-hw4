const express = require('express');
const app = express();
const cors = require('cors');

const errorHandler = require('./handlers/error');
const uptimeHandler = require('./handlers/uptime');
const eventsHandler = require('./handlers/events');

const port = 8000;


app.use(cors());

app.get('/status', uptimeHandler);
app.get('/api/events', eventsHandler);

app.use(errorHandler);

app.listen(port, function () {
  console.log('App listening on port ' + port);
});
