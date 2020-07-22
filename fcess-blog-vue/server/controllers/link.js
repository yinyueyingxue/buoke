const Links = require('../models/link')
const Link = new Links()
import * as config from '../config/config.js'

import linkModel from '../schema/link'

// 后台 添加链接
const createLinks = async(ctx, next) => {
    const opts = ctx.request.body
    // console.log('评论ser', opts)
    let result = {}
    let errormsg = ''
    if (!opts.title && !opts.url) {
      errormsg = '链接和标题内容不能为空'
    }
    if (errormsg) {
      result = {
        data: {},
        statuscode: config.ERROR_CODE,
        message: errormsg
      }
    } else {
    const data = await Link.save(opts)
      if (data) {
        result = {
          data: {},
          statuscode: config.SUCCESS_CODE,
          message: '创建成功'
        }
      }
    }
    ctx.body = result
  }

  const getAllLinks = async(ctx, next) => {
    const query = ctx.request.query
    const limit = query.limit || 10000
    const start = query.start || 0
    let linkList = await Link.query({})
    if (linkList) {
      ctx.body = {
        data: {
          list: linkList.slice(start, start + limit)
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
  
  const getLinkById = async(ctx, next) => {
    // console.log('ser',ctx.request.body)
    const hrefs = ctx.request.href.split('/')
    const articleId = hrefs[hrefs.length - 1]
    const articleDetail = await Link.queryById(articleId)
    if (articleDetail) {
      ctx.body = {
        data: {
          detail: articleDetail
        },
        statuscode: config.SUCCESS_CODE,
        message: config.REQUEST_SUCCESS
      }
    }




    // const id = ctx.request.body.id
    // const hrefs = ctx.request.href.split('/')
    // const tags = decodeURIComponent(hrefs[hrefs.length - 1])
    // const articleDetail = await Link.queryById({
    //     _id: id
    // })
    // if (articleDetail != null) {
    //   ctx.body = {
    //     data: {
    //       list: articleDetail
    //     },
    //     statuscode: config.SUCCESS_CODE,
    //     message: config.REQUEST_SUCCESS
    //   }
    // }
  }

  //后台edit文章
  const editLink = async(ctx, next) => {
    const opts = ctx.request.body
    const _id = opts.linkId
    const {title, url} = opts.linkDetail
    // console.log('editlink', opts)
    let result = await linkModel.findByIdAndUpdate(_id, {
      title,
      url
    }).exec()
    ctx.body = {
      data: {},
      statuscode: config.SUCCESS_CODE,
      message: '链接更新成功'
    }
    // const data = await Link.queryById(linkId).then(function (doc) {
    //   _.assignIn(doc, linkDetail)
    //   return doc.save()
    // })
    // if (data) {
    //   ctx.body = {
    //     data: {},
    //     statuscode: config.SUCCESS_CODE,
    //     message: '链接更新成功'
    //   }
    // }
  }
  const deleteLink = async(ctx, next) => {
    const id = ctx.request.body.id
    const data = await Link.remove(id)
    if (data) {
      ctx.body = {
        data: {},
        statuscode: config.SUCCESS_CODE,
        message: '文章删除成功'
      }
    }
  }

module.exports = {
    createLinks,
    getAllLinks,
    getLinkById,
    editLink,
    deleteLink
}
