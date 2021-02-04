<template>
  <el-container direction="vertical">
    <boke-nav />
    <el-main class="content-wrapper">
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
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
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
            commit
          </el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
  import BokeNav from '@/components/business/BokeNav.vue'
  import { updInfo, queryById } from '@/api/user'
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
          email: [{
            required: true,
            message: '邮箱不能为空'
          }]
        }
      }
    },
    mounted () {
      queryById(this.$storage.get('user').userId).then(data => {
        this.formData = data.model
      })
    },
    methods: {
      onSubmit () {
        this.$refs['login'].validate((valid) => {
          if (valid) {
            updInfo(this.formData).then(() => {
              this.$message.success('保存成功')
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
</style>