"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const startServerDate = Date.now();
function formatUptime(time) {
    const millisecondsInSecond = 1000;
    const totalSeconds = Math.floor(time / millisecondsInSecond);
    const secondsInMinute = 60;
    const minutesInHour = 60;
    const minutes = Math.floor(totalSeconds / secondsInMinute) % minutesInHour;
    const hours = Math.floor(totalSeconds / secondsInMinute / minutesInHour);
    const seconds = totalSeconds - minutes * secondsInMinute -
        hours * minutesInHour * secondsInMinute;
    // WAT? "A number of 10 is also magic number" tslint says. But not in that case, tslint!
    const ten = 10;
    const addLeadingZero = (timeParameter) => timeParameter < ten ? '0' + timeParameter : timeParameter;
    return addLeadingZero(hours) + ':' + addLeadingZero(minutes) + ':' + addLeadingZero(seconds);
}
function uptimeHandler(req, res) {
    const uptimeInMs = Date.now() - startServerDate;
    res.send(formatUptime(uptimeInMs));
}
exports.uptimeHandler = uptimeHandler;
//# sourceMappingURL=uptime.js.map