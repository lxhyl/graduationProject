<template>
  <div>
    <List :status="2" routeName="IngTaskDetail"/>
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