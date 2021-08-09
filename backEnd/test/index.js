const http = require('http');
const url = require('url');

const mysql = require('../mysql/src/index');

const sql_select = 'select * from account'
const sql_insert = "insert into account(id, name, level,password,account) values('admin_lxhyl','lxhyl',0,'lxhyl','lxhyl')"
const App = http.createServer();
App.on('request', function (request, response) {
  const URL = url.parse(request.url, true)
  if (URL.pathname === '/mysql') {
    mysql(sql_select)
      .then(res => console.log('mysql res', res))
      .catch(err => console.log('mysql err', err))
  }
  response.end('200')
})
App.listen(6101)