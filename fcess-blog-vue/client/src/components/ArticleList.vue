<template>
  <div class="posts-container ly-col-14">
    <div class="posts-wrap">
      <div class="posts-head-title">
        <div>文章</div>
        <div class="search">
          <el-form :inline="true" :model="formSearch" class="demo-form-inline" style="display:flex;margin-top:40px;">
            <el-form-item>
              <el-input v-model="formSearch.keyValue" placeholder="输入搜索"></el-input>
            </el-form-item>
            <el-button style="height:35px;font-size:15px;" type="primary" @click="onSubmit">搜 索</el-button>
          </el-form>
        </div>
      </div>
      <div class="posts-article">
        <ul class="posts-article-list">
          <li class="posts-article-item" v-for="(article,index) of articleList" :key="index">
            <h3 class="article-head-title">
              <router-link :to="{name: 'article', params: {id: article._id}}">
                {{article.title}}
              </router-link>
            </h3>
            <span class="article-head-time">{{article.createTime}}</span>
            <p class="article-content-desc markdown-body" v-html="substringRender(article.render)">
            </p>
            <div class="article-content-nav clearfix">
              <div class="article-tags ly-row-flex">
                <i class="icon-tags ion-ios-pricetags"></i>
                <ul class="article-tags-list">
                  <li class="article-tags-item">
                    <router-link :to="{name: 'tagsContent', params: {id: article.tags}}">
                      {{article.tags}}
                    </router-link>
                  </li>
                </ul>
              </div>
              <span class="article-readmore">
                <router-link :to="{name: 'article', params: {id: article._id}}">
                  查看更多>>
                </router-link>
              </span>
            </div>
          </li>
        </ul>
        <!-- 文章列表分页 -->
        <div class="p-page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-size="size"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import PageNav from './PageNav'

export default {
  data () {
    return {
      start: 0,
      limit: 5,
      articleList: [],
      size: 2,
      page: 1,
      total: null,
      formSearch: {keyValue: ''}
    }
  },
  computed: {
    ...mapGetters({
      showLoading: 'showLoading'
    })
  },
  methods: {
    ...mapActions({
      xGetArticleList: 'getArticleList'
    }),
    onSubmit() {
      console.log('搜索', this.formSearch.keyValue)
      this.evtGetArticleList()
    },
    substringRender(render) {
      return render.split('</p>')[0].substring(0, 150) + '...</p>'
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.page = 1
      this.size = val
      this.evtGetArticleList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.page = val
      this.evtGetArticleList()
    },
    // evtToggleNext() {
    //   this.start++
    //   const opts = {
    //     start: this.start,
    //     limit: this.limit
    //   }
    //   this.xGetArticleList(opts)
    // },
    // evtTogglePre() {
    //   this.start--
    //   const opts = {
    //     start: this.start,
    //     limit: this.limit
    //   }
    //   this.xGetArticleList(opts).then((res) => {
    //     this.articleList = res.data.list
    //   }).catch((res) => {
    //     this.$message.error(res.message)
    //   })
    // },
    evtGetArticleList() {
      this.xGetArticleList({
        page: this.page,
        size: this.size,
        keyword: this.formSearch.keyValue
      }).then((res) => {
        // console.log('list', res)
        this.articleList = res.data.list
        this.total = res.data.count
      }).catch((res) => {
        this.$message.error(res.message)
      })
    }
  },
  created () {
    this.evtGetArticleList()
    // this.gocreatCollect()
  },
  components: {
    // PageNav
  }
}
</script>

<style scoped>
@import '../assets/css/animate.css';
.p-page{
  display: flex;
  margin: 20px auto;
  justify-content: center;
}
.posts-container {
  box-sizing: border-box;
  margin-left: 30px;
  .posts-wrap {
    box-sizing: border-box;
    width: 100%;
    height: auto;
    background: #fff;
    border-radius: 5px;
    padding-bottom: 30px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.02), 0 4px 10px rgba(0, 0, 0, 0.06);
  }
  .adaptor {
    min-height: 1000px;
  }
  a {
    color: #000;
  }
}

.posts-head-title {
  box-sizing: border-box;
  width: 100%;
  height: 55px;
  line-height: 55px;
  font-size: 16px;
  font-weight: normal;
  color: rgba(0, 0, 0, 0.4);
  padding: 0 30px;
  margin: 0;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.posts-article-list {
  min-height: 435px;
  .posts-article-item {
    position: relative;
    padding: 15px 30px 10px;
    border-bottom: 1px solid #eee;
    &:after {
      content: '';
      position: absolute;
      bottom: 1px;
      left: 0;
      height: 2px;
      width: 0;
      background: #42b983;
      transition: all 0.4s ease-in;
    }
    &:hover {
      .article-head-title {
        color: #42b983;
      }
      &:after{
        width: 100%;
      }
    }
  }
}

.article-head-title {
  margin: 0 0 10px 0;
  cursor: pointer;
}

.article-head-time {
  display: block;
  font-size: 12px;
  color: #999;
  margin-bottom: 20px;
}

.article-content-desc {
  width: 100%;
  margin: 0 0 15px 0;
  color: #7f7f7f;
}

.article-content-nav {
  width: 100%;
  height: auto;
  padding-top: 10px;
  border-top: 1px dotted #ccc;
  .icon-tags {
    font-size: 16px;
    margin-right: 20px;
  }
  .article-tags {
    float: left;
  }
  .article-tags-list {
    padding-top: 2px;
    .article-tags-item {
      position: relative;
      width: auto;
      height: 18px;
      line-height: 16px;
      padding: 0 10px;
      font-size: 12px;
      color: #fff;
      background: #ba8f6c;
      cursor: pointer;
      z-index: 100;
      &:before {
        content: " ";
        width: 0px;
        height: 0px;
        position: absolute;
        top: 0;
        left: -18px;
        border: 9px solid transparent;
        border-right-color: #ba8f6c;
      }
      &:after {
        content: " ";
        width: 4px;
        height: 4px;
        background-color: #fff;
        -webkit-border-radius: 4px;
        border-radius: 4px;
        -webkit-box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.3);
        box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.3);
        position: absolute;
        top: 7px;
        left: 2px;
      }
      &:hover {
        opacity: 0.8;
      }
      a {
        color: #fff;
      }
    }
  }
  .article-readmore {
    float: right;
    width: auto;
    height: 20px;
    line-height: 20px;
    padding: 0 5px;
    font-size: 12px;
    color: #fff;
    background: #4d4d4d;
    border-radius: 2px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    a {
      color: #fff;
    }
  }
}
</style>
