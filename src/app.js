// ДЗ
// Написать сервер на express который будет подниматься на 8000 порту и обрабатывать два роута:
// 1. /status — должен выдавать время, прошедшее с запуска сервера в формате hh:mm:ss
// 2. /api/events — должен отдавать содержимое файла events.json.
//
// При передаче get-параметра type включается фильтрация по типам событий. При передаче некорректного type — отдавать статус 400 "incorrect type". (/api/events?type=info:critical) Все остальные роуты должны отдавать <h1>Page not found</h1>, с корректным статусом 404.
// *Звёздочка
// Перейти на POST-параметры.
//   Сделать пагинацию событий — придумать и реализовать API, позволяющее выводить события постранично.
//   Подключить данные к вёрстке из первого задания.

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const formatUptime = require('./handlers/time');
const errorHandler = require('./handlers/error');
const fs = require('fs');
const util = require('util');

const port = 8000;
const startServerDate = Date.now();

console.log(process.cwd());

app.use(cors());
app.use(bodyParser.json());

// app.use(errorHandler())

app.get('/status', function (req, res) {
  const uptimeInMs = Date.now() - startServerDate;
  res.send(formatUptime(uptimeInMs));
});

const { Transform } = require('stream');


const eventFilter = 0;

app.get('/api/events', function (req, res, next) {
  // console.log(req);

  const typeArray = req.query.type.split(':');
  typeArray.forEach(item => {
    if (item !== 'critical' && item !== 'info') {
      res.status(400).send('<h1>Status: 400</h1><h2>Incorrect type</h2>');
    }
  });
  console.log(typeArray);
  // fs.readFile('./src/static/event.json', { encoding: 'utf8' }, callback);

  // Прочитать файл с событиями
  let fileObj = null;
  const events = util.promisify(fs.readFile)('./src/static/events.json', { encoding: 'utf8' });
  events.then(data => {
    fileObj = JSON.parse(data);

    fileObj.events = fileObj.events.filter(event =>  {
      let matchType = false;
      typeArray.forEach(type => {
        if (event.type === type) matchType = true;
      });
      return matchType;
    });

    res.send(fileObj);
  }).catch(() => {

  });

  // const stream = fs.createReadStream('./src/static/events.json');
  // const output = fs.createWriteStream('./src/static/events2.json');
  // stream
  //   .pipe()
  //   .pipe(Transform);
  // getEvents(res);

});

app.use(function (req, res, next) {
  // let err = new Error("Not Found");
  // err.status = 404;
  res.status(404).send('<h1>Status: 404</h1><h2>Page not found</h2>');
});

app.listen(port, function () {
  console.log('example app listening on port ' + port)
});

class MyTransform extends Transform {
  constructor (options = {}) {
    options = Object.assign({}, options, {
      decodeStrings: false
    });
    super(options);
    this.nesting = 0;
    this.atEventsArray = false;
    this.currentEvent = '';
    this.path = new Path();
  }

  _transform(chunk, encoding, callback) {
    if (encoding !== 'utf8') {
      this.emit('error', new Error('Only UTF-8 sources are supported'));
      return callback();
    }
    chunk.forEach(char => {
      if (char === '{') this.nesting++;
      if (char === '}') this.nesting--;

      if (!this.atEventsArray && this.nesting === 1 && char === '[') {
        this.atEventsArray = true;
      } else if (this.atEventsArray && this.nesting === 1 && char === ']') {
        this.atEventsArray = false;
      }

      if (this.atEventsArray && this.nesting === 1 && char === ',') {

      } else if (null) { // TODO

      }
    });

    this.push(chunk)
  }
}
