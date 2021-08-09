<template>
  <div>
    <div class="detail" v-loading="loading">
      <h3>{{ taskDetail.title }}(ID:{{ taskDetail.taskId }})</h3>
      <div>
        <p class="item">
          <span class="label">工作流:</span>
          <span class="value">
            <Flow
              v-if="taskDetail.flow"
              :flow="taskDetail.flow"
              :nowFlow="taskDetail.nowFlow"
              :taskId="taskDetail.taskId"
              style="margin-left:90px;display"
            />
            <span v-else>此任务无工作流</span>
          </span>
        </p>
        <p class="item">
          <span class="label">状态:</span>
          <span class="value">
            <Status :status="taskDetail.status" />
          </span>
        </p>
        <p class="item">
          <span class="label">任务日期:</span>
          <span class="value">
            <span>{{ formatDate(taskDetail.startDate) }}</span>
            至
            <span>{{ formatDate(taskDetail.endDate) }}</span>
          </span>
        </p>
        <p class="item">
          <span class="label">成本:</span>
          <span class="value"> {{ taskDetail.cost }}元 </span>
        </p>
        <p class="item">
          <span class="label">数量:</span>
          <span class="value"> {{ taskDetail.quantity }}个 </span>
        </p>
        <p class="item">
          <span class="label">负责人:</span>
          <span class="value">
            <el-select
              v-model="taskDetail.responsePerson"
              @change="changeResPerson"
              size="mini"
            >
              <el-option
                v-for="(item, index) in resPersonList"
                :key="index"
                :label="`${item.name}(${item.account})`"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </span>
        </p>
        <p class="item">
          <span class="label">描述:</span>
          <span class="value"> {{ taskDetail.description || "-" }}</span>
        </p>
        <p class="item">
          <span class="label">备注:</span>
          <span class="value"> {{ taskDetail.comment || "-" }}</span>
        </p>
        <br />
        <p class="item">
          <span class="label">相关文件:</span>
          <span
            class="value"
            style="padding: 0 40px 0 0"
            v-if="taskDetail.files && taskDetail.files.length > 0"
          >
            <el-link
              v-for="(file, index) in taskDetail.files"
              :key="index"
              type="primary"
              :href="file.path"
              download
              target="_blank"
              >{{ file.sourceName }}</el-link
            >
          </span>
          <span class="value">-</span>
        </p>
        <br />
        <p class="item">
          <span class="label">标签:</span>
          <span class="value" v-if="tags.length > 0">
            <el-tag
              v-for="(tag, index) in tags"
              :key="index"
              :type="tag.type"
              style="margin: 5px"
              >{{ tag.text }}</el-tag
            >
          </span>
          <span v-else class="value">-</span>
        </p>
        <br />
        <p class="item">
          <span class="label">联系方式:</span>
          <span class="value">{{ taskDetail.phone || "-" }}</span>
        </p>
        <br />
        <p class="item">
          <span class="label">联系地址:</span>
          <span class="value">{{ taskDetail.address || "-" }}</span>
        </p>
        <br />
        <p class="item">
          <span class="label">创建人:</span>
          <span class="value">{{ taskDetail.createPerson }}</span>
        </p>
        <br />
        <p class="item">
          <span class="label">创建时间:</span>
          <span class="value"> {{ formatDate(taskDetail.createDate) }}</span>
        </p>
      </div>
      <br />
      <el-card
        :body-style="{ background: '#F1F8E9' }"
        v-if="$route.path != '/todo/detail'"
      >
        <div slot="header" class="clearfix">
          <span>子任务</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="createTaskVisible = true"
            >新建子任务</el-button
          >
        </div>
        <el-table
          v-if="childTasks && childTasks.length > 0"
          :data="childTasks"
          empty-text="此任务无子任务"
        >
          <el-table-column label="名称" prop="title"></el-table-column>
          <el-table-column
            label="负责人"
            prop="responsePersonName"
          ></el-table-column>
          <el-table-column label="状态" prop="status">
            <template slot-scope="scope">
              <Status :status="scope.row.status" />
            </template>
          </el-table-column>
          <el-table-column label="截至时间" prop="endDate">
            <div v-html="btyDate(scope.row.endDate)" slot-scope="scope">
              {{ scope.row.endDate }}
            </div>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-link type="primary" @click="makeQrcode(scope.row)"
                >二维码查看</el-link
              >
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-link
                @click="openDetail(scope.row)"
                type="primary"
                size="small"
                >详情</el-link
              >
            </template>
          </el-table-column>
        </el-table>
        <p v-else style="text-align: center">此任务无子任务</p>
      </el-card>
      <el-dialog
        :visible.sync="createTaskVisible"
        width="80%"
        top="20px"
        :title="`建立${taskDetail.title}的子任务`"
        destroy-on-close
      >
        <CreateTask :fatherTask="taskDetail.taskId" />
      </el-dialog>
    </div>
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
import { taskDetail, changeResPerson } from "../../../api/tasks";
import { getResList } from "../../../api/account";
import { formatDate, btyDate } from "../../../utils/formatDate";
import CreateTask from "../../createTask/index";
import QRcode from "qrcodejs2";
import Status from "../../../components/Status/index";
import Flow from "../flow/index";
export default {
  components: {
    CreateTask,
    Status,
    Flow,
  },
  data() {
    return {
      taskDetail: {},
      createTaskVisible: false,
      childTasks: [],
      taskQrCodeVisible: false,
      resPersonList: [],
      loading: false,
    };
  },
  computed: {
    taskId() {
      return this.$route.query.taskId;
    },
    status() {
      return this.$route.query.status;
    },
    tags() {
      if (!this.taskDetail.tags) return [];
      return this.taskDetail.tags.split(";").map((item) => {
        let tag = item.split(",");
        return {
          text: tag[0],
          type: tag[1],
        };
      });
    },
  },
  watch: {
    "$route.query": {
      handler() {
        this.getTaskDetail();
      },
    },
  },
  methods: {
    formatDate,
    btyDate,
    changeResPerson(newPerson) {
      const _this = this;
      const newResPerson = this.resPersonList.find(
        (item) => item.id == this.taskDetail.responsePerson
      );
      this.$confirm(`负责人将变更至${newResPerson.name}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const data = {
          taskId: _this.taskDetail.taskId,
          newPerson,
        };
        const res = await changeResPerson(data);
        if (res.code !== 200) {
          this.$message.error("变更失败");
          return;
        }
        this.$message.success(
          "变更成功，如果你不是主管，五秒后，你将失去此任务的权限"
        );
        const timer = setTimeout(() => {
          clearTimeout(timer);
          _this.$router.back();
        }, 3000);
      });
    },
    async getResponsiblePersonList() {
      const res = await getResList();
      if (res.code !== 200) {
        this.$message.error(res.msg);
        return;
      }
      this.resPersonList = res.data;
    },
    async getTaskDetail() {
      this.loading = true;
      const params = {
        taskId: this.taskId,
      };
      const res = await taskDetail(params);
      this.loading = false;
      this.childTasks = [];
      this.taskDetail = res.data;
      if (this.taskDetail.childTasks) {
        const ids = this.taskDetail.childTasks.split(",");
        for (let i = 0; i < ids.length; i++) {
          const params = {
            taskId: ids[i],
          };
          const childRes = await taskDetail(params);
          if (childRes.code !== 200) return;
          this.childTasks.push(childRes.data);
        }
      }
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
          foreground: "#ff0", // 前景色
        });
      });
    },
    openDetail(row) {
      const statusMap = {
        1: "TodoTaskDetail",
        2: "IngTaskDetail",
        3: "FinishedTaskDetail",
        10: "AllTaskDetail",
      };
      console.log("statusMap[row.status],", statusMap[row.status]);
      this.$router.push({
        name: statusMap[row.status],
        query: {
          taskId: row.taskId,
        },
        params: row,
      });
    },
  },
  created() {
    this.getTaskDetail();
    this.getResponsiblePersonList();
  },
};
</script>
<style lang="less" scoped>
.detail {
  h3 {
    text-align: center;
  }
  .item {
    font-size: 14px;
    padding: 5px 0;
    line-height: 25px;
    .label {
      display: inline-block;
      width: 80px;
      text-align: right;
      color: #263238;
    }
    .value {
      margin-left: 5px;
    }
  }
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
