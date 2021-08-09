const sql = require('../../mysql/src/index')

const tasksJson = {
    name: '任务管理',
    route: '/task',
    icon: 'el-icon-tickets',
    children: [
        {
            level: '1',
            name: '待办',
            route: 'TodoTask'
        },
        {
            level: '2',
            name: '进行中',
            route: 'IngTask'
        },
        {
            level: '3',
            name: '已完成',
            route: 'FinishedTask'
        },
        {
            level: '10',
            name: '全部任务',
            route: 'AllTask',
        },
    ]
}

const createTaskMenu = [{
    level: '10',
    name: '创建项目',
    route: 'CreateTask',
    icon: 'el-icon-document-add',
}]

const menuJson = [
    {
        level: '100',
        name: '用户管理',
        route: 'AccountSystem',
        icon: 'el-icon-user'
    },
    {
        level: '100',
        name: '日志',
        route: 'Log',
        icon: 'el-icon-s-tools'
    }
]




const hanldeMenu = async (req, res, params, USER) => {
    const userInfo = USER
    const userLevel = userInfo.level
    const userTasks = { ...tasksJson, children: tasksJson.children.filter(item => userLevel >= item.level) }
    let resMenu = null
    if (userInfo.level === 100) {
        resMenu = menuJson
    } else if (userInfo.level === 10) {
        resMenu = [userTasks, ...createTaskMenu]
    } else {
        resMenu = [userTasks]
    }
    await new Promise((resolve) => {
        res.end(JSON.stringify({ code: 200, msg: '获取菜单成功', data: resMenu }))
        resolve()
    })
    return
}
module.exports = hanldeMenu