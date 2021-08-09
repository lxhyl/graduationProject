<template>
  <div>
    <List :status="3" routeName="FinishedTaskDetail"/>
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