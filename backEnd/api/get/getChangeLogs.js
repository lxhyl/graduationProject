const sql = require('../../mysql/src/index')

const getChangeLogs = async (req, res, params, user) => {
    const task = await sql(`select logIds from task where taskId='${params.taskId}'`)
    const logIds = task[0].logIds
    let logIdsArr = logIds ? logIds.split(',') : []
    const changeLogsArr = []
    for (let i = 0; i < logIdsArr.length; i++) {
        const changeLogsRes = await sql(`select * from changelog where logId=${parseInt(logIdsArr[i])}`)
        if (changeLogsRes.length > 0) {
            changeLogsArr.push(changeLogsRes[0])
        }
    }
    res.end(JSON.stringify({ code: 200, msg: '成功',data:changeLogsArr}))
}

module.exports = getChangeLogs