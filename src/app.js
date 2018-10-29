"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uptime_1 = require("./handlers/uptime");
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const cors = require('cors');
// const errorHandler = require('./handlers/error');
const error_1 = require("./handlers/error");
const events_1 = require("./handlers/events");
const port = 8000;
app.use(cors());
app.get('/status', uptime_1.uptimeHandler);
app.get('/api/events', events_1.eventsHandler);
app.use(error_1.errorHandler);
app.listen(port, () => {
    console.log('App listening on port ' + port);
});
//# sourceMappingURL=app.js.map