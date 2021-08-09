<template>
  <div>
    <el-card>
      <Detail />
    </el-card>
     <Log/>
  </div>
</template>
<script>
import Detail from "../detail/index";
import Log from "../log/index"
export default {
  components: {
    Detail,
    Log
  },
};
</script>