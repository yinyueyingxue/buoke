<template>
  <div class="article-container ly-col-14">
    <article class="article-wrap">
      <h1 class="article-head-title">{{article.title}}</h1>
      <ul class="article-nav-list">
        <li class="article-nav-item">
          <i class="icon-calendar ion-clock"></i>
          {{article.createTime}}
          <!-- 取消收藏 -->
          <i v-if="IsCollect" @click="handleCollecton()" class="el-icon-star-on" style="font-size:18px;margin-left:8px;"></i>
          <!-- 变为收藏 -->
          <i v-else @click="handleCollectoff()" class="el-icon-star-off" style="font-size:18px;margin-left:8px;"></i>
          <span style="font-size:16px;" v-if="IsCollect">已收藏</span>
          <span style="font-size:16px;" v-else>收藏</span>
        </li>
      </ul>
      <p class="article-content markdown-body"
        v-html="article.render">
      </p>
    </article>
    <!-- 评论对话 -->
    <div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="评论一下:">
          <el-input type="textarea" placeholder="来说两句吧……" v-model="form.desc"></el-input>
        </el-form-item>
        <!-- <el-form-item> -->
          <el-button style="float:right;margin-top:-10px;" type="primary" @click="onSubmit">提交评论</el-button>
        <!-- </el-form-item> -->
      </el-form>
    </div>
    <!-- 评论内容数据展示 -->
    <div class="remarks">
      <!-- 评论 -->
      <div class="flex-l" v-for="(remark,index) of remarkList" :key="index" >
        <div>
          <img class="avatar" src="../assets/image/avatar.jpg" alt="">
        </div>
        <div>
          <span>{{remark.from_uid}} &nbsp; {{remark.createTime}}</span>
          <!-- <span @click="handlereplay()">&nbsp; 回复</span> -->
          <p class="remark-con">{{remark.content}}</p>
        </div>
      </div>
      <!-- 回复评论 -->
      <!-- <div class="flex-r">
        <div>
          <img class="avatar" src="../assets/image/avatar.jpg" alt="">
        </div>
        <div>
          <span>root &nbsp; 2019-4-11</span>
          <span @click="handlereplay()">&nbsp; 回复</span>
          <p class="remark-con">写的不错</p>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import PageNav from './PageNav'
import { mapGetters, mapActions } from 'vuex'
import cookie from 'js-cookie'

export default {
  data () {
    return {
      article: {},
      IsCollect: null,
      form: {desc: ''},
      remarkList: null
    }
  },
  computed: {
    ...mapGetters({
      articleDetail: 'articleDetail'
    }),
    articleId () {
      return this.$route.params.id
    }
  },
  watch: {
    articleId() {
      this.getArticleDetail()
    }
  },
  methods: {
    ...mapActions({
      xGetArticleDetail: 'getArticleDetail',
      xcreateRemark: 'createRemark',
      xgetRemarkDetail: 'getRemarkDetail',
      xcreatecollect: 'createcollect',
      xIscollect: 'Iscollect',
      xCollectCancle: 'CollectCancle'
    }),
    getArticleDetail() {
      this.xGetArticleDetail({
        id: this.articleId
      }).then((res) => {
        this.article = res.data.detail
      })
    },
    getRemarkDetail() {
      this.xgetRemarkDetail({
        blog_id: this.articleId
      }).then((res) => {
        // console.log('respinlun', res)
        this.remarkList = res.data.list
        console.log('respinlun', this.remarkList)
        // this.article = res.data.detail
      })
    },
    // 取消收藏  需要查找 删除
    handleCollecton() {
      // this.IsCollect = false
      this.xCollectCancle({
        username: cookie.get('role'),
        blog_id: this.articleId
      }).then((res) => {
        this.IsCollect = false
      }).catch((res) => {
        this.IsCollect = false
      })
    },
    // 收藏
    handleCollectoff() {
      // this.IsCollect = true
      this.gocreatCollect()
    },
    // 收藏 接口 也需要查找某一文章 是否收藏
    gocreatCollect() {
      this.xcreatecollect({
        username: cookie.get('role'),
        blog_id: this.articleId
      }).then((res) => {
        // console.log('collect', res)
        this.IsCollect = true
      })
    },
    getxIscollect() {
      this.xIscollect({
        username: cookie.get('role'),
        blog_id: this.articleId
      }).then((res) => {
        // console.log('未收藏', res.data)
        this.IsCollect = res.data.isCollect
      }).catch((res) => {
        // console.log('已收藏', res.data)
        this.IsCollect = res.data.isCollect
      })
    },
    onSubmit() {
      // console.log('创建评论', this.form.desc)
      const token = cookie.get('token')
      if (token) {
        this.xcreateRemark({
          content: this.form.desc,
          from_uid: cookie.get('role'),
          blog_id: this.articleId
        }).then((res) => {
          // console.log('评论res', res)
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.form.desc = ''
          this.getRemarkDetail()
        }).catch((res) => {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        })
      } else {
        this.$message({
          message: '请登录使用哦',
          type: 'warning'
        })
      }
    },
    // 回复评论
    handlereplay() {
      console.log('replay')
    }
  },
  components: {
    'page-nav': PageNav
  },
  created () {
    this.getArticleDetail()
    this.getRemarkDetail()
    this.getxIscollect()
  }
}
</script>

<style scoped>
.article-container {
  box-sizing: border-box;
  margin-left: 30px;
  min-height: 435px;
  padding: 30px 20px;
  background: #fff;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.02), 0 4px 10px rgba(0, 0, 0, 0.06);
}

.article-wrap {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 30px;
  transition: all 0.3s;
  word-break: break-all;
}

.transition-show {
  opacity: 1;
}

.article-head-title {
  font-size: 36px;
  line-height: 42px;
  font-weight: 400;
  margin: 0 0 15px 0;
}

.article-nav-list {
  margin-bottom: 30px;
}

.article-nav-item {
  color: rgba(0, 0, 0, 0.5);
  font-size: 13px;
}

.article-content {
  margin: 0;
  font-size: 14px;
  line-height: 20pt;
}

.flex-l{
  display: flex;
  align-items: center;
}
.flex-r{
  display: flex;
  align-items: center;
  margin-left: 56px;
}
.remarks{
  /* background-color: red; */
  margin-top: 70px;
  border-top: 2px solid rgb(117, 114, 114);
}
.avatar{
  height: 50px;
  margin-right: 6px;
}
.remark-con{
  margin-top: 6px;
}
</style>
