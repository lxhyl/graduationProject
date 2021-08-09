<template>
  <el-card class="log">
    <div slot="header" class="clearfix" style="padding: 0">
      <span class="title">动态</span>
      <div class="add-log">
        <el-input
          v-model="logtext"
          class="add-log-input"
          size="small"
          placeholder="给此条任务添加备注，进度记录，信息变更等"
        ></el-input>
        <el-button
          class="add-log-button"
          type="primary"
          size="small"
          @click="addChangeLog"
          >新增</el-button
        >
      </div>
    </div>
    <div>
      <el-timeline  v-loading="loading" :reverse="true">
        <el-timeline-item
          v-for="(log,index) in logList"
          :key="log.logId"
          class="log-item"
          :type="logType(index)"
          placement="top"
          :timestamp="formatDate(log.logDate)"
        > 
       
          <p class="log-item-text"><span class="log-item-text-person">{{log.logPerson}}:</span>{{ log.logtext }}</p>
        </el-timeline-item>
      </el-timeline>
      <p v-if="!loading && logList.length === 0">没有备注或任务跟踪记录,去添加吧!</p>
    </div>
  </el-card>
</template>
<script>
import { formatDate } from "../../../utils/formatDate";
import { addChangeLog, getChangeLogs } from "../../../api/tasks";
export default {
  computed: {
    taskId() {
      return this.$route.query.taskId;
    },
  },
  data() {
    return {
      logtext: "",
      logList: [],
      loading:false,
    };
  },
  watch:{
    '$route.query':{
      handler(){
        this.getChangeLogs()
      }
    }
  },
  methods: {
    formatDate,
    async addChangeLog() {
      const data = {
        taskId: this.taskId,
        logtext: this.logtext,
      };
      const res = await addChangeLog(data);
      if(res.code !== 200){
        this.$message.error("添加失败");
        return;
      }
      this.logtext = ''
      this.getChangeLogs()
    },
    async getChangeLogs() {
      this.loading = true
      const params = {
        taskId: this.taskId,
      };
      const res = await getChangeLogs(params);
      this.loading = false
      if (res.code !== 200) {
        this.$message.error("获取动态失败");
        return;
      }
      this.logList = res.data;
    },
    logType(index){
       const types = ['primary','success','warning','danger','info']
       const typeIndex = index % 5
       return types[typeIndex]
    }
  },
  created() {
    this.getChangeLogs();
  },
};
</script>
<style lang="less" scoped>
.log {
  margin: 20px 0;
}
/deep/.el-card__header {
  padding: 0 10px;
  height: 50px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.title {
  display: inline-block;
  line-height: 50px;
}
.add-log {
  float: right;
  display: flex;
  align-items: center;
  height: 50px;
  &-input {
    width: 400px;
  }
}
.log-item {
  margin: 10px 0;
  p{
      padding: 10px;
  }
  .log-item-text{
      &-person{
          display: inline-block;
          margin: 0 5px;
          font-weight: bolder;
      }
  }
}
</style>