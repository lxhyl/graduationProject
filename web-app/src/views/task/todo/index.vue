<template>
  <div>
    <List :status="1" routeName="TodoTaskDetail"/>
  </div>
</template>
<script>
import List from "../list/index";
export default {
  components: {
    List,
  },
};
</script>