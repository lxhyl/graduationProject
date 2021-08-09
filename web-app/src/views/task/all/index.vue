<template>
  <div>
     <div>
      <el-input v-model="searchWord" placeholder="根据名称搜索" 
      style="width:200px;"></el-input>
    </div>
    <el-divider></el-divider>
    <el-table :data="showList"  row-key="taskId" v-loading="loading">
      <el-table-column prop="title" label="任务名"></el-table-column>
      <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
              <Status :status="scope.row.status"/>
          </template>
      </el-table-column>
      <el-table-column prop="responsePersonName" label="负责人"></el-table-column>
      <el-table-column prop="startDate" label="开始日期" width="180">
        <span slot-scope="scope">{{ formatDate(scope.row.startDate) }}</span>
      </el-table-column>
      <el-table-column prop="endDate" label="结束日期" width="180">
        <span slot-scope="scope" v-html="btyDate(scope.row.endDate)">{{scope.row.endDate}}</span>
      </el-table-column>
      <el-table-column prop="cost" label="成本">
        <span slot-scope="scope">{{ scope.row.cost + "元" }}</span>
      </el-table-column>
      <el-table-column prop="tags" label="标签">
        <template slot-scope="scope" >
          <template v-if="formatTags(scope.row.tags)">
          <el-tag
            v-for="(tag, index) in formatTags(scope.row.tags)"
            :key="index"
            :type="tag.type"
            size="mini"
            style="margin:5px 0 0 5px;"
          >
            {{ tag.name }}
          </el-tag>
          </template>
          <p v-else>无标签</p>
        </template>
      </el-table-column>
      <el-table-column width="180">
        <template slot-scope="scope">
          <el-link type="primary" @click="makeQrcode(scope.row)"
            >生成二维码</el-link
          >
        </template>
      </el-table-column>
      <el-table-column label="操作"  width="180" fixed="right">
        <template slot-scope="scope" >
          <el-link type="primary" @click="openDetail(scope.row)">详情</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="任务二维码"
      :visible.sync="taskQrCodeVisible"
      width="296px"
    >
      <div id="qrcode"></div>
    </el-dialog>
  </div>
</template>
<script>
import { getAllTasks } from "../../../api/tasks";
import QRcode from "qrcodejs2";
import { formatDate,btyDate } from "../../../utils/formatDate";
import Status from '../../../components/Status/index'
export default {
  components:{
      Status
  },
  data() {
    return {
      taskList: [],
      taskQrCodeVisible: false,
      loading:false,
       searchWord:'',
    };
  },
    computed:{
    showList(){
      if(!this.searchWord) return this.taskList
      return this.taskList.filter(item => item.title.includes(this.searchWord))
    }
  },
  methods: {
    formatDate,
    btyDate,
    async getList() {
      this.loading = true
      const res = await getAllTasks();
      this.loading = false
      if (res.code !== 200) {
        this.$message.error("获取列表失败");
        return;
      }
      this.taskList = res.data
    },
    formatTags(str) {
      if (!str) return;
      const tags = str.split(";");
      const result = tags.map(tag => {
        const tagArr = tag.split(",");
        return {
          name: tagArr[0],
          type: tagArr[1]
        };
      })
      return result
    },
    openDetail(row) {
      this.$router.push({
        name: 'AllTaskDetail',
        query: {
          taskId: row.taskId
        },
        params: row
      });
    },
    makeQrcode(row) {
      this.taskQrCodeVisible = true;
      this.$nextTick(() => {
        const node = document.getElementById("qrcode");
        node.innerHTML = "";
        const host = location.host.includes("127.0.0.1")
          ? location.host
          : `${location.host}/bsweb`;
        const link = `http://${host}/#/taskDetail?taskId=${row.taskId}`;
        new QRcode("qrcode", {
          text: link, // 二维码内容
          render: "canvas", // 渲染方式
          background: "#f0f", // 背景色
          foreground: "#ff0" // 前景色
        });
      });
    }
  },
  created() {
    this.getList();
  }
};
</script>
