const log = require('../../log/log')

const logout =async (req,res,params,user) => {
    log(`${user.name}退出登录`)
    res.setHeader('Set-Cookie', `sessionid=logout`);
    res.end()
}

module.exports= logout