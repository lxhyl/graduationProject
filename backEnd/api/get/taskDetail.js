const sql = require('../../mysql/src/index')

const taskDetail = async (req,res,params,user) => {
    const task = await sql(`select * from task where taskId='${params.taskId}'`)
    if((user.id !== task[0].responsePerson) && user.level != 10){
        res.end(JSON.stringify({code:403,msg:'你没有此任务的权限'}))
        return
    }
    const data = {}
    for(let key in task[0]){
        if(task[0][key] && task[0][key] !== 'undefined'){
            data[key] = task[0][key]
        }
    }
    // 获取文件信息
    async function getFiles(){
       return new Promise(async (resolve,reject) => {
        if(!data.fileIds) {
            reject(data.fileIds)
            return
        } 
        const fileIds = data.fileIds.split(',')
        const fileInfo = []
        for(let i =0;i<fileIds.length;i++){
          const fileSqlRes = await sql(`select * from files where fileId=${parseInt(fileIds[i])}  limit 1`)
           fileInfo.push(fileSqlRes[0])
        }
        resolve(fileInfo)
       })
    }
    if(data.fileIds){
        data.files = await getFiles()
    }
    res.end(JSON.stringify({code:200,msg:'成功',data:data}))
}

module.exports = taskDetail