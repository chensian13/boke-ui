<template>
  <el-container direction="vertical">
    <boke-nav />
    <el-main class="content-wrapper">
      <el-form
        label-width="0px"
        class="login-form"
        :model="formData"
        ref="login"
        :rules="rules"
      >
        <el-form-item prop="email">
          <el-input
            type="text"
            placeholder="请输入你的邮箱号"
            v-model="formData.email"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="email"
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
              :loading="sendLoad"
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
            register
          </el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
  import BokeNav from '@/components/business/BokeNav.vue'
  import { register, userMail } from '@/api/user'
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
        sendLoad: false,
        formData: {
          email: null,
          password: null,
          password2: null,
          code: null
        },
        rules: {
          email: [{
            required: true,
            message: '邮箱不能为空'
          }],
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
            register(this.formData.code, this.formData).then(() => {
              this.$message.success('注册成功')
              this.$router.push({
                name: 'Login'
              })
            })
          } else {
            return false
          }
        })
      },
      sendMail () {
        this.sendLoad = true
        userMail({
          receiver: this.formData.email
        }).then(() => {
          this.sendLoad = false
          this.$message.success('邮件已成功发送')
        }).catch(() => {
          this.sendLoad = false
        })
      }
    }
  }
</script>

<style scoped>
  .register-link {
    margin-left: 10px;
  }
</style>