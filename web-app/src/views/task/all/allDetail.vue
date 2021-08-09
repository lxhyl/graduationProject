<template>
  <div>
    <el-card>
    <Detail />
    </el-card>
    <Log/>
  </div>
</template>
<script>
import Log from "../log/index"
import Detail from "../detail/index";
export default {
  components: {
    Detail,
    Log,
  },
};
</script>