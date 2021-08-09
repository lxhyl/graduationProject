const sql = require('../../mysql/src/index')
const taskChangeLog = require('./taskChangeLog')

const changeFlow = async (req,res,data,user) => {
    await sql(`
    update task set nowFlow='${data.flow}' where taskId='${data.taskId}'
    `)
    const params = {
        taskId:data.taskId,
        logtext:`将当前工作流更改为${data.flow}`
    }
    await taskChangeLog(req,res,params,user)
    res.end(JSON.stringify({code:200,msg:'更改成功'}))
}

module.exports = changeFlow