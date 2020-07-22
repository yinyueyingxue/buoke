<template>
 <div>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>友链管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
       <el-button size="small" style="width:60px;margin:20px 0px;" @click="handleAddLink()">添加</el-button>
    </div>
    <div class="manage-table">
      <el-table :data="List" border style="width: 100%">
        <el-table-column prop="title" label="标题" width="130">
        </el-table-column>
        <el-table-column prop="url" label="url">
        </el-table-column>
        <el-table-column prop="createTime" label="日期" sortable width="140">
        </el-table-column>
        <el-table-column label="操作" width="170">
          <template scope="scope">
            <el-button size="small" @click="handleEditLink(scope.row._id)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加表格 -->
    <el-dialog :title="isEdit ? '添加' : '编辑'" :visible.sync="dialogFormVisible">
        <el-form :model="form">
           <el-form-item label="链接标题">
              <el-input v-model="form.title"></el-input>
           </el-form-item>
           <el-form-item label="URL">
               <el-input v-model="form.url"></el-input>
           </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
           <el-button @click="dialogFormVisible = false">取 消</el-button>
           <el-button type="primary" @click="handleCreateLink">确 定</el-button>
        </div>
    </el-dialog>
 </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      List: [],
      dialogFormVisible: false,
      form: {title: '', url: ''},
      isEdit: true,
      linkId: null
    }
  },
  methods: {
    ...mapActions({
      xcreatelink: 'createLink',
      xgetAlllink: 'getAlllink',
      xgetlinkDetail: 'getlinkDetail',
      xeditLinkDetail: 'editLinkDetail',
      xdelLink: 'delLink'
    }),
    handleAddLink() {
      this.dialogFormVisible = true
      this.isEdit = true
      this.form.title = ''
      this.form.url = ''
    // this.dialogFormVisible = true
    },
    handleCreateLink() {
      console.log('添加', this.form)
      if (this.isEdit) {
        this.xcreatelink(this.form).then((res) => {
          this.dialogFormVisible = false
          this.handlecreateword()
        })
      } else {
        //  修改
        let form = {
          title: this.form.title,
          url: this.form.url
        }
        this.xeditLinkDetail({
          linkId: this.linkId,
          linkDetail: form
        }).then((res) => {
          // console.log('edit', res)
          this.dialogFormVisible = false
          this.handlecreateword()
        })
      }
    },
    handleEditLink(id) {
      console.log('linkid', id)
      this.linkId = id
      this.xgetlinkDetail({id: id}).then((res) => {
        // console.log('详情link', res)
        this.isEdit = false
        this.dialogFormVisible = true
        this.form = res.data.detail
      })
    },
    handleDelete(id) {
      this.$alert('是否确认删除', '确认发布', {
        confirmButtonText: '确定',
        callback: action => {
          this.deleteWord(id)
        }
      })
    },
    deleteWord(id) {
      this.xdelLink({
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
      this.xgetAlllink().then((res) => {
        // console.log('res友链管理', res)
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
