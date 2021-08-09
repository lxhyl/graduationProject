const sql = require('../../mysql/src/index')


const getAllTask = async (req,res,params,user) => {
  const tasks = await sql(`select * from task`)
     // 将数组变为对象
     const tasksObj = {}
     for(let i=0;i<tasks.length;i++){
         tasks[i].children = []
         tasksObj[tasks[i].taskId] = tasks[i]
     }
     const tranTree = (task) => {
         if(!task) return
         // 标记是否遍历过了
         if(task.IS_MAP) return
         task.IS_MAP = true
         if(!task.childTasks || task.childTasks === 'undefined') return
         const childTasksIds = task.childTasks.split(',')
         childTasksIds.forEach(childId => {
             // 避免子任务指派给了其他人的情况 会出现空引用
             if(tasksObj[childId]){
                 // 复制数据 避免污染原数据
                 task.children.push(tasksObj[childId])
                 // 标记是否为子节点，如果为子节点，需要删除原数据
                 tasksObj[childId].IS_CHILD = true
                 // 递归
                 tranTree(tasksObj[childId])
             }
         });
     }
     for(let key in tasksObj){
         // 深度优先遍历
         tranTree(tasksObj[key])
     }
     for(let key in tasksObj){
         tasksObj[key].IS_MAP && delete tasksObj[key].IS_MAP
         if(tasksObj[key].IS_CHILD){
             delete tasksObj[key]
         }
     }
     const result = Object.values(tasksObj)
  res.end(JSON.stringify({code:200,msg:'成功',data:result}))
}

module.exports = getAllTask