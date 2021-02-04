<template>
  <el-container direction="vertical">
    <boke-nav />
    <el-main class="content-wrapper">
      <el-row>
        <el-col :span="15">
          <el-form
            label-width="80px"
            :model="formData"
            ref="login"
            :rules="rules"
          >
            <el-form-item prop="userName" label="标题">
              <el-input
                v-model="formData.bokeTitle"
              />
            </el-form-item>
            <el-form-item prop="realname" label="副标题">
              <el-input
                v-model="formData.bokeSubtitle"
              />
            </el-form-item>
            <el-form-item prop="info" label="" class="login-item">
              <Editor
                :info="formData.info"
                :change="change"
              />
            </el-form-item>
            <el-form-item
              class="login-item"
            >
              <el-button
                type="info"
                @click="onSubmit"
                :loading="load"
              >
                save
              </el-button>
            </el-form-item>
           </el-form>
        </el-col>
        <el-col :span="9">
          <h3>上传图片</h3>
          <UploadImage
            :imgs="formData.images"
          />
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  import BokeNav from '@/components/business/BokeNav.vue'
  import Editor from '@/components/business/Editor.vue'
  import UploadImage from '@/components/business/UploadImage.vue'
  import { saveOrUpdateBoke, queryBokeById } from '@/api/se'
  export default {
    components: {
      BokeNav,
      Editor,
      UploadImage
    },
    data () {
      return {
        load: false,
        formData: {
          bokeId: null,
          bokeSubtitle: null,
          bokeTitle: null,
          images: [],
          info: null,
          ispublic: null
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
      this.formData.bokeId = this.$route.query.id
      if (this.formData.bokeId)
        this.query()
    },
    methods: {
      query () {
        if (!this.formData.bokeId) return
        queryBokeById(this.formData.bokeId).then(res => {
          this.formData = res.model
        })
      },
      change (c) {
        this.formData.info = c
      },
      onSubmit () {
        this.load = true
        this.$refs['login'].validate((valid) => {
          this.load = false
          if (valid) {
            var oper = 'upd'
            if (!this.formData.bokeId) {
              oper = 'add'
            }
            saveOrUpdateBoke(oper, this.formData).then(res => {
              this.formData.bokeId = res.model.bokeId
              this.$message.success('保存成功')
              this.query()
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
  .el-col {
    padding: 0px 20px;
  }
  h3 {
    margin-bottom: 10px;
    font-weight: 500;
  }
</style>
