<template>
  <el-container direction="vertical">
    <boke-nav />
    <el-main class="content-wrapper login-div">
      <el-form
        label-width="0px"
        class="login-form"
        :model="formData"
        ref="login"
        :rules="rules"
      >
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入新密码"
            v-model="formData.password"
          />
        </el-form-item>
        <el-form-item prop="password2">
          <el-input
            type="password"
            placeholder="请再次输入新密码"
            v-model="formData.password2"
          />
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            type="text"
            placeholder="请输入邮箱号"
            v-model="formData.email"
          />
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            type="code"
            placeholder="输入验证码"
            v-model="formData.code"
          >
            <el-button
              slot="append"
              type="success"
              @click="sendMail"
            >
              发送邮件
            </el-button>
          </el-input>
        </el-form-item>
        <el-form-item
          class="login-item"
        >
          <el-button
            type="info"
            @click="onSubmit"
          >
            commit
          </el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
  import BokeNav from '@/components/business/BokeNav.vue'
  import { findPass, findPassMail } from '@/api/user'
  export default {
    components: {
      BokeNav
    },
    data () {
      var validatePass2 = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formData.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        formData: {
          email: null,
          password: null,
          password2: null,
          code: null
        },
        rules: {
          code: [{
            required: true,
            message: '验证码不能为空'
          }],
          password: [{
            required: true,
            message: '新密码不能为空'
          }],
          password2: [{
            required: true,
            validator: validatePass2
          }]
        }
      }
    },
    methods: {
      onSubmit () {
        this.$refs['login'].validate((valid) => {
          if (valid) {
            findPass(this.formData.code, this.formData).then(() => {
              this.$message.success('修改成功')
            })
          } else {
            return false
          }
        })
      },
      sendMail () {
        findPassMail({
          receiver: this.formData.email
        }).then(() => {
          this.$message.success('邮件已成功发送')
        })
      }
    }
  }
</script>

<style scoped>
  .login-div {
    text-align: center;
    align-content: center;
  }
  .login-form {
    width: 286px;
    padding: 25px 35px;
    margin-top: 75px;
    border-style: solid;
    border-width: thin;
    border-radius: 8px;
    margin-left: calc((100% - 356px)/2);
  }
  .register-link {
    margin-left: 10px;
  }
  .login-item {
    text-align: left;
  }
</style>