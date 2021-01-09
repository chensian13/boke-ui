<template>
  <el-container direction="vertical">
    <boke-nav />
    <el-main class="content-wrapper">
      <SearchInput
        placeholder="请输入用户名"
        :search="search"
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
              @click.native.prevent="read(scope.$index, usersData)"
              type="text"
            >
              查看
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
      <el-dialog
        :visible.sync="visible"
        title="账号信息"
        width="360px"
      >
        <Detail
          :info-list="userInfo"
          top="0px"
        />
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
  import BokeNav from '@/components/business/BokeNav.vue'
  import SearchInput from '@/components/common/SearchInput.vue'
  import Detail from './detail.vue'
  import { queryData } from '@/api/user'
  export default {
    components: {
      BokeNav,
      Detail,
      SearchInput
    },
    data () {
      return {
        total: 0,
        params: {
          page: 1,
          pagesize: 10
        },
        userInfo: [],
        usersData: [],
        cols: [{
          prop: 'userName',
          label: '用户名'
        }, {
          prop: 'email',
          label: '邮箱'
        }, {
          prop: 'gender',
          label: '性别'
          // formatter: function (row, column, cellValue) {
          //   if (cellValue === '1') {
          //     return '男'
          //   } else if (cellValue === '0') {
          //     return '女'
          //   }
          // }
        }],
        visible: false
      }
    },
    mounted () {
      this.search(1)
    },
    methods: {
      search (page) {
        this.params.page = page
        queryData(this.params).then(data => {
          this.usersData = data.list
          this.total = data.count
          for (var e in data.list) {
            if (data.list[e].gender === '1') {
              data.list[e].gender = '男'
            } else if (data.list[e].gender === '0') {
              data.list[e].gender = '女'
            }
          }
        })
      },
      currentPage (p) {
        this.search(p)
      },
      read (index, rows) {
        // console.log(JSON.stringify(rows[index]))
        this.visible = true
        var list = []
        for (var e in rows[index]) {
          switch (e) {
          case 'userName':
            list.push({
              n: '用户名',
              v: rows[index][e]
            })
            break
          case 'email':
            list.push({
              n: '邮箱',
              v: rows[index][e]
            })
            break
          case 'gender':
            list.push({
              n: '性别',
              v: rows[index][e]
            })
            break
          } // end switch
        } // end for
        this.userInfo = list
        console.log(JSON.stringify(this.userInfo))
      }
    }
  }
</script>

<style scoped>
</style>