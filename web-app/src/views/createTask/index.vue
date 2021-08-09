<template>
  <div>
    <el-card>
      <div slot="header">
        <span>创建任务</span>
      </div>
      <el-form
        :model="formData"
        ref="task"
        :rules="rules"
        inline
        size="small"
        label-width="90px"
      >
        <el-form-item label="任务名称:" prop="title">
          <el-input
            v-model="formData.title"
            style="width: 400px"
            placeholder="请输入任务名称"
          />
        </el-form-item>
        <br />
        <el-form-item label="日期:" prop="date">
          <el-date-picker
            v-model="formData.date"
            type="datetimerange"
            range-separator="至"
            :picker-options="pickerOptions"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <br />
        <el-form-item label="工作流:">
          <el-steps direction="vertical" space="20">
            <el-step
              v-for="(item, index) in worlFlowList"
              :title="item"
              :key="index"
              status="success"
            >
              <div slot="title">
                {{ item }}
                <i @click="deleteFlow(index)" class="el-icon-delete icon"></i>
                <i
                  @click="changeFlowIndex(index - 1, index)"
                  v-if="index > 0"
                  class="el-icon-upload2 icon"
                ></i>
                <i
                  @click="changeFlowIndex(index, index + 1)"
                  v-if="index < worlFlowList.length - 1"
                  class="el-icon-download icon"
                ></i>
              </div>
            </el-step>
          </el-steps>
          <div>
            <el-input v-model="workFlowName" placeholder="请逐步输入工作流">
              <el-button @click="addFlow" slot="append">添加</el-button>
            </el-input>
          </div>
        </el-form-item>
        <br />
        <el-form-item label="成本(元):" prop="cost">
          <el-input
            v-model="formData.cost"
            placeholder="请输入单个成本"
          ></el-input>
        </el-form-item>
        <br />
        <el-form-item label="数量:" prop="quantity">
          <el-input
            v-model="formData.quantity"
            placeholder="请输入数量"
          ></el-input>
        </el-form-item>
        <br />
        <el-form-item label="执行者:" prop="responsePerson">
          <el-select v-model="formData.responsePerson">
            <el-option
              v-for="item in resPersonList"
              :key="item.id"
              :value="item.id"
              :label="`${item.name}(账号:${item.account})`"
            ></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="描述:">
          <el-input
            type="textarea"
            style="width: 400px"
            v-model="formData.description"
            :autosize="{ minRows: 3 }"
            placeholder="请简要描述任务"
          >
          </el-input>
        </el-form-item>
        <br />
        <el-form-item label="相关资料:">
          <el-upload
            class="upload-demo"
            drag
            multiple
            action="/bsapi/files"
            :before-upload="beforeUpload"
            :on-success="onSuccess"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">文件应不超过20M</div>
          </el-upload>
        </el-form-item>
        <br />
        <el-form-item label="标签:">
          <el-tag
            style="margin: 0 5px"
            effect="dark"
            v-for="(tag, index) in formData.tags"
            :type="tag.type"
            :key="tag.name"
            closable
            @close="deleteTag(index)"
          >
            {{ tag.name }}
          </el-tag>
          <el-tag @click="openAddTag">+新增标签</el-tag>
          <el-dialog
            title="新建标签"
            :visible.sync="tagsVisible"
            :modal="false"
            width="500px"
          >
            <el-form
              ref="tags"
              inline
              size="small"
              label-width="90px"
              style="padding-bottom: 30px"
            >
              <el-form-item label="标签名">
                <el-input
                  v-model="tagForm.name"
                  placeholder="输入一个标签名"
                ></el-input>
              </el-form-item>

              <el-form-item label="类型">
                <el-select v-model="tagForm.type">
                  <el-option
                    v-for="type in tagsTypeOptions"
                    :key="type.type"
                    :value="type.type"
                    :label="type.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <br />
              <el-button type="primary" class="submit-button" @click="addTag"
                >添加标签</el-button
              >
            </el-form>
          </el-dialog>
        </el-form-item>
        <br />
        <el-form-item label="备注:">
          <el-input
            type="textarea"
            style="width: 400px"
            v-model="formData.comment"
            :autosize="{ minRows: 3 }"
            placeholder="请添加任务备注"
          ></el-input>
        </el-form-item>
        <br />
        <el-form-item label="联系方式:">
          <el-input
            v-model="formData.phone"
            placeholder="请输入联系方式"
          ></el-input>
        </el-form-item>
        <br />
        <el-form-item label="联系地址:">
          <el-input
            v-model="formData.address"
            placeholder="请输入联系地址"
          ></el-input>
        </el-form-item>

        <br />
        <br />
        <el-button @click="submit" type="primary" class="submit-button"
          >创建</el-button
        >
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { getResList } from "../../api/account";
import { createTask } from "../../api/tasks";

