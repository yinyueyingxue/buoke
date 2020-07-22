import * as config from '../config/config.js'

//未封装
import CollectModel from '../schema/collect'  

// 封装model
const Collects = require('../models/collect')
const Collect = new Collects()

const createCollect = async(ctx, next) => {
    const opts = ctx.request.body
    console.log('收藏ser', opts)
    let result = {}
    const data = await Collect.save(opts)
    if (data) {
        result = {
            data: {},
            statuscode: config.SUCCESS_CODE,
            message: '添加收藏'
        }
      }
    ctx.body = result
  }

  const getcollectArticle = async(ctx, next) => {  //一会query  body区别
    const query = ctx.request.body
    const page = parseInt(query.page)
    const size = parseInt(query.size)
    let total = 0
    // console.log('collect query', query) skip(size * (page - 1)).limit(size).sort({'_id': -1}).exec()
    let wordList = await CollectModel.find({username: query.username}).skip(size * (page - 1)).limit(size).sort({'_id': -1}).populate('blog_id').exec()
    total = await CollectModel.count({username: query.username}).exec()
    if (wordList) {
      ctx.body = {
        data: {
          list: wordList,
          count: total
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

  //查找是否收藏
  const IsCollectArticle = async (ctx, next) => {
    const opts = ctx.request.body;
    // console.log('opts is', opts)
    let result = await Collect.query({
      username: opts.username,
      blog_id: opts.blog_id
    })
    // console.log('result', result)
    if (result.length > 0) {
      let id = result[0]._id
      // const removedata = await Collect.remove(id)
      ctx.body = {
        data: {
          isCollect: true
        },
        statuscode: config.ERROR_CODE,
        message: '已收藏'
      }
    } else {
      // result = await Collect.save(opts)
      ctx.body = {
        data: {
          isCollect: false
        },
        statuscode: config.SUCCESS_CODE,
        message: '未收藏'
      }
    }
  }
  // 取消收藏
  const CollectCancle = async (ctx, next) => {
    const opts = ctx.request.body;
    // console.log('opts is', opts)
    let result = await Collect.query({
      username: opts.username,
      blog_id: opts.blog_id
    })
    if (result.length > 0) {
      let id = result[0]._id
      const removedata = await Collect.remove(id)
      ctx.body = {
        data: {},
        statuscode: config.ERROR_CODE,
        message: '取消收藏'
      }
    }
  }

//   const deleteWord = async(ctx, next) => {
//     const id = ctx.request.body.id
//     const data = await Collect.remove(id)
//     if (data) {
//       ctx.body = {
//         data: {},
//         statuscode: config.SUCCESS_CODE,
//         message: '删除成功'
//       }
//     }
//   }

module.exports = {
    createCollect,
    getcollectArticle,
    IsCollectArticle,
    CollectCancle
}
