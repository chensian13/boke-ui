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
        <el-form-item prop="userName">
          <el-input
            placeholder="请输入用户名"
            v-model="formData.userName"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="formData.password"
          />
        </el-form-item>
        <el-form-item
          class="login-item"
        >
          <el-button
            type="info"
            @click="onSubmit"
          >
            login
          </el-button>
          <el-link class="register-link">还没账号?</el-link>
          <el-link
            type="success"
            class="register-link"
            @click="findPass"
          >
            忘记了密码
          </el-link>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
  import BokeNav from '@/components/business/BokeNav.vue'
  import { login } from '@/api/user'
  import storage from '@/utils/storage'
  export default {
    components: {
      BokeNav
    },
    data () {
      return {
        formData: {
          userName: null,
          password: null
        },
        rules: {
          userName: [{
            required: true,
            message: '用户名不能为空'
          }],
          password: [{
            required: true,
            message: '密码不能为空'
          }]
        }
      }
    },
    methods: {
      onSubmit () {
        this.$refs['login'].validate((valid) => {
          if (valid) {
            login(this.formData).then(data => {
              this.$message.success('登录成功')
              storage.set('user', data.model)
              this.$router.push({
                name: 'EditInfo'
              })
            })
          } else {
            return false
          }
        })
      },
      findPass () {
        this.$router.push({
          name: 'FindPass'
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