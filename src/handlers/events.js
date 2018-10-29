"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
function eventsHandler(req, res, next) {
    const badRequestStatusCode = 400;
    if (!req.query.type) {
        res.status(badRequestStatusCode).json('Event type missing');
        return;
    }
    const typeArray = req.query.type.split(':');
    // Валидация типов событий
    typeArray.forEach((item) => {
        if (item !== 'critical' && item !== 'info') {
            res.status(badRequestStatusCode).json('Incorrect type');
            return;
        }
    });
    // Прочитать файл с событиями
    let fileObj = null;
    const promiseToReadEvents = util_1.default.promisify(fs_1.default.readFile)('./src/static/events.json', { encoding: 'utf8' });
    promiseToReadEvents.then((data) => {
        fileObj = JSON.parse(data);
        if (fileObj) {
            // Отфильтровать события по типу
            fileObj.events = fileObj.events.filter((event) => {
                let matchType = false;
                typeArray.forEach((type) => {
                    if (event.type === type)
                        matchType = true;
                });
                return matchType;
            });
            res.send(fileObj);
            return;
        }
    });
}
exports.eventsHandler = eventsHandler;
//# sourceMappingURL=events.js.map