const Words = require('../models/leaveword')
const Word = new Words()
import * as config from '../config/config.js'


const createWords = async(ctx, next) => {
    const opts = ctx.request.body
    console.log('留言ser', opts)
    let result = {}
    let errormsg = ''
    if (!opts.words) {
      errormsg = '留言内容不能为空'
    }
  
    if (errormsg) {
      result = {
        data: {},
        statuscode: config.ERROR_CODE,
        message: errormsg
      }
    } else {
    const data = await Word.save(opts)
      if (data) {
        result = {
          data: {},
          statuscode: config.SUCCESS_CODE,
          message: '留言成功'
        }
      }
    }
    ctx.body = result
  }

  const getAllWords = async(ctx, next) => {
    const query = ctx.request.query
    const limit = query.limit || 10000
    const start = query.start || 0
    let wordList = await Word.query({})
    if (wordList) {
      ctx.body = {
        data: {
          list: wordList.slice(start, start + limit)
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
  const deleteWord = async(ctx, next) => {
    const id = ctx.request.body.id
    const data = await Word.remove(id)
    if (data) {
      ctx.body = {
        data: {},
        statuscode: config.SUCCESS_CODE,
        message: '删除成功'
      }
    }
  }

module.exports = {
  createWords,
  getAllWords,
  deleteWord
}
