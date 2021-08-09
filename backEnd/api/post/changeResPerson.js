const sql = require('../../mysql/src/index')
const taskChangeLog = require('./taskChangeLog')
const changeResPerson = async (req, res, data, user) => {

    await sql(`update task set responsePerson='${data.newPerson}' where taskId='${data.taskId}'`)
    const newPerson = await sql(`select name from account where id='${data.newPerson}'`)
    
    if(newPerson.length > 0){
      const params = {
            taskId:data.taskId,
            logtext:`将负责人更改为${newPerson[0].name}`
      }
      await  taskChangeLog(req,res,params,user)
    }
    res.end(JSON.stringify({ code: 200, msg: '成功' }))
}

module.exports = changeResPerson