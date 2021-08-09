<template>
  <div class="empty">
    <img src="../../assets/empty.svg" />
    <p v-if="text">{{ text }}</p>
  </div>
</template>
<script>
export default {
  props: ["text"]
};
</script>
<style lang="less" scoped>
.empty {
  text-align: center;
}
</style>
