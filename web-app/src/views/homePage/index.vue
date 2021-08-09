<template>
  <el-container class="layout-page">
    <el-aside
      v-if="reRenderAside"
      :width="`${asideWidth}px`"
      class="layout-aside animate__animated animate__rollIn"
    >
      <ZAside />
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <ZHeader />
      </el-header>
      <el-main class="layout-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import ZHeader from "../header/index";
import ZAside from "../aside/index";
export default {
  components: {
    ZHeader,
    ZAside
  },
  data: function() {
    return {
      reRenderAside: true
    };
  },
  computed: {
    asideWidth() {
      return this.$store.state.app.asideWidth;
    }
  },
  watch: {
    asideWidth() {
      this.reRenderAside = false;
      this.$nextTick(() => {
        this.reRenderAside = true;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.layout-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
