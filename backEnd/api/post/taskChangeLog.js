const sql = require('../../mysql/src/index')

const taskChangeLog =  async (req,res,data,user) => {
    if(!data.logtext){
      res.end(JSON.stringify({code:400,msg:'内容不能为空'}))
      return
    }
    const task = await sql(`select logIds from task where taskId='${data.taskId}'`)
    if(task && task.length > 0){
        let logIds = (task[0].logIds && (task.logIds != 0)) ? task[0].logIds.split(',') : []
      
        const date = Date.now()
        const addLogRes = await sql (`insert into changelog
        (logtext,logDate,logPerson)
        values
        ('${data.logtext}','${date}','${user.name}')
        `)
        const insertId = addLogRes.insertId
        logIds.push(insertId)
        await sql(`update task set logIds='${logIds.join(',')}' where taskId='${data.taskId}'`)
    }
    res.end(JSON.stringify({code:200,msg:'成功'}))
}

module.exports = taskChangeLog