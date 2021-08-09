
const sql = require('../../mysql/src/index')
const taskChangeLog = require('./taskChangeLog')

const changTaskStatus =async (req,res,data,user) => {
    console.log('data',data)
    const sourceTask = await sql(`select status from task where taskId='${data.taskId}'`)
    if(data.status){
      await sql(`
        update task set status=${data.status} where taskId='${data.taskId}'
      `)
    }
    res.end(JSON.stringify({code:200,msg:'成功'}))
    const statusMap = {
        1:'待办',
        2:'进行中',
        3:'完成',
        999:'否决'
    }
    const params = {
        taskId:data.taskId,
        logtext:`更改了任务状态(${statusMap[sourceTask[0].status]} => ${statusMap[data.status]})`
    }
    await  taskChangeLog(req,res,params,user)
}
module.exports = changTaskStatus