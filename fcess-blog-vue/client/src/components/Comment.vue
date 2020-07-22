<template>
 <div>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>评论管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="manage-table">
      <el-table :data="articleList" border style="width: 100%">
        <el-table-column prop="createTime" label="日期" sortable width="180">
        </el-table-column>
        <el-table-column prop="title" label="文章名" width="280">
        </el-table-column>
        <el-table-column prop="tags" label="标签">
          <template scope="scope">
            <el-tag close-transition>{{scope.row.tags}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <!-- <el-button size="small" @click="handleEdit(scope.row._id)">编辑</el-button> -->
            <el-button size="small" type="danger" @click="handleDelete(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
 </div>
</template>

<script>
export default {
  data() {
    return {
      articleList: [{tags: '123'}]
    }
  },
  methods: {
    handleDelete(index, row) {
      console.log('删除')
    }
  }
}
</script>

<style>
.breadcrumb {
  margin-bottom: 20px;
}
</style>
