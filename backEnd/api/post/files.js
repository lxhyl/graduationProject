const path = require('path')
const multiparty = require('multiparty')
const os = require('os')
const log = require('../../log/log')
const sql = require('../../mysql/src/index')

const files = async (req,res,data,user) => {
   const sys = os.platform()
   const uploadDir = (sys === 'win32' ? './files' : '/usr/local/nginx/html/FILES')
   const form = new multiparty.Form({
       uploadDir
   })
   form.parse(req)
   let fileName
   let sourceName
   return new Promise((resolve,reject) => {
    form.on('file',(name,file) => {
       log('文件上传：接收文件上传')
       sourceName = file.originalFilename
        log(`上传文件路径${file.path}`)
        fileName = file.path.split('/')
        // 线上
        if(fileName.length > 1){
            fileName = fileName[6]
        }
        fileName = `http://zhangpengfan.xyz/FILES/${fileName}`
       })
       form.on('close',async () => {
           log('文件上传：文件上传完毕')
           const data = {
               sourceName,
               fileName
           }
           const fileSqlRes = await sql(`insert into files 
           (sourceName,path)
           values
           ('${data.sourceName}','${data.fileName}')
           `)
           log(`文件上传:写入数据库成功`)
           res.end(JSON.stringify({code:200,msg:'成功',data:{fileId:fileSqlRes.insertId}}))
           resolve()
       })
   })
   
}

module.exports = files