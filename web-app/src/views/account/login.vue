<template>
  <div class="login-page">
    <div class="login-page-main">
      <img src="../../assets/bgd.jpg" />
      <div class="login-page-form">
        <div class="justify-center">
          <h3>生产信息管理系统</h3>
          <el-form
            inline
            :model="accountForm"
            :rules="rules"
            ref="form"
            size="small"
            class="login-page-form-login"
          >
            <el-form-item label="账号" prop="account">
              <el-input
                class="text-input"
                v-model="accountForm.account"
                placeholder="请输入账号"
                style="width: 215px"
              />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="accountForm.password"
                show-password 
                style="width: 215px"
                placeholder="请输入密码"
              />
            </el-form-item>
            <br />
            <el-form-item>
              <ZButton
                @click.native="onLogin"
                :options="buttonOptions"
                class="login-page-form-login-button"
              />
            </el-form-item>
          </el-form>
          <p class="login-page-form-info">
            <i class="el-icon-info"></i>
            不支持自定义注册，请找公司管理人员配置账号
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ZButton from "../../components/Button/index";
import { login } from "../../api/account";
import sha1 from "sha1";
const buttonOptions = {
  type: "primary",
  initText: "登录",
  successText: "登录成功",
  failText: "登录失败",
  status: "init",
  disabled: false
};
export default {
  components: {
    ZButton
  },
  data() {
    return {
      buttonOptions,
      accountForm: {
        account: "",
        password: ""
      },
      rules: {
        account: [
          { required: true, message: "账号是必须的", trigger: "change" }
        ],
        password: [{ required: true, message: "密码是必须的" }]
      }
    };
  },
  methods: {
    getLoginData() {
      const { account, password } = this.accountForm;
      const pwd = sha1(`${account}${password}`);
      return {
        account,
        encryInfo: pwd
      };
    },
    onLogin() {
      const formNode = this.$refs.form;
      formNode.validate(valid => {
        if (!valid) {
          this.$message.error("验证未通过");
          return;
        }
        this.submit();
      });
    },
    async submit() {
      this.buttonOptions.status = "click";
      const data = this.getLoginData();
      const res = await login(data);
      if (res.code !== 200) {
        this.buttonOptions.status = "fail";
        return;
      }
      this.buttonOptions.status = "success";
      const url = localStorage.getItem("S_URL");
      localStorage.removeItem("S_URL");
      if (url && url.includes("taskDetail?taskId")) {
        location.href = url;
      } else {
        this.$router.replace("/");
      }
    }
  },
  created(){
    const account = this.$route.query.account
    this.accountForm.account = account || ''
  }
};
</script>
<style lang="less" scoped>
.login-page {
  height: 100%;
  width: 100%;

  .login-page-main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    img {
      width: 450px;
      height: 360px;
    }
    .login-page-form {
      h3 {
        text-align: center;
      }
      .login-page-form-login {
        text-align: center;
        .login-page-form-login-button {
          width: 215px;
          margin-left: 50px;
        }
      }
      .login-page-form-info {
        text-align: center;
      }
    }
  }
}
.justify-center {
  width: 450px;
  height: 360px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
