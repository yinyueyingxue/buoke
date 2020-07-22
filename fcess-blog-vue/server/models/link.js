'use strict'

const LinksModel = require('../schema/link');

class Links {
  constructor () {
    this.model = LinksModel;
  }
  save (opts, fn) {
    opts.createTime = new Date().toLocaleString().split(' ')[0]
    this.entity = new LinksModel(opts)
    return this.entity.save(opts)
  }
  query(opts) {
    return this.model.find(opts)    //基于模型
      .sort({ _id: 1 })
      .exec()
  }
  queryById(id) {
    return this.model.findById(id)
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

module.exports = Links
