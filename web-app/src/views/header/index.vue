<template>
  <div class="header-page" @mouseleave="showList = false">
    <i
      :class="[
        asideWidth === 200 ? 'el-icon-s-fold' : 'el-icon-s-unfold',
        'header-page-aside-handler'
      ]"
      @click="onAsideWidthChange"
    ></i>
    <el-avatar
      class="header-page-avatar"
      size="medium"
      icon="el-icon-user-solid"
      @mouseover.native="showList = true"
    >
    </el-avatar>
    <div
      class="header-page-handlelist animate__animated animate__bounceInDown animate__faster"
      @mouseleave="showList = false"
      v-show="showList"
    >
      <div class="logout" @click="handleLogout">退出登录</div>
    </div>
  </div>
</template>
<script>
const asideWidthMap = {
  60: 200,
  200: 60
};
import { logout } from "../../api/account";
export default {
  data() {
    return {
      showList: false
    };
  },
  computed: {
    asideWidth() {
      return this.$store.state.app.asideWidth;
    }
  },
  methods: {
    onAsideWidthChange() {
      const width = asideWidthMap[this.asideWidth];
      this.$store.commit("app/SET_ASIDE_WIDTH", width);
    },
    async handleLogout() {
      await logout();
      location.reload();
    }
  }
};
</script>
<style lang="less" scoped>
.header-page {
  width: 100%;
  height: 60px;
  padding: 0;
  margin: 0;
  background-color: white;
  .header-page-aside-handler {
    font-size: 30px;
    line-height: 60px;
    padding: 0 10px;
  }
  .header-page-avatar {
    float: right;
    margin: 12px;
  }
  .header-page-handlelist {
    position: absolute;
    right: 10px;
    top: 50px;
    padding: 10px 0;
    font-size: 14px;
    z-index: 999;
    width: 80px;
    text-align: center;
    .logout:hover {
      color: #409eff;
    }
  }
}
</style>
