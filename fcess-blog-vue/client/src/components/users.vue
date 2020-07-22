<template>
 <div>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="manage-table">
      <el-table :data="userList" border style="width: 100%">
        <el-table-column prop="_id" label="用户ID">
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="120">
        </el-table-column>
        <el-table-column prop="password" label="密码">
        </el-table-column>
        <el-table-column prop="createTime" label="注册日期" sortable width="120">
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template scope="scope">
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
      userList: []
    }
  },
  methods: {
    ...mapActions({
      xgetAllUsers: 'getAllUsers',
      xremoveUsersById: 'removeUsersById'
    }),
    handleDelete(id) {
      this.$alert('是否确认删除', {
        confirmButtonText: '确定',
        callback: action => {
          this.deleteUser(id)
        }
      })
    },
    deleteUser(id) {
      this.xremoveUsersById({
        id: id
      }).then((res) => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.handlegetAllUsers()
      }).catch((res) => {
        this.$message.error(res.message)
      })
    },
    handlegetAllUsers() {
      this.xgetAllUsers().then((res) => {
        // console.log('users', res.data.result)
        this.userList = res.data.result
      })
    }
  },
  created () {
    this.handlegetAllUsers()
  }
}
</script>

<style>
.breadcrumb {
  margin-bottom: 20px;
}
</style>
