<template>
  <div>
    <el-steps
      :active="isFinished ? '' : active"
      direction="vertical"
      space="50px"
      process-status="process"
      finish-status="success"
    >
      <el-step
        v-for="(item, index) in flowList"
        :title="item"
        :key="index"
        :statue="isFinished ? 'success' : ''"
      >
      </el-step>
    </el-steps>
    <div v-if="flowList.length > 0 && isIng">
      <el-button @click="nextFlow" type="primary">下一步</el-button>
      <el-select placeholder="异常跳转" v-model="activeFlow">
        <el-option
          v-for="(item, index) in flowList"
          :key="index"
          :value="item"
          :label="item"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
import { changeFlow, changTaskStatus } from "../../../api/tasks";
export default {
  props: ["flow", "nowFlow", "taskId"],
  computed: {
    flowList() {
      if (!this.flow) return [];
      return this.flow.split(";");
    },
    isIng() {
      console.log(this.$route);
      return this.$route.name == "IngTaskDetail";
    },
    active() {
      return this.flowList.findIndex((item) => item === this.activeFlow);
    },
    isFinished() {
      return (
        this.$route.name == "FinishedTaskDetail" ||
        this.$route.name == "AllTaskDetail"
      );
    },
  },
  watch: {
    async activeFlow() {
      if (!this.activeFlow) return;
      const data = {
        taskId: this.taskId,
        flow: this.activeFlow,
      };
      const res = await changeFlow(data);
      this.$message.success('成功')
      console.log("res", res);
    },
  },
  data() {
    return {
      activeFlow: "",
    };
  },
  created() {
    console.log("this.nowFlow", this.nowFlow);
    this.activeFlow = this.nowFlow;
  },
  methods: {
    async nextFlow() {
      const newIndex = this.active + 1;
      if (newIndex < this.flowList.length) {
        this.activeFlow = this.flowList[newIndex];
        return;
      }

      const data = {
        status: 3,
        taskId: this.taskId,
      };
      const res = await changTaskStatus(data);
      if (res.code !== 200) {
        this.$message.error("失败");
        return;
      }
      this.$router.push({
        name: "FinishedTask",
      });
      console.log("res", res);
    },
  },
};
</script>