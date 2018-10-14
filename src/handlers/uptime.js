const startServerDate = Date.now();

function formatUptime(time) {
  const totalSeconds = Math.floor(time / 1000);

  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 60 / 60);
  const seconds = totalSeconds - minutes * 60 - hours * 60 * 60;

  const addLeadingZero = function(time) {
    return time < 10 ? '0' + time : time;
  };

  return addLeadingZero(hours) + ':' + addLeadingZero(minutes) + ':' + addLeadingZero(seconds);
}

function uptimeHandler(req, res) {
  const uptimeInMs = Date.now() - startServerDate;
  res.send(formatUptime(uptimeInMs));
}

module.exports = uptimeHandler;
