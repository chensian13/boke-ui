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
        <el-form-item prop="email">
          <el-input
            placeholder="请输入邮箱"
            v-model="formData.email"
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
        >
          <el-button
            type="info"
            @click="onSubmit"
          >
            login
          </el-button>
          <el-link @click="register" class="register-link">还没账号?</el-link>
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
          email: null,
          password: null
        },
        rules: {
          email: [{
            required: true,
            message: '邮箱不能为空'
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
      register () {
        this.$router.push({
          name: 'Register'
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
  .register-link {
    margin-left: 10px;
  }
</style>