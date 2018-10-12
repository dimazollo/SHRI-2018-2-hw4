const fs = require('fs');

function getEvents(res) {
  return readEvents(res);
}

// var staticBasePath = './static';

function readEvents(res) {
  // var fileLoc = path.resolve(staticBasePath);
  // const filename = '../static/events.json'; //path.join(fileLoc, 'event.json');
  //
  // var stream = new fs.ReadStream(filename, {encoding: 'utf-8'});
  //
  // stream.on('error', function(error) {
  //   res.writeHead(404, 'Not Found');
  //   res.end();
  // });
  //
  // stream.pipe(res);
}

module.exports = getEvents();
