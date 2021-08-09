const log = require('../log/log')

const getBodyData = (req) => {
    return new Promise((resolve,reject) => {
        try{
        let data = ''
        req.on('data',function(chunk){
            data += chunk
        })
        req.on('end',function(){
           resolve(JSON.parse(data.toString()))
        })
       }catch(err){
           log('获取body数据出错',err)
           reject(err)
       }
    })
}

module.exports = getBodyData