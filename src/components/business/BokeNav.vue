<template>
  <el-header class="nav-bg">
    <el-menu
      :default-active="active"
      mode="horizontal"
      @select="handleSelect"
      class="nav"
    >
      <el-menu-item index="0">前往前台</el-menu-item>
      <el-submenu index="1">
        <template slot="title">工作站</template>
        <el-menu-item index="11">我的博客</el-menu-item>
        <el-menu-item index="12">新增博客</el-menu-item>
      </el-submenu>
      <el-menu-item index="2">超管权限</el-menu-item>
      <el-submenu index="3">
        <template slot="title">安全管理</template>
        <el-menu-item index="31">个人信息</el-menu-item>
        <el-menu-item index="32">修改密码</el-menu-item>
        <el-menu-item index="33">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-header>
</template>

<script>
  export default {
    props: {
    },
    data () {
      return {
        active: '1'
      }
    },
    created () {
      var query = this.$route.query
      if (query) {
        this.active = query.active
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
        if (key === this.active) return
        switch (key) {
        case '12':
          this.$router.push({
            name: 'SaveBoke',
            query: {
              active: key
            }
          })
          break
        case '11':
          this.$router.push({
            name: 'BokeList',
            query: {
              active: key
            }
          })
          break
        case '2':
          this.$router.push({
            name: 'Users',
            query: {
              active: key
            }
          })
          break
        case '31':
          this.$router.push({
            name: 'EditInfo',
            query: {
              active: key
            }
          })
          break
        case '32':
          this.$router.push({
            name: 'ModPass',
            query: {
              active: key
            }
          })
          break
        case '33':
          this.$storage.remove('user')
          this.$router.push({
            name: 'Login',
            query: {
              active: key
            }
          })
          break
        } // end switch
      }
    }
  }
</script>

<style scoped>
  .nav-bg {
    margin: 0px;
    padding: 0px;
    background: red;

  }
  .nav {
    padding:0 10%;
    margin: 0px;
    top: 0;
  }
</style>