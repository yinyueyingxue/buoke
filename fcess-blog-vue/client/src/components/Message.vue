<template>
 <div>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>留言管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="manage-table">
      <el-table :data="List" border style="width: 100%">
        <el-table-column prop="from_uid" label="用户账号" width="130">
        </el-table-column>
        <el-table-column prop="words" label="留言内容">
        </el-table-column>
        <el-table-column prop="createTime" label="日期" sortable width="140">
        </el-table-column>
        <el-table-column label="操作" width="170">
          <template scope="scope">
            <el-button size="small">查看详情</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
 </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      List: []
    }
  },
  methods: {
    ...mapActions({
      xgetAllWords: 'getAllWords',
      xremoveWordById: 'removeWordById'
    }),
    handleDelete(id) {
      this.$alert('是否确认删除', '确认发布', {
        confirmButtonText: '确定',
        callback: action => {
          this.deleteWord(id)
        }
      })
    },
    deleteWord(id) {
      this.xremoveWordById({
        id: id
      }).then((res) => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.handlecreateword()
      }).catch((res) => {
        this.$message.error(res.message)
      })
    },
    handlecreateword() {
      this.xgetAllWords().then((res) => {
        // console.log('res留言管理', res)
        this.List = res.data.list
      }).catch((res) => {
        this.$message({
          message: res.message,
          type: 'success'
        })
      })
    }
  },
  created () {
    this.handlecreateword()
  }
}
</script>

<style>
.breadcrumb {
  margin-bottom: 20px;
}
</style>
