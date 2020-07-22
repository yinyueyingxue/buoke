<template>
  <div class="posts-container ly-col-14">
    <div class="posts-wrap">
      <div class="posts-head-title">
        <div>收藏文章</div>
      </div>
      <div class="posts-article">
        <div v-if="list === null" class="article-no">您还没有收藏哦~</div>
        <div v-else>
          <ul class="posts-article-list">
          <li class="posts-article-item" v-for="(article,index) of list" :key="index">
            <h3 class="article-head-title">
              <router-link :to="{name: 'article', params: {id: article.blog_id._id}}">
                {{article.blog_id.title}}
              </router-link>
            </h3>
            <span class="article-head-time">{{article.blog_id.createTime}}</span>
            <p class="article-content-desc markdown-body" v-html="substringRender(article.blog_id.render)">
            </p>
            <div class="article-content-nav clearfix">
              <div class="article-tags ly-row-flex">
                <i class="icon-tags ion-ios-pricetags"></i>
                <ul class="article-tags-list">
                  <li class="article-tags-item">
                    <router-link :to="{name: 'tagsContent', params: {id: article.blog_id.tags}}">
                      {{article.blog_id.tags}}
                    </router-link>
                  </li>
                </ul>
              </div>
              <span class="article-readmore">
                <router-link :to="{name: 'article', params: {id: article.blog_id._id}}">
                  查看更多>>
                </router-link>
              </span>
            </div>
          </li>
        </ul>
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
  </div>
</template>

<script>
import cookie from 'js-cookie'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      list: null,
      size: 2,
      page: 1,
      total: null
    }
  },
  methods: {
    ...mapActions({
      xgetAllcollect: 'getAllcollect'
    }),
    substringRender(render) {
      return render.split('</p>')[0].substring(0, 150) + '...</p>'
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.page = 1
      this.size = val
      this.gotest()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.page = val
      this.gotest()
    },
    gotest() {
      let role = cookie.get('role')
      console.log('role', role)
      this.xgetAllcollect({
        page: this.page,
        size: this.size,
        username: cookie.get('role')
      }).then((res) => {
        // console.log('收藏列表', res.data.list)
        let list = res.data.list
        if (list.length === 0) {
          this.list = null
        } else {
          this.list = list
          this.total = res.data.count
        }
      })
    }
  },
  created () {
    this.gotest()
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
.article-no {
  margin: 20px auto;
  text-align: center;
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
