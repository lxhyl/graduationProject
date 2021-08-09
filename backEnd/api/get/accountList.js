const sql = require('../../mysql/src/index')

const accountList = async (req,res,params,user) => {
  if(user.level < 100){
      res.end(JSON.stringify({code:403,msg:'无权限'}))
  }
  const sourceList =await sql('select * from account')
  const list = sourceList.map(item => ({
      name:item.name,
      level:item.level,
      account:item.account,
      id:item.id,
      password:item.password
  }))
 
  res.end(JSON.stringify({code:200,data:list,msg:'成功'}))
}

module.exports = accountList