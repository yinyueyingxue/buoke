const Remarks = require('../models/remark')
const Remark = new Remarks()
import * as config from '../config/config.js'


const createRemarks = async(ctx, next) => {
    const opts = ctx.request.body
    // console.log('评论ser', opts)
    let result = {}
    let errormsg = ''
    if (!opts.content) {
      errormsg = '内容不能为空'
    }
  
    if (errormsg) {
      result = {
        data: {},
        statuscode: config.ERROR_CODE,
        message: errormsg
      }
    } else {
    const data = await Remark.save(opts)
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
  
  const getRemarkById = async(ctx, next) => {
    console.log('ser',ctx.request.body)
    const blog_id = ctx.request.body.blog_id
    // const hrefs = ctx.request.href.split('/')
    // const tags = decodeURIComponent(hrefs[hrefs.length - 1])
    const articleDetail = await Remark.query({
        blog_id: blog_id
    })
    if (articleDetail != null) {
      ctx.body = {
        data: {
          list: articleDetail
        },
        statuscode: config.SUCCESS_CODE,
        message: config.REQUEST_SUCCESS
      }
    }
  }

module.exports = {
    createRemarks,
    getRemarkById
}
