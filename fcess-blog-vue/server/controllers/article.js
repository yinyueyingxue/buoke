import _ from 'lodash'
import * as config from '../config/config.js'
import Article from '../models/article'
import ArticleModel from '../schema/article'

const article = new Article()

const filterArticles = (articles, start, limit) => {
  const startIndex = start * limit,
    endIndex = (start + 1) * limit;
  return articles.slice(startIndex, endIndex)
}
//分页查询所有  用于前台展示
const getAllArticles = async(ctx, next) => {
  const query = ctx.request.query
  const page = parseInt(query.page)
  const size = parseInt(query.size)
  let keyword = query.keyword || ''
  const reg = new RegExp(keyword, 'i')
  // console.log("page1",query)
  let result, total = 0
  let _filter = {  //模糊搜索
    $or:[
      {
        title:{$regex: reg}
      }
    ]
  }
  result = await ArticleModel.find(_filter).skip(size * (page - 1)).limit(size).sort({'_id': -1}).exec()
  total = await ArticleModel.count(_filter).exec()
  if (result) {
    ctx.body = {
      data: {
        list: result,
        count: total
        // list: articleList.slice(start, start + limit)
      },
      statuscode: config.SUCCESS_CODE,
      message: config.REQUEST_SUCCESS
    }
  } else {
    ctx.body = {
      data: {},
      statuscode: config.ERROR_CODE,
      message: config.REQUEST_FAIL
    }
  }
}

//获取最新发布文章
const getNewPost = async(ctx, next) => {
  const query = ctx.request.query
  const start = parseInt(query.start) || 0
  const limit = parseInt(query.limit) || 10000
  let articleList = await article.query({})
  if (articleList) {
    ctx.body = {
      data: {
        list: articleList.slice(start, start + limit)
      },
      statuscode: config.SUCCESS_CODE,
      message: config.REQUEST_SUCCESS
    }
  } else {
    ctx.body = {
      data: {},
      statuscode: config.ERROR_CODE,
      message: config.REQUEST_FAIL
    }
  }
} 
//文章详情
const getArticleById = async(ctx, next) => {
  const hrefs = ctx.request.href.split('/')
  const articleId = hrefs[hrefs.length - 1]
  const articleDetail = await article.queryById(articleId)
  if (articleDetail) {
    ctx.body = {
      data: {
        detail: articleDetail
      },
      statuscode: config.SUCCESS_CODE,
      message: config.REQUEST_SUCCESS
    }
  }
}
//后台创建文章
const createArticle = async(ctx, next) => {
  const opts = ctx.request.body
  let result = {}
  let errormsg = ''
  if (!opts.title) {
    errormsg = '文章名不能为空'
  } else if (!opts.tags) {
    errormsg = '标签不能为空'
  } else if (!opts.source || opts.source.length <= 300) {
    errormsg = '文章内容不能为少于300字'
  }

  if (errormsg) {
    result = {
      data: {},
      statuscode: config.ERROR_CODE,
      message: errormsg
    }
  } else {
    const data = await article.save(opts)
    if (data) {
      result = {
        data: {},
        statuscode: config.SUCCESS_CODE,
        message: '文章创建成功'
      }
    }
  }
  ctx.body = result
}
//后台edit文章
const editArticle = async(ctx, next) => {
    const opts = ctx.request.body
    const articleId = opts.articleId
    const articleDetail = opts.articleDetail
    const data = await article.queryById(articleId).then(function (doc) {
      _.assignIn(doc, articleDetail)
      return doc.save()
    })
    if (data) {
      ctx.body = {
        data: {},
        statuscode: config.SUCCESS_CODE,
        message: '文章更新成功'
      }
    }
}
//后台del文章
const deleteArticle = async(ctx, next) => {
  const id = ctx.request.body.id
  const data = await article.remove(id)
  if (data) {
    ctx.body = {
      data: {},
      statuscode: config.SUCCESS_CODE,
      message: '文章删除成功'
    }
  }
}
//前台分类文章
const getArchiveList = async(ctx, next) => {
  let articleList = await article.query({})
  if (articleList) {
    articleList = articleList.map((item) => {
      // console.log(item)
      let newEle = {
        id: item._id,
        createTime: item.createTime,
        title: item.title
      }
      return newEle
    })
    ctx.body = {
      data: {
        list: articleList
      },
      statuscode: config.SUCCESS_CODE,
      message: '获取分类成功'
    }
  }
}
//前台标签
const getTagsList = async(ctx, next) => {
  let tagsList = []
  let articleList = await article.query({})
  if (articleList) {
    articleList.forEach((item) => {
      if (!tagsList.includes(item.tags)) {
        tagsList.push(item.tags)
      }
    })
    ctx.body = {
      data: {
        list: tagsList
      },
      statuscode: config.SUCCESS_CODE,
      message: '文章删除成功'
    }
  }
}

const getTagsContent = async(ctx, next) => {
  const hrefs = ctx.request.href.split('/')
  const tags = decodeURIComponent(hrefs[hrefs.length - 1])
  const tagsContent = await article.query({
    tags: tags
  })
  if (tagsContent) {
    ctx.body = {
      data: {
        list: tags,
        content: tagsContent
      },
      statuscode: config.SUCCESS_CODE,
      message: '查找标签成功'  //查找标签
    }
  }
}

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  deleteArticle,
  editArticle,
  getArchiveList,
  getTagsList,
  getTagsContent,
  getNewPost
}
