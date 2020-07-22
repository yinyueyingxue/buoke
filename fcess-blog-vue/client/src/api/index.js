import Vue from 'vue'
import VueResource from 'vue-resource'
import cookie from 'js-cookie'

Vue.use(VueResource)

Vue.http.interceptors.push((request, next) => {
  const token = cookie.get('token') || ''
  Vue.http.headers.common['token'] = token
  next((response) => {
    if (response.body.statuscode === 100011) {
      cookie.remove('token')
      window.location.hash = '#/login'
    }
  })
})

// const API_ROOT = 'http://23.88.229.24:3000'
const API_ROOT = 'http://127.0.0.1:3000'
const apiResource = Vue.resource(API_ROOT + '{/id}{/controller}')
const articleResource = Vue.resource(API_ROOT + '/articles{/id}{/controller}')
const usersResource = Vue.resource(API_ROOT + '/users{/id}')
const manageResource = Vue.resource(API_ROOT + '/manage{/id}')
const wordResource = Vue.resource(API_ROOT + '/word{/id}')
const remarkResource = Vue.resource(API_ROOT + '/remarks{/id}')
const collectResource = Vue.resource(API_ROOT + '/collects{/id}')
const linkResource = Vue.resource(API_ROOT + '/links{/id}')

export default {
  getArticleDetail (opts) {
    return articleResource.get({id: opts.id})
  },
  getArticleList (opts) {
    return articleResource.get({id: '', ...opts})
  },
  getNewArticleList (opts) {
    return apiResource.get({id: 'newarticles', ...opts})
  },
  getArchiveArticles () {
    return apiResource.get({id: 'archive'})
  },
  // 获取标签列表
  getTagsList (opts) {
    return apiResource.get({id: 'tags', ...opts})
  },
  // 获取标签详情 前台
  getTagsContent (tags) {
    return apiResource.get({id: 'tags', 'controller': tags})
  },
  // 删除文章  后台
  removeArticleById (opts) {
    return manageResource.save({id: 'delete'}, opts)
  },
  // 用户登录  前台
  userLogin (opts) {
    return usersResource.save({id: 'login'}, opts)
  },
  // 用户注册 前台
  userRegister (opts) {
    return usersResource.save({id: 'register'}, opts)
  },
  // 获取所有用户  后台
  getAllUsers () {
    return usersResource.get({id: 'getAllusers'})
  },
  // 删除用户  后台
  removeUsersById (opts) {
    return usersResource.save({id: 'delete'}, opts)
  },
  // 获取所有 文章 后台
  getManageArticles (opts) {
    return manageResource.get({id: '', ...opts})
  },
  // 创建文章  后台
  createArticle (opts) {
    return manageResource.save({id: 'create'}, opts)
  },
  // 编辑文章  后台
  editArticle (opts) {
    return manageResource.save({id: 'edit'}, opts)
  },
  // 留言  前台
  createWord (opts) {
    return wordResource.save({id: 'createword'}, opts)
  },
  // 获取所有留言 后台
  getAllWords (opts) {
    return wordResource.get({id: 'getAllWords'})
  },
  removeWordById (opts) {
    return wordResource.save({id: 'deleteWord'}, opts)
  },
  // 创建评论 前台
  createRemark (opts) {
    return remarkResource.save({id: 'createremark'}, opts)
  },
  // 获取每篇文章评论  前台
  getRemarkDetail (opts) {
    return remarkResource.save({id: 'remarks'}, opts)
  },
  // 添加收藏  前台
  createcollect (opts) {
    return collectResource.save({id: 'createCollect'}, opts)
  },
  // 取消收藏  前台
  CollectCancle (opts) {
    return collectResource.save({id: 'CollectCancle'}, opts)
  },
  // 获取收藏列表
  getAllcollect (opts) {
    return collectResource.save({id: 'getcollect'}, opts)
  },
  // 查询是否收藏
  Iscollect (opts) {
    return collectResource.save({id: 'Iscollect'}, opts)
  },
  // 添加友链 后台
  createlink (opts) {
    return linkResource.save({id: 'createlink'}, opts)
  },
  // 获取友链 后台 前台
  getAlllink (opts) {
    return linkResource.get({id: 'getAlllink'})
  },
  getLinkDetail (opts) {
    return linkResource.get({id: opts.id})
  },
  editLinkDetail (opts) {
    return linkResource.save({id: 'edit'}, opts)
  },
  delLink (opts) {
    return linkResource.save({id: 'delete'}, opts)
  }
}
