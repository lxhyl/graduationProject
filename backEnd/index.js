const http = require('http');
const url = require('url')
const log = require('./log/log')
const verifyCookie = require('./utils/verifyCookie')
const handleGet = require('./api/get/index')
const handlePost = require('./api/post/index');


const App = http.createServer();
App.on('request', async function (request, response) {
  try {
    response.setHeader('Content-Type', 'text/plain;charset=utf-8');
    const URL = url.parse(request.url, true)
    let USER = null
    if (URL.path !== '/login') {
        USER = await verifyCookie(request, response)
        if(!USER){
          response.end(JSON.stringify({code:403,msg:'verify cookie error'}))
        }
    }
    const METHOD = request.method
    METHOD === 'GET' ? await handleGet(request, response,USER) : await handlePost(request,response,USER)
    response.end(JSON.stringify({ code: 200, msg: 'success' }))
  } catch (err) {
    response.end(JSON.stringify({code:500,msg:'服务器未知错误'}))
    log(err)
  }
})
App.listen(6100)