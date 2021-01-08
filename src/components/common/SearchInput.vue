<template>
  <el-input
    class="search"
    clearable
    :placeholder="placeholder"
    suffix-icon="el-icon-search"
    @keyup.enter.native="searchWrap"
    v-model="key"
  />
</template>

<script>
  export default {
    props: {
      placeholder: {
        type: String,
        default: null
      },
      search: {
        type: Function,
        default: null
      }
    },
    data () {
      return {
        key: null
      }
    },
    methods: {
      searchWrap () {
        if (this.search) {
          this.search(this.key)
        }
      }
    }
  }
</script>

<style scoped>
  .search {
    width: 255px;
    display: inline-block;
    margin-left: 0px;
  }
</style>