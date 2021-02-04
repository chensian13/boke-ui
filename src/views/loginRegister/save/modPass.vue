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
        <el-form-item prop="oldPass">
          <el-input
            type="password"
            placeholder="请输入原来的密码"
            v-model="formData.oldPass"
          />
        </el-form-item>
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
        <el-form-item
          class="login-item"
        >
          <el-button
            type="info"
            @click="onSubmit"
          >
            commit
          </el-button>
          <el-link
            @click="findPass"
            class="register-link"
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
  import { modPass } from '@/api/user'
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
          userId: null,
          oldPass: null,
          password: null,
          password2: null
        },
        rules: {
          oldPass: [{
            required: true,
            message: '原来的密码不能为空'
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
            this.formData.userId = this.$storage.get('user').userId
            modPass(this.formData).then(() => {
              this.$message.success('修改成功')
            })
          } else {
            console.log('error submit!!')
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
  .register-link {
    margin-left: 10px;
  }
</style>