'use strict'

const CollectModel = require('../schema/collect');

class Collects {
  constructor () {
    this.model = CollectModel;
  }
  save (opts, fn) {
    // opts.createTime = new Date().toLocaleString().split(' ')[0]
    this.entity = new CollectModel(opts)
    // let result2 = this.entity.save(opts).populate('blog_id').execPopulate();
    return this.entity.save(opts)
  }
  query (opts) {
    return this.model.find(opts).sort({ _id: -1 }).exec()
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

module.exports = Collects
