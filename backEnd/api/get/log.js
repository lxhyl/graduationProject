const fs = require('fs')
const path = require('path')

const handleLog =async (req,res,params) => {
   const lxhyllog = '9cba38553598029d6ce73126a0682ec98e5a0496'
   if(lxhyllog !== params.psd){
      res.end(JSON.stringify({code:403,msg:'请求参数错误'}))
   }
   const fileName = params.logName
   const fileUrl = path.resolve(`./log/${fileName}`)
   const logText = fs.readFileSync(fileUrl).toString()
   res.end(JSON.stringify({code:200,msg:'获取日志成功',data:logText}))
   return
}

module.exports = handleLog