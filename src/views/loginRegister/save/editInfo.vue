<template>
  <el-container direction="vertical">
    <boke-nav />
    <el-main class="content-wrapper login-div">
      <el-form
        label-width="80px"
        class="login-form"
        :model="formData"
        ref="login"
        :rules="rules"
      >
        <el-form-item prop="userName" label="用户名">
          <el-input
            v-model="formData.userName"
          />
        </el-form-item>
        <el-form-item prop="realname" label="真实姓名">
          <el-input
            v-model="formData.realname"
          />
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input
            v-model="formData.email"
          />
        </el-form-item>
        <el-form-item prop="tel" label="联系方式">
          <el-input
            v-model="formData.tel"
          />
        </el-form-item>
        <el-form-item prop="gender" label="性别">
          <el-radio-group v-model="formData.gender">
            <el-radio value="1" label="男"></el-radio>
            <el-radio value="0" label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="info" label="简介">
          <el-input
            type="textarea"
            :rows="4"
            v-model="formData.info"
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
          userId: null,
          email: null,
          realname: null,
          info: null,
          gender: null,
          tel: null
        },
        rules: {
          userName: [{
            required: true,
            message: '用户名不能为空'
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
                name: ''
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
    width: 300px;
    padding: 25px 35px;
    border-style: solid;
    border-width: thin;
    border-radius: 8px;
    margin-left: calc((100% - 420px)/2);
  }
  .register-link {
    margin-left: 10px;
  }
  .login-item {
    text-align: left;
  }
</style>