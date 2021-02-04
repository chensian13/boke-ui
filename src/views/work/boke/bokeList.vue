<template>
  <el-container direction="vertical">
    <boke-nav />
    <el-main class="content-wrapper">
      <SearchInput
        placeholder="请输入标题"
        :search="searchKey"
      />
      <el-table
        :data="usersData"
        style="width: 100%">
        <el-table-column
          fixed="left"
          label="操作"
          width="120"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="edit(scope.$index, usersData)"
              type="text"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-for="(e,i) in cols"
          :key="i"
          :prop="e.prop"
          :label="e.label"
          :formatter="e.formatter"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="params.pagesize"
        @current-change="currentPage"
      >
      </el-pagination>
    </el-main>
  </el-container>
</template>

<script>
  import BokeNav from '@/components/business/BokeNav.vue'
  import SearchInput from '@/components/common/SearchInput.vue'
  import { queryBokes } from '@/api/se'
  export default {
    components: {
      BokeNav,
      SearchInput
    },
    data () {
      return {
        total: 0,
        params: {
          page: 1,
          pagesize: 10,
          map: {}
        },
        usersData: [],
        cols: [{
          prop: 'bokeTitle',
          label: '标题'
        }, {
          prop: 'bokeSubtitle',
          label: '副标题'
        }, {
          prop: 'ispublic',
          label: '是否公开',
          formatter: function (row, column, cellValue) {
            if (cellValue === '1') {
              return '是'
            } else if (cellValue === '0') {
              return '否'
            }
          }
        }]
      }
    },
    mounted () {
      this.search(1)
    },
    methods: {
      searchKey (key) {
        if (key)
            this.params.map.bokeTitle = key
        this.search(1)
      },
      search (page) {
        this.params.page = page ? page : 1
        queryBokes(this.params).then(data => {
          this.usersData = data.list
          this.total = data.count
        })
      },
      currentPage (p) {
        this.search(p)
      },
      edit (i, data) {
        var { href } = this.$router.resolve({
          name: 'SaveBoke',
          query: {
            id: data[i].bokeId
          }
        })
        window.open(href, '_blank')
      }
    }
  }
</script>

<style scoped>
</style>