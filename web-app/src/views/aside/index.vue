<template>
  <div class="aside-page">
    <div
      class="aside-page-logo"
      @click="routerToHome"
      :style="{ backgroundColor: !asideCollapse ? '' : 'white' }"
    >
      <span v-if="!asideCollapse">生产信息管理系统</span>
      <img v-else src="../../assets/logo.svg" width="60" height="60" />
    </div>
    <el-menu
      class="aside-page-menu"
      background-color="#001529"
      text-color="#fff"
      :collapse="asideCollapse"
      active-text-color="#409eff"
      :collapse-transition="true"
    >
      <template v-for="menu in menus">
        <template v-if="menu.children">
          <el-submenu :key="menu.route" :index="menu.route">
            <template slot="title">
              <i :class="menu.icon"></i>
              <span> {{ menu.name }}</span>
            </template>
            <el-menu-item
              v-for="childMenu in menu.children"
              :key="childMenu.route"
              :index="childMenu.route"
              @click="routerTo(childMenu.route)"
            >
              <span>{{ childMenu.name }}</span>
            </el-menu-item>
          </el-submenu>
        </template>
        <el-menu-item
          v-else
          :key="menu.route"
          :index="menu.route"
          @click="routerTo(menu.route)"
        >
          <i :class="menu.icon"></i>
          <span slot="title">
            {{ menu.name }}
            </span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  computed: {
    asideCollapse() {
      return this.$store.state.app.asideWidth === 60;
    },
    menus() {
      return this.$store.state.app.menu;
    }
  },
  methods: {
    routerToHome() {
      this.$router.push("/");
    },
    routerTo(name){
      console.log('name',name)
      this.$router.push({
        name:name
      })
    }
  }
};
</script>
<style lang="less" scoped>
.aside-page {
  height: 100%;
  width: 100%;
  overflow: hidden;
  .aside-page-logo {
    color: white;
    font-weight: 700;
    font-size: 20px;
    width: 100%;
    height: 60px;
    text-align: center;
    line-height: 60px;
    background-color: #002140;
  }
  .aside-page-menu {
    border: none;
  }
}
</style>
