<template>
  <div class="aside-left ly-col-4">
    <div class="aside-left-panel">
      <div class="aside-head-avator">
        <img class="aside-head-img" src="../assets/image/avatar.jpg" alt="" />
        <h3 class="aside-head-title">
          <a href="">
            凌晨四点半
          </a>
        </h3>
        <span class="aside-head-subtitle">专注web端开发</span>
      </div>
      <ul class="aside-menu-list">
        <li class="aside-menu-item"
          v-for="item in menus"
          :key="item.name"
          @click="evtToogleMenu(item)">
            {{item.name}}
        </li>
      </ul>
    </div>
    <!-- 留言 -->
   <el-dialog title="请留言" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="留言内容：" label-width="100px">
          <el-input placeholder="请留下您的建议 " type="textarea" v-model="form.word"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 登录 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisiblelogin"
      width="30%">
      <span>{{logOutContent}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblelogin = false">取 消</el-button>
        <el-button v-if="logOut" type="primary" @click="handleGoLogin()">去登录/注册</el-button>
        <el-button v-else type="primary" @click="handleGoLogOut()">退出登录</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import cookie from 'js-cookie'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      menus: [
        {name: '文章', pathname: 'home'},
        {name: '分类', pathname: 'archive'},
        {name: '标签', pathname: 'tags'},
        {name: '留言', pathname: 'message'},
        {name: '我的收藏', pathname: 'collect'},
        {name: '登录/注册', pathname: 'login'},
        {name: '站长登录', pathname: 'manageList'}
      ],
      form: {word: ''},
      dialogFormVisible: false,
      dialogVisiblelogin: false,
      logOut: true,
      logOutContent: ''
    }
  },
  created() {
    if (cookie.get('role') === 'root') {
      console.log('root')
    } else {
      this.menus.pop()
    }
    // this.handlecreateword()
  },
  methods: {
    ...mapActions({
      xcreateWord: 'createWord'
    }),
    handleConfirm() {
      console.log('确定', this.form.word)
      this.xcreateWord({
        words: this.form.word,
        from_uid: cookie.get('role')
      }).then((res) => {
        this.$message({
          message: res.message,
          type: 'success'
        })
        this.dialogFormVisible = false
      }).catch((res) => {
        this.$message({
          message: res.message,
          type: 'warning'
        })
      })
    },
    evtToogleMenu(item) {
      const token = cookie.get('token') || ''
      if (item.pathname === 'login') {
        if (token) {
          this.logOut = false
          this.logOutContent = '欢迎  ' + cookie.get('role') + ' ' + ' 您已登录'
        } else {
          this.logOut = true
          this.logOutContent = '您还未登录'
        }
        this.dialogVisiblelogin = true
        // this.$router.push({name: 'home'})
      } else {
        if (item.pathname === 'message') {
          if (token) {
            this.dialogFormVisible = true
          } else {
            this.$message({
              message: '您还没有登录呦',
              type: 'warning'
            })
          }
        } else if (item.pathname === 'collect') {
          if (token) {
            this.$router.push({name: item.pathname})
          } else {
            this.$message({
              message: '您还没有登录呦',
              type: 'warning'
            })
          }
        } else {
          this.$router.push({name: item.pathname})
        }
      }
    },
    // 去登录
    handleGoLogin() {
      this.$router.push({name: 'login'})
    },
    // 退出登录
    handleGoLogOut() {
      cookie.remove('token')
      cookie.remove('role')
      this.dialogVisiblelogin = false
      this.$message({
        message: '已退出登录',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
.aside-left {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.aside-left-panel {
  position: fixed;
  top: 8px;
  width: 187px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.12);
}

.aside-head-avator {
  padding-top: 28px;
  margin-bottom: 28px;
  &:hover {
    .aside-head-title:after {
      transform: scaleX(0);
    }
  }
}

.aside-head-img {
  display: block;
  width: 100px;
  height: 100px;
  margin: 0 auto 28px;
  border-radius: 100%;
}

.aside-head-title {
  position: relative;
  width: 118px;
  font-size: 20px;
  font-weight: normal;
  text-align: center;
  margin: 0 auto;
  a {
    color: rgba(0, 0, 0, 0.8);
  }
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    height: 1px;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    transition: all 0.2s ease-in;
    transform: scaleX(1);
  }
}

.aside-head-subtitle {
  display: block;
  font-size: 12px;
  text-align: center;
  padding: 0 10px;
  margin: 10px 0 0 0;
}

.aside-menu-list {
  position: relative;
  padding-bottom: 28px;
  .aside-menu-item {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    text-align: center;
    border-top: 1px solid #eee;
    cursor: pointer;
    transition: all 0.4s ease;
    &:nth-last-child(1) {
      border-bottom: 1px solid #eee;
    }
    &:hover {
      background: #42b983;
      color: #f5f5f5;
      .aside-menu-link {
        color: #f5f5f5;
      }
    }
    .aside-menu-link {
      display: block;
      width: 100%;
      height: 100%;
      color: #888;
    }
  }
}
</style>
