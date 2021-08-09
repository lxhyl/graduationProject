const url = require('url')
const log = require('../../log/log')
// 菜单
const hanldeMenu = require('./menu')
// 日志
const hanldeLog = require('./log')
// 所有账户
const hanldeAccountList = require('./accountList')
// 枚举值
const enmusHanlder = require('./enums')
// 退出登录
const hanldeLogout = require('./logout')
// 用户信息
const hanldeUserInfo = require('./userinfo')
// 指定负责人列表
const handleGetResList = require('./resList')

// 待办 
const taskList = require('./taskList')

// 任务详情
const taskDetail = require('./taskDetail')

const getChangeLogs = require('./getChangeLogs')

const getAllTask = require('./getAllTask')
const needLevelMap = {
  '0': {
    '/menu': hanldeMenu,
    '/enums': enmusHanlder,
    '/logout': hanldeLogout,
    '/getUserInfo': hanldeUserInfo
  },
  '1':{
    '/taskList':taskList,
    '/task/detail':taskDetail,
    '/task/getChangeLogs':getChangeLogs,
    '/getResList':handleGetResList
  },
  '10':{
    '/task/allList':getAllTask
  },
  '100':{
    '/accountList': hanldeAccountList,
    '/log': hanldeLog,
  }
}

const handleGet = async (req, res, USER) => {
  if(!USER){
    USER.name = '未知用户'
  }
  let pathHandleMap = {}
  for(let key in needLevelMap){
    if(USER.level >= key){
      pathHandleMap = {...needLevelMap[key],...pathHandleMap}
    }
  }
  
  const URL = url.parse(req.url, true)
  const PARAMS = URL.query
  log(`请求地址:${URL.pathname},请求参数:${JSON.stringify(PARAMS)}`)
  try {
    if (pathHandleMap[URL.pathname]) {
      log(`${USER.name}调用了${URL.pathname}接口`)
      await pathHandleMap[URL.pathname](req, res, PARAMS, USER)
    } else {
      log(`拒绝${USER.name}调用${URL.pathname}接口`)
      res.end(JSON.stringify({ code: 404, msg: '请求地址不存在或接口无权限' }))
    }
  } catch {
    res.end(JSON.stringify({ code: 501, msg: 'get api hanlder error' }))
  }
}

module.exports = handleGet