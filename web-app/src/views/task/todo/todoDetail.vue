<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>任务详情</span>
        <div  style="float: right">
        <el-button
          @click="changeStatus(999)"
          type="danger"
          size="small"
          >否决</el-button
        >
        <el-button
          @click="changeStatus(2)"
          type="primary"
          size="small"
          >通过</el-button
        >
        </div>
      </div>
      <TaskDetail ref="taskDetail" />
    </el-card>
     <Log />
  </div>
</template>
<script>
import TaskDetail from "../detail/index";
import Log from "../log/index"
import { changTaskStatus } from "../../../api/tasks";
export default {
  components: {
    TaskDetail,
    Log
  },
  methods: {
    async changeStatus(status) {
      const taskDetail = this.$refs.taskDetail
      const data = { status,taskId:taskDetail.taskDetail.taskId};
      const res = await changTaskStatus(data);
      if(res.code != 200){
          this.$message.error('失败')
          return
      }
      this.$message.success('成功')
      this.$router.push({
          path:'/ing'
      })
    },
  },
};
</script>
<style lang="less" scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>