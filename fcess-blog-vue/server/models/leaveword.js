'use strict'

const WordsModel = require('../schema/leaveword');

class Words {
  constructor () {
    this.model = WordsModel;
  }
  save (opts, fn) {
    opts.createTime = new Date().toLocaleString().split(' ')[0]
    this.entity = new WordsModel(opts)
    return this.entity.save(opts)
  }
  query(opts) {
    return this.model.find(opts)    //基于模型
      .sort({ _id: -1 })
      .exec()
  }
  remove(id, fn) {
    return this.model.findById(id).then((doc) => {
      if (!doc) {
        return fn(null, false)
      }
      return doc.remove()
    })
  }
}

module.exports = Words
