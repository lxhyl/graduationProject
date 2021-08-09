const sql = require('../../mysql/src/index')
const makeId = require('../../utils/makeId')
const log = require('../../log/log')
const taskChangeLog = require('./taskChangeLog')

const createTask = async (req, res, data, USER) => {
   const taskId = makeId(30)
   const date = new Date().getTime().toString()
   log(`${USER.name}创建了项目${data.title}`)
   const responsePerson = await sql(`select name from account where id='${data.responsePerson}'`)
   await sql(`
    insert into task
    (
       taskId,title,startDate,endDate,cost,responsePerson,
       phone,address,description,fileIds,tags,comment,status,
       createPerson,createDate,responsePersonName,fatherTask,quantity,flow
   )
    VALUES
    ('${taskId}','${data.title}','${data.startDate}','${data.endDate}','${data.cost}','${data.responsePerson}',
    '${data.phone}','${data.address}','${data.description}',
    '${data.fileIds}','${data.tags}','${data.comment}',
    1,'${USER.name}','${date}','${responsePerson[0].name}','${data.fatherTask}',
    ${data.quantity},'${data.flow}'
    )
   `)
   // 如果是创建子任务 那么要更新父任务的childTasks 的值
   if (data.fatherTask) {
      const fatherTaskChildTasks = await sql(`select * from task where taskId='${data.fatherTask}'`)
      let childTasks = fatherTaskChildTasks[0].childTasks ? fatherTaskChildTasks[0].childTasks.split(',') : []
      childTasks.push(taskId)
      childTasks = childTasks.join(',')
      await sql(`update task set childTasks='${childTasks}' where taskId='${data.fatherTask}'`)
      // 写入动态
      const params = {
         taskId: data.fatherTask,
         logtext: `创建了子任务,子任务ID(${taskId})`
      }
      await taskChangeLog(req, res, params, USER)
   }
   res.end(JSON.stringify({ code: 200, msg: '创建成功' }))
}

module.exports = createTask