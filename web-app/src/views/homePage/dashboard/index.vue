<template>
  <div>
    <p class="title">
      <span class="name">{{ userInfo.name }}</span
      >你好！欢迎使用生产信息管理系统
    </p>

    <el-card class="limit">
      <p slot="header">
        你拥有的权限如下:
      </p>
      <el-tag class="limit-item" v-for="(item, index) in menus" :key="index">
        {{ item.name
        }}<span v-if="item.children"
          >:{{ item.children.map(item => item.name).join("/") }}</span
        >
      </el-tag>
    </el-card>
    <el-card class="limit">
      <p slot="header">
        简单介绍:
      </p>
      <ul>
        <li>你只能看到你的待办、进行中、已完成的项目</li>
        <li>支持自定义工作流</li>
        <li>任务相关操作写入动态，任何变动皆可记录</li>
        <li>如需提权请通知账号系统管理员配置你的权限</li>
      </ul>
    </el-card>
  </div>
</template>
<script>
import { getuserInfo } from "../../../api/account";
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  computed: {
    menus() {
      return this.$store.state.app.menu;
    }
  },
  methods: {
    async queryUserInfo() {
      const res = await getuserInfo();
      if (res.code !== 200) {
        this.$message.error("获取用户信息失败");
        return;
      }
      this.userInfo = res.data;
    }
  },
  created() {
    this.queryUserInfo();
  }
};
</script>
<style lang="less" scoped>
.title {
  font-weight: 700;
  font-size: 16px;
  .name {
    color: #409eff;
  }
}
.limit {
  margin: 20px;
  .limit-item {
    margin: 0 10px;
  }
}
ul {
  font-size: 14px;
  li {
    line-height: 30px;
  }
}
</style>
