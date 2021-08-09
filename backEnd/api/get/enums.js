
const level = [
    {
        code: 1,
        label: '职员',
    },
    {
        code: 2,
        label: '组长'
    },
    {
        code: 3,
        label: '项目经理'
    },
    {
        code: 10,
        label: '主管'
    },
    {
        code: 100,
        label: '系统管理员'
    }
]


const status = [
    {
        code: 1,
        label: '待办'
    },
    {
        code: 2,
        label: '进行中'
    },
    {
        code:3,
        label:'已完成'
    },
    {
        code:999,
        label:'否决'
    }
]

const enums = {
    level,
    status
}

const hanlder = async (req, res, params) => {
    if (params && params.enmusKey && enums[params.enmusKey]) {
        res.end(JSON.stringify({ code: 200, msg: '成功', data: enums[params.enmusKey] }))
    } else {
        res.end(JSON.stringify({ code: 401, msg: '请求的枚举值不存在' }))
    }
}

module.exports = hanlder