'use strict'

const UserModel = require('../schema/user');

class User {
  constructor () {
    this.model = UserModel;
  }
  save (opts, fn) {
    opts.createTime = new Date().toLocaleString().split(' ')[0]
    this.entity = new UserModel(opts)
    return this.entity.save(opts)
  }
  query (opts) {
    return this.model.find(opts).sort({ _id: -1 }).exec()
  }
  queryAll () {
    return this.model.find({}).exec()
  }
  remove (id, fn) {
    return this.model.findById(id).then((data) => {
      if (!data) {
        return fn(null, false)
      }
      return data.remove()
    })
  }
}

module.exports = User
