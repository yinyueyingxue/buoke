import ArticleModel from '../schema/article'

class Article {
  constructor() {
    this.model = ArticleModel
  }
  save(opts) {
    opts.createTime = new Date().toLocaleString().split(' ')[0]
    this.entity = new ArticleModel(opts)
    return this.entity.save(opts)   //基于实体对象 
  }
  query(opts) {
    return this.model.find(opts)    //基于模型
      .sort({ _id: -1 })
      .exec()
  }
  queryPage(opts) {
    // console.log("opts", opts)
    let size = parseInt(opts.size)
    let page = parseInt(opts.page)
    return this.model.find({}).skip((page - 1) * size).limit(size)
      .sort({ _id: -1 })
      .exec()
  }
  queryAll() {
    return this.model.find({})
      .sort({ _id: -1 })
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

module.exports = Article
