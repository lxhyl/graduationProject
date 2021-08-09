const fs = require('fs');
const path = require('path');
function log(msg) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: 'numeric',
  }
  const date = new Date();
  const fileName = `${date.getFullYear()}-${date.getMonth() + 1}`
  const formatDate = date.toLocaleString(options);
  const appendData = `${formatDate}---${msg}\n`;
  fs.appendFile(path.join(__dirname,`/${fileName}`) , appendData, function (err) {
    if (err) {
      console.log('写入log失败', err);
    }
  });
}

module.exports = log;