const mysql = require('mysql')
const config = require('../config')
const log = require('../../log/log')



let CONNECTION = null


const connectMysql = () => {
 if(CONNECTION){
  // CONNECTION.end()
 }

  CONNECTION = mysql.createConnection(config)
  CONNECTION.on('error', hanlderError)
  return new Promise((reslove, reject) => {
    CONNECTION.connect((err) => {
      if (err) {
        log(`连接数据库失败ERR:${err}`)
        reject(err)
        return
      }
      log(`连接数据库成功`)
      reslove(CONNECTION)
    })
  })
}

async function hanlderError(err) {
  log('sql错误,正在重新连接...')
  if(CONNECTION){
    CONNECTION.end()
  }
  await connectMysql()
  // if (err.code === 'PROTOCOL_CONNECTION_LOST') {
  //  await connectMysql()
  // }
}

connectMysql();


const queryMysql = async (querySql) => {
  return new Promise(async (reslove, reject) => {
    try {
      CONNECTION.query(querySql, function (err, result, fields) {
        if (err) {
          log(`执行sql失败${err}`)
          hanlderError(err)
          reject(err)
        }
        reslove(result)
      })
    } catch (err) {
      log(`捕获到sql错误${err}`)
      reject(err)
    }
  })
}


module.exports = queryMysql;