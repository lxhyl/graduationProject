const sql = require('../../mysql/src/index')
const makeId = require('../../utils/makeId')
const log = require('../../log/log')
const sha1 = require('sha1')
const errorEnd = JSON.stringify({code:401,msg:'用户名或密码错误'})

const signin = async (req,res,data) => {
  const {account,encryInfo} = data
  const userInfo = await sql(`select encry_info  from account WHERE account='${account}'`)
 
  if(userInfo.length === 0){
     res.end(errorEnd)
     return
  }
  const encry_info = userInfo[0].encry_info
 
  if(encry_info !== encryInfo){
      res.end(errorEnd)
      return
  }
 
  const session = makeId(50)
  await sql(`update account set session='${session}' where account='${account}'`)
  
  res.setHeader('Set-Cookie', `sessionid=${session}`);
  // res.writeHead(200,{
  //   'Set-Cookie':userId,
  // })
  log(`设置请求头:${session}`)
  res.end(JSON.stringify({code:200,msg:'登录成功',data:{sessionId:session}}))
}


const signup = async (req,res,data) => {
  const haveThisAccount = await sql(`select account from account where account='${data.account}'`)
  if(haveThisAccount && haveThisAccount.length > 0){
    res.end(JSON.stringify({code:401,msg:'账号已存在'}))
    return
  }
  const encry_info = sha1(`${data.account}${data.password}`)
  const userId = makeId(20)
  await sql(`insert into account
  (id,name,level,encry_info,account,session,password) 
  VALUES 
  ('${userId}','${data.name}','${data.level}','${encry_info}','${data.account}','','${data.password}')
  `)
  res.end(JSON.stringify({code:200,msg:'创建账号成功'}))
  return
}


const editAccount = async (req,res,data) => {
  console.log('data',data)
  const encry_info = sha1(`${data.account}${data.password}`)
  try {
    await sql(`
    update account
    set
    name='${data.name}',
    level='${data.level}',
    account='${data.account}',
    encry_info='${encry_info}',
    password='${data.password}'
    where
    id='${data.id}'
    `)
    res.end(JSON.stringify({code:200,msg:'编辑账号成功'}))
  }catch{
    res.end(JSON.stringify({code:500,msg:'编辑账号失败'}))
  }
}

const deleteAccount = async (req,res,data) => {
  try {
    await sql(`
    delete from account where id='${data.accountId}'
    `)
    res.end(JSON.stringify({code:200,msg:'删除账号成功'}))
  }catch {
    res.end(JSON.stringify({code:500,msg:'删除账号失败'}))
  }
 
}

exports.signin = signin
exports.signup = signup
exports.editAccount = editAccount
exports.deleteAccount = deleteAccount