const fs = require('fs');
const util = require('util');


function events(req, res, next) {
  if (!req.query.type) {
    res.status(400).send('<h1>Status: 400</h1><h2>Event type missing</h2>');
  }

  const typeArray = req.query.type.split(':');
  // Валидация типов событий
  typeArray.forEach(item => {
    if (item !== 'critical' && item !== 'info') {
      res.status(400).send('<h1>Status: 400</h1><h2>Incorrect type</h2>');
    }
  });

  // Прочитать файл с событиями
  let fileObj = null;
  const events = util.promisify(fs.readFile)('./src/static/events.json', {encoding: 'utf8'});
  events.then(data => {
    fileObj = JSON.parse(data);

    // Отфильтровать события по типу
    fileObj.events = fileObj.events.filter(event => {
      let matchType = false;
      typeArray.forEach(type => {
        if (event.type === type) matchType = true;
      });
      return matchType;
    });

    res.send(fileObj);
  });
}

module.exports = events;
