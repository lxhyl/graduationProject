const sql = require('../../mysql/src/index')

const resList = async (req, res, params, user) => {
    const sourceList = await sql('select * from account')
    const list = sourceList.filter(item => item.level < 100).map(item => ({
        name: item.name,
        id: item.id,
        account:item.account
    }))
    
    res.end(JSON.stringify({ code: 200, data: list, msg: '成功' }))
}

module.exports = resList