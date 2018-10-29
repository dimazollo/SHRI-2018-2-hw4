import fs from 'fs';
import util from 'util';
import { Request, Response } from 'express';
import { IEventsData } from '../models/event';

export function eventsHandler(req: Request, res: Response, next: Function) {
  const badRequestStatusCode: number = 400;

  if (!req.query.type) {
    res.status(badRequestStatusCode).json('Event type missing');
    return;
  }

  const typeArray:Array<string> = req.query.type.split(':');
  // Валидация типов событий
  typeArray.forEach((item) => {
    if (item !== 'critical' && item !== 'info') {
      res.status(badRequestStatusCode).json('Incorrect type');
      return;
    }
  });

  // Прочитать файл с событиями
  let fileObj: IEventsData | null = null;
  const promiseToReadEvents: Promise<string> =
    util.promisify(fs.readFile)('./src/static/events.json', { encoding: 'utf8' });

  promiseToReadEvents.then((data) => {
    fileObj = JSON.parse(data);
    if (fileObj) {
      // Отфильтровать события по типу
      fileObj.events = fileObj.events.filter((event) => {
        let matchType: boolean = false;
        typeArray.forEach((type) => {
          if (event.type === type) matchType = true;
        });
        return matchType;
      });

      res.send(fileObj);
      return;
    }
  });
}
