<template>
  <div>
    <el-upload
      action="/api/picture/upload"
      name="upload"
      class="uploader"
      list-type="picture-card"
      :headers="header"
      :disabled="disabled"
      :file-list="imgs"
      :before-upload="beforeUpload"
      :on-success="uploadOk"
      :on-preview="preview"
      :on-remove="handleRemove">
      <i
        v-if="!disabled"
        class="el-icon-plus" 
      />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <el-carousel indicator-position="outside">
        <el-carousel-item
          v-for="(item,i) in imgs"
          :key="i"
        >
          <img
            width="100%"
            :src="preUrl+item.path"
          >
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>

<script>
  import storage from '@/utils/storage'
  export default {
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      imgs: {
        type: Function,
        default: function () {
          return []
        }
      }
    },
    data() {
      return {
        preUrl: 'http://boke_img/',
        dialogVisible: false,
        nowFile: null,
        header: {
          Authorization: storage.get('user').token
        }
      }
    },
    watch: {
      imgs: function (i) {
        this.imgs = i
        this.imgs.map(item => {
          item.url = this.preUrl + item.path
        })
      }
    },
    methods: {
      preview (file) {
        this.nowFile = file
        this.dialogVisible = true
      },
      uploadOk(res, file, fileList) {
        console.log(res, file, fileList)
        var m = file.response.model
        this.imgs.push({
          url: this.preUrl + m.path,
          path: m.path,
          pictureId: m.pictureId
        })
        var i = this.imgs
        this.$emit('input', i)
      },
      beforeUpload(file) {
        const isSize = file.size / 1024 / 1024 < 10;
        if (!isSize) {
          this.$message.error('上传头像图片大小不能超过 10MB!');
        }
        return isSize;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
        for (var i = 0; i < this.imgs.length; i++){
          if (this.imgs[i].path === file.path) {
            this.imgs.splice(i,1)
          }
        }
        var is = this.imgs
        this.$emit('input', is)
      },
    }
  }
</script>

<style>
  .uploader .el-upload {
    border-style: none;
    background: none;
    cursor: pointer;
    position: relative;
  }
</style>