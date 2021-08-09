
const userinfo = (req,res,params,user) => {
    res.end(JSON.stringify({code:200,msg:'获取成功',data:user}))
}

module.exports = userinfo