const sql =  require('../mysql/src/index')
const log = require('../log/log')

const verifyCookie =async (req,res) => {
    try {
        let cookies = null
        if(req.headers.cookie){
          const splitCookie = req.headers.cookie.split(';')
          const cookieObj = {}
          splitCookie.forEach(item => {
              const splitItem = item.split('=')
              cookieObj[splitItem[0]] = splitItem[1]
          });
          cookies = cookieObj.sessionid
        }
        log(`Cookie:${cookies}`)
        if(!cookies){
            res.end(JSON.stringify({code:403,msg:'未登录'}))
            return null
        }
        const userInfoArr = await sql(`select * from account where session='${cookies}'`)
        if(userInfoArr.length === 0 || !userInfoArr[0].account){
            res.end(JSON.stringify({code:403,msg:'未登录'}))
        }
        return userInfoArr[0]
    } catch {
        res.end(JSON.stringify({code:403,msg:'未登录'}))
        return null
    }
   
}

module.exports = verifyCookie