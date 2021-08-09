<template>
  <div style="white-space: pre-wrap;">
    {{ logs }}
  </div>
</template>
<script>
import { query_getLogs } from "../../api/app";
export default {
  data() {
    return {
      logs: ""
    };
  },
  methods: {
    async getLogs() {
      const date = new Date();
      // lxhyllog 的sha1加密
      const params = {
        psd: "9cba38553598029d6ce73126a0682ec98e5a0496",
        logName: `${date.getFullYear()}-${date.getMonth() + 1}`
      };
      const res = await query_getLogs(params);
      if (res.code !== 200) {
        this.$message.error("请求日志失败");
        return;
      }
      this.logs = res.data;
      console.log("log res", res);
    }
  },
  created() {
    this.getLogs();
  }
};
</script>
