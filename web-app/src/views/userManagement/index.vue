<template>
  <div>
    <el-table
      v-if="accountList.length > 0"
      :data="accountList"
      :row-style="tableRowStyle"
    >
      <el-table-column prop="id" label="ID" show-overflow-tooltip width="200">
      </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="account" label="账号"> </el-table-column>
      <el-table-column prop="password" label="密码">
        <template slot-scope="scope">
          <span
            class="animate__animated animate__slideInLeft password-span"
            v-show="scope.row.showPassword"
            >{{ scope.row.password }}</span
          >
          <span
            class="password-hide animate__animated animate__slideInLeft password-span"
            v-show="!scope.row.showPassword"
          >
            <span>{{
              Array(scope.row.password.length).fill("*").join("")
            }}</span>
          </span>
          <span
            @click="scope.row.showPassword = !scope.row.showPassword"
            class="el-icon-view eye"
          ></span>
        </template>
      </el-table-column>
      <el-table-column prop="position" label="职位">
        <template slot-scope="scope">
          <span>{{
            levels.find((item) => item.code == scope.row.level) ? levels.find((item) => item.code == scope.row.level).label : '暂无'
          }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150">
        <template slot="header">
          操作
          <el-button @click="createAccount" size="mini" type="primary"
            >新建</el-button
          >
        </template>
        <template slot-scope="scope">
          <el-link
            @click="makeQrcode(scope.row)"
            class="handlelink"
            type="primary"
            >生成二维码</el-link
          >
          <el-link @click="edit(scope.row)" class="handlelink" type="primary"
            >编辑</el-link
          >
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            :title="`你确定删除${scope.row.account}吗？`"
            @confirm="deleteAccount(scope.row.id)"
          >
            <el-link slot="reference" class="handlelink" type="primary"
              >删除</el-link
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <i v-else class="el-icon-loading loading" />

    <el-dialog
      title="创建账户"
      :visible.sync="createAccountVisible"
      :close-on-click-modal="false"
      destroy-on-close
      width="500px"
    >
      <div>
        <el-form
          ref="accountForm"
          :model="createAccountForm"
          :rules="createRules"
          inline
        >
          <el-form-item class="form-item" label="姓名:" prop="name">
            <el-input
              v-model="createAccountForm.name"
              size="small"
              placeholder="请输入姓名"
            />
          </el-form-item>
          <el-form-item class="form-item" label="账号:" prop="account">
            <el-input
              v-model="createAccountForm.account"
              size="small"
              placeholder="请输入账号"
            />
          </el-form-item>
          <el-form-item class="form-item" label="密码:" prop="password">
            <el-input
              v-model="createAccountForm.password"
              size="small"
              show-password
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item class="form-item" label="职位:" prop="level">
            <el-select v-model="createAccountForm.level" size="small">
              <el-option
                v-for="item in levels"
                :key="item.code"
                :value="item.code"
                :label="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <div style="width: 100%; height: 30px">
            <el-button
              @click="submitAccount"
              style="float: right"
              size="mini"
              type="primary"
              >创建</el-button
            >
          </div>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog
      title="编辑账号"
      :visible.sync="editAccountVisible"
      :close-on-click-modal="false"
      destroy-on-close
      width="500px"
    >
      <div>
        <el-form
          ref="editAccountForm"
          :model="editAccountForm"
          :rules="createRules"
          inline
        >
          <el-form-item class="form-item" label="姓名:" prop="name">
            <el-input
              v-model="editAccountForm.name"
              size="small"
              placeholder="请输入姓名"
            />
          </el-form-item>
          <el-form-item class="form-item" label="账号:" prop="account">
            <el-input
              v-model="editAccountForm.account"
              size="small"
              placeholder="请输入账号"
            />
          </el-form-item>
          <el-form-item class="form-item" label="密码:" prop="password">
            <el-input
              v-model="editAccountForm.password"
              size="small"
              show-password
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item class="form-item" label="职位:" prop="level">
            <el-select v-model="editAccountForm.level" size="small">
              <el-option
                v-for="item in levels"
                :key="item.code"
                :value="item.code"
                :label="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <div style="width: 100%; height: 30px">
            <el-button
              @click="submitEditAccount"
              style="float: right"
              size="mini"
              type="primary"
              >确定</el-button
            >
          </div>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog
      title="账户二维码"
      :visible.sync="accountQrCodeVisible"
      width="296px"
    >
      <div id="qrcode"></div>
    </el-dialog>
  </div>
</template>
<script>
import {
  signup,
  getAccountList,
  editAccount,
  deleteAccount,
} from "../../api/account";
import { query_getEnumsLevel } from "../../api/app";
const inputRule = { required: true, message: "请输入", trigger: "change" };
const slectRule = { required: true, message: "请选择", trigger: "change" };
import QRcode from "qrcodejs2";
export default {
  data: function () {
    return {
      accountList:[],
      label: [],
      createAccountVisible: false,
      levels: [],
      createAccountForm: {},
      createRules: {
        name: inputRule,
        account: inputRule,
        password: inputRule,
        level: slectRule,
      },
      editAccountForm: {},
      editAccountVisible: false,
      accountQrCodeVisible: false,
    };
  },
  methods: {
    makeQrcode(row) {
      this.accountQrCodeVisible = true;
      this.$nextTick(() => {
        const node = document.getElementById("qrcode");
        node.innerHTML = "";
        const host = location.host.includes("127.0.0.1")
          ? location.host
          : `${location.host}/bsweb`;
        const link = `http://${host}/#/login?account=${row.account}`;
        new QRcode("qrcode", {
          text: link, // 二维码内容
          render: "canvas", // 渲染方式
          background: "#f0f", // 背景色
          foreground: "#ff0", // 前景色
        });
      });
    },
    async getAccountList() {
      const res = await getAccountList();
      if (res.code !== 200) {
        this.$message.error("获取账号列表失败");
        return;
      }
      this.accountList = res.data.map((item) => ({
        ...item,
        showPassword: false,
      }));
    },
    async getLevels() {
      const params = {
        enmusKey: "level",
      };
      const res = await query_getEnumsLevel(params);
      if (res.code !== 200) {
        this.$message.error("获取职位失败");
        return;
      }
      this.levels = res.data;
    },
    createAccount() {
      this.createAccountVisible = true;
    },
    submitAccount() {
      const form = this.$refs.accountForm;
      form.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const res = await signup(this.createAccountForm);
        if (res.code !== 200) {
          this.$message.error(res.msg);
          return;
        }
        this.$message.success("创建成功");
        this.createAccountForm = {};
        this.getAccountList();
        this.createAccountVisible = false;
      });
    },
    edit(scope) {
      console.log("scope", scope);
      this.editAccountForm = scope;
      this.editAccountVisible = true;
    },
    submitEditAccount() {
      const form = this.$refs.editAccountForm;
      form.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const res = await editAccount(this.editAccountForm);
        if (res.code !== 200) {
          this.$message.error(res.msg);
          return;
        }
        this.$message.success(res.msg);
        this.editAccountVisible = false;
        this.editAccountForm = {};
        this.getAccountList();
      });
    },
    async deleteAccount(id) {
      const data = {
        accountId: id,
      };
      const res = await deleteAccount(data);
      if (res.code !== 200) {
        this.$message.error(res.msg);
        return;
      }
      this.$message.success(res.msg);
      this.getAccountList();
    },
    tableRowStyle({ row }) {
      if (row.level === 100) {
        return {
          background: "#C8E6C9",
        };
      }
      return {};
    },
  },
  created() {
    this.getAccountList();
    this.getLevels();
  },
};
</script>
<style lang="less" scoped>
.handlelink {
  margin: 0 10px;
}
.list-id {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.form-item {
  text-align: center;
  width: 300px;
  padding: 0 80px;
}
.password-span {
  display: inline-block;
}
.eye {
  padding-left: 5px;

  color: #409eff;
}
/deep/.el-popconfirm__main {
  margin: 10px 0;
}
.loading {
  width: 100%;
  text-align: center;
  font-size: 60px;
  color: #409eff;
}
</style>
