const url = require('url')
const log = require('../../log/log')

const getBodyData = require('../../utils/getBodyData')
const accountApi = require('./account')
const handleFiles = require('./files')
const createTask = require('./createTask')
const changTaskStatus = require('./changeTaskStatus')
const taskChangeLog = require('./taskChangeLog')
const changeResPerson = require('./changeResPerson')
const changeFlow = require('./changeFlow')

const needLevelMap = {
    '0': {
        '/login': accountApi.signin,
    },
    '1':{
        '/task/changTaskStatus':changTaskStatus,
        '/task/changeLog':taskChangeLog,
        '/task/changeResPerson':changeResPerson,
        '/task/ing/changeFlow':changeFlow
    },
    '10':{
        '/files':handleFiles,
        '/createTask':createTask,
    },
    '100': {
        '/signup': accountApi.signup,
        '/editAccount': accountApi.editAccount,
        '/deleteAccount': accountApi.deleteAccount
    }
}

const handlePost = async (req, res,USER) => {
    let pathHandleMap = {}
    for (let key in needLevelMap) {
        if (USER && (USER.level >= key)) {
            pathHandleMap = { ...needLevelMap[key],...pathHandleMap }
        } else {
            pathHandleMap = {
                '/login': accountApi.signin,
                ...pathHandleMap
            }
        }
    }

    const URL = url.parse(req.url, true)
    let data
    if(URL.pathname !== '/files'){
        data = await getBodyData(req)
    }
   
    try {
        if (pathHandleMap[URL.pathname]) {
            log(`${(USER && USER.name) ? USER.name : '未知用户'}调用${URL.pathname}接口`)
            log(`post请求数据${JSON.stringify(data)}`)
            await pathHandleMap[URL.pathname](req, res, data,USER)
        } else {
            res.end(JSON.stringify({ code: 404, msg: '请求地址不存在或接口无权限' }))
        }
    } catch (err) {
        log(err)
        log(`POST HANDLER ERROR,请求用户${USER && USER.name};请求接口:${URL.pathname}`)
        res.end(JSON.stringify({ code: 501, msg: 'post api handler error' }))
        return
    }
  
}

module.exports = handlePost