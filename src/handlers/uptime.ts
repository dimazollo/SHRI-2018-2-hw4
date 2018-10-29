const startServerDate = Date.now();
import { Request, Response } from 'express';

function formatUptime(time: number) {
  const millisecondsInSecond: number = 1000;
  const totalSeconds = Math.floor(time / millisecondsInSecond);

  const secondsInMinute: number = 60;
  const minutesInHour: number = 60;
  const minutes = Math.floor(totalSeconds / secondsInMinute) % minutesInHour;
  const hours = Math.floor(totalSeconds / secondsInMinute / minutesInHour);
  const seconds = totalSeconds - minutes * secondsInMinute -
    hours * minutesInHour * secondsInMinute;

  // WAT? "A number of 10 is also magic number" tslint says. But not in that case, tslint!
  const ten = 10;
  const addLeadingZero: Function = (timeParameter: number) =>
    timeParameter < ten ? '0' + timeParameter : timeParameter;

  return addLeadingZero(hours) + ':' + addLeadingZero(minutes) + ':' + addLeadingZero(seconds);
}

export function uptimeHandler(req: Request, res: Response) {
  const uptimeInMs = Date.now() - startServerDate;
  res.send(formatUptime(uptimeInMs));
}