const createRule = (name, type = "blur") => ({
  required: true,
  message: `${name}是必须的`,
  trigger: type,
});
export default {
  props: ["fatherTask"],
  data() {
    return {
      formData: {
        tags: [],
        fileIds: [],
      },
      tagsVisible: false,
      tagsTypeOptions: [
        { type: "success", name: "正常" },
        { type: "info", name: "决议中" },
        { type: "warning", name: "可能会变动" },
        { type: "danger", name: "紧急" },
      ],
      tagForm: {}, // 新建标签数据
      rules: {
        title: [createRule("名称", "change")],
        date: [createRule("日期", "change")],
        cost: [createRule("成本", "change")],
        quantity: [createRule("数量", "change")],
        responsePerson: [createRule("任务执行者", "change")],
      },
      resPersonList: [],
      pickerOptions: {
        disabledDate(date) {
          return date.getTime() < Date.now() - 1000 * 60 * 60 * 24;
        },
      },
      workFlowName: "", //工作流
      worlFlowList: [], //
    };
  },

  methods: {
    changeFlowIndex(left, right) {
      const temp = this.worlFlowList[left];
      this.$set(this.worlFlowList, left, this.worlFlowList[right]);
      this.$set(this.worlFlowList, right, temp);
    },
    deleteFlow(index){
      this.worlFlowList.splice(index,1)
    },
    addFlow() {
      if (this.workFlowName === "") return;
      this.worlFlowList.push(this.workFlowName);
      this.workFlowName = "";
    },
    async getResponsiblePersonList() {
      const res = await getResList();
      if (res.code !== 200) {
        this.$message.error(res.msg);
        return;
      }
      this.resPersonList = res.data;
    },
    beforeUpload(file) {
      const size = file.size / 1024 / 1024;
      if (size > 20) {
        this.$message.warning("文件过大");
        return false;
      }
      return true;
    },
    onSuccess(res) {
      if (res.code !== 200) {
        this.$message.error("文件上传失败");
        return;
      }
      this.formData.fileIds.push(res.data.fileId);
    },
    openAddTag() {
      this.tagForm = {};
      this.tagsVisible = true;
    },
    addTag() {
      this.formData.tags.push(this.tagForm);
      this.tagsVisible = false;
    },
    deleteTag(index) {
      this.formData.tags.splice(index, 1);
    },
    formatDate() {
      const tempData = { ...this.formData };
      const startDate = new Date(tempData.date[0]).getTime();
      const endDate = new Date(tempData.date[1]).getTime();
      tempData.startDate = startDate;
      tempData.endDate = endDate;
      tempData.fileIds = tempData.fileIds.join(",");
      tempData.flow = this.worlFlowList.join(';');
      tempData.tags = tempData.tags
        .map((item) => `${item.name},${item.type}`)
        .join(";");
      delete tempData.date;
      if (this.fatherTask) {
        tempData.fatherTask = this.fatherTask;
      }
      return tempData;
    },
    submit() {
      this.$refs.task.validate(async (valid) => {
        if (!valid) return;
        const data = this.formatDate();
        const res = await createTask(data);
        if (res.code !== 200) {
          this.$message.error("创建失败");
          return;
        }
        this.$message.success("创建任务成功");
        this.$router.push("/todo");
      });
    },
  },
  created() {
    this.getResponsiblePersonList();
  },
};
</script>
<style lang="less" scoped>
.submit-button {
  float: right;
  margin: 5px 0 20px 0;
}
.icon {
  margin: 0 10px;
}
</style>
