<template>
    <el-tag  :type="types[status]" size="small">
        {{texts[status]}}
    </el-tag>
</template>
<script>
const types = {
    1:'info',
    2:'',
    3:'success',
    999:'danger'
}
const texts = {
    1:'待办',
    2:'进行中',
    3:'已完成',
    999:'取消'
}
export default {
    props:{
        status:{
            type:Number,
            default:0
        }
    },
    data(){
        return {
            types,
            texts
        }
    }
}
</script>